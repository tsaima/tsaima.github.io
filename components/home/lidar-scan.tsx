'use client';

import { useEffect, useRef } from 'react';

// Top-down LiDAR sweep of a small dining room, drawn on a canvas.
// Like BusBot's LiDAR it covers 276°, leaving an 84° blind spot behind the robot,
// which is drawn as the ultrasonic sensors' coverage instead.

type Seg = [number, number, number, number];

const FOV = (276 * Math.PI) / 180;
const SWEEP_SECONDS = 4.5;
const STEP = (0.6 * Math.PI) / 180;

function rng(seed: number) {
	return () => {
		seed = (seed * 16807) % 2147483647;
		return (seed - 1) / 2147483646;
	};
}

function rect(x: number, y: number, w: number, h: number): Seg[] {
	return [
		[x, y, x + w, y],
		[x + w, y, x + w, y + h],
		[x + w, y + h, x, y + h],
		[x, y + h, x, y],
	];
}

function circle(cx: number, cy: number, r: number, n = 14): Seg[] {
	const s: Seg[] = [];
	for (let i = 0; i < n; i++) {
		const a1 = (i / n) * Math.PI * 2;
		const a2 = ((i + 1) / n) * Math.PI * 2;
		s.push([cx + r * Math.cos(a1), cy + r * Math.sin(a1), cx + r * Math.cos(a2), cy + r * Math.sin(a2)]);
	}
	return s;
}

function buildScene(w: number, h: number, rx: number, ry: number) {
	const m = Math.min(w, h) * 0.06;
	// Room with a doorway notch and a kitchen pass on the top wall
	const segs: Seg[] = [
		[m, m, w * 0.42, m],
		[w * 0.42, m, w * 0.42, m + h * 0.08],
		[w * 0.42, m + h * 0.08, w * 0.58, m + h * 0.08],
		[w * 0.58, m + h * 0.08, w * 0.58, m],
		[w * 0.58, m, w - m, m],
		[w - m, m, w - m, h * 0.62],
		[w - m, h * 0.74, w - m, h - m],
		[w - m, h - m, m, h - m],
		[m, h - m, m, m],
	];
	const rand = rng(7);
	const s = Math.min(w, h);
	const cols = w > 900 ? 5 : 3;
	const rows = 3;
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			const cx = m + ((i + 0.5) / cols) * (w - 2 * m) + (rand() - 0.5) * s * 0.04;
			const cy = m + h * 0.08 + ((j + 0.5) / rows) * (h - 2 * m - h * 0.08) + (rand() - 0.5) * s * 0.04;
			if (Math.hypot(cx - rx, cy - ry) < s * 0.16) continue;
			if (rand() < 0.5) {
				const r = s * (0.035 + rand() * 0.015);
				segs.push(...circle(cx, cy, r));
				for (let k = 0; k < 3; k++) {
					const a = rand() * Math.PI * 2;
					segs.push(...circle(cx + Math.cos(a) * r * 1.7, cy + Math.sin(a) * r * 1.7, r * 0.32, 8));
				}
			} else {
				const tw = s * (0.09 + rand() * 0.04);
				const th = s * 0.055;
				segs.push(...rect(cx - tw / 2, cy - th / 2, tw, th));
				segs.push(...circle(cx - tw * 0.25, cy - th * 1.05, th * 0.3, 8));
				segs.push(...circle(cx + tw * 0.25, cy + th * 1.05, th * 0.3, 8));
			}
		}
	}
	return segs;
}

function cast(ox: number, oy: number, a: number, segs: Seg[]) {
	const dx = Math.cos(a);
	const dy = Math.sin(a);
	let best = Infinity;
	for (const [x1, y1, x2, y2] of segs) {
		const ex = x2 - x1;
		const ey = y2 - y1;
		const den = dx * ey - dy * ex;
		if (Math.abs(den) < 1e-9) continue;
		const t = ((x1 - ox) * ey - (y1 - oy) * ex) / den;
		const u = ((x1 - ox) * dy - (y1 - oy) * dx) / den;
		if (t > 0 && u >= 0 && u <= 1 && t < best) best = t;
	}
	return best;
}

export function LidarScan({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let w = 0, h = 0, rx = 0, ry = 0, heading = 0;
		let segs: Seg[] = [];
		let hits: { a: number; d: number; t: number }[] = [];
		let raf = 0;
		let start = performance.now();

		const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
		const green = `hsl(${css('--primary') || '142 58% 44%'})`;
		const copper = (alpha: number) => `hsl(${css('--accent') || '27 70% 58%'} / ${alpha})`;

		const setup = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const r = canvas.getBoundingClientRect();
			w = r.width;
			h = r.height;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const wide = w > 768;
			rx = wide ? w * 0.86 : w * 0.5;
			ry = wide ? h * 0.5 : h * 0.86;
			heading = wide ? Math.PI : -Math.PI / 2; // robot faces the room
			segs = buildScene(w, h, rx, ry);
			const n = Math.floor(FOV / STEP);
			hits = Array.from({ length: n }, (_, i) => {
				const a = heading - FOV / 2 + i * STEP;
				return { a, d: cast(rx, ry, a, segs), t: -1e9 };
			});
			start = performance.now();
		};

		const draw = (now: number) => {
			const elapsed = (now - start) / 1000;
			const phase = reduce ? 1 : (elapsed / SWEEP_SECONDS) % 1;
			const sweepIndex = Math.floor(phase * hits.length);
			const firstPass = !reduce && elapsed < SWEEP_SECONDS;

			if (!reduce) {
				for (let i = 0; i < hits.length; i++) {
					const passed = firstPass ? i <= sweepIndex : true;
					if (passed && Math.abs(i - sweepIndex) < 3) hits[i].t = now;
				}
			}

			ctx.clearRect(0, 0, w, h);

			// Range rings
			ctx.strokeStyle = 'hsl(142 58% 44% / 0.08)';
			ctx.lineWidth = 1;
			const s = Math.min(w, h);
			for (let k = 1; k <= 4; k++) {
				ctx.beginPath();
				ctx.arc(rx, ry, (s * 0.22 * k), 0, Math.PI * 2);
				ctx.stroke();
			}

			// Blind spot behind the robot, covered by ultrasonic sensors
			const back = heading + Math.PI;
			ctx.fillStyle = copper(0.06);
			ctx.beginPath();
			ctx.moveTo(rx, ry);
			ctx.arc(rx, ry, s * 0.2, back - (Math.PI * 2 - FOV) / 2, back + (Math.PI * 2 - FOV) / 2);
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle = copper(0.35);
			ctx.setLineDash([3, 5]);
			for (const r of [0.07, 0.12, 0.17]) {
				ctx.beginPath();
				ctx.arc(rx, ry, s * r, back - 0.55, back + 0.55);
				ctx.stroke();
			}
			ctx.setLineDash([]);

			// Point cloud with persistence
			for (let i = 0; i < hits.length; i++) {
				const hpt = hits[i];
				if (!isFinite(hpt.d)) continue;
				const age = reduce ? 0 : (now - hpt.t) / 1000;
				if (age > 1e6) continue;
				const alpha = reduce ? 0.8 : Math.max(0.18, 1 - age / SWEEP_SECONDS);
				const jitter = (Math.sin(i * 12.9898) * 43758.5453) % 1;
				const d = hpt.d + jitter * 1.5;
				const x = rx + Math.cos(hpt.a) * d;
				const y = ry + Math.sin(hpt.a) * d;
				ctx.fillStyle = copper(alpha);
				ctx.fillRect(x - 1.3, y - 1.3, 2.6, 2.6);
			}

			// Beam
			if (!reduce) {
				const a = heading - FOV / 2 + phase * FOV;
				const len = Math.hypot(w, h);
				const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, len * 0.6);
				grad.addColorStop(0, 'hsl(142 58% 44% / 0.28)');
				grad.addColorStop(1, 'hsl(142 58% 44% / 0)');
				ctx.fillStyle = grad;
				ctx.beginPath();
				ctx.moveTo(rx, ry);
				ctx.arc(rx, ry, len, a - 0.22, a);
				ctx.closePath();
				ctx.fill();
				ctx.strokeStyle = 'hsl(142 58% 50% / 0.7)';
				ctx.beginPath();
				ctx.moveTo(rx, ry);
				const d = Math.min(cast(rx, ry, a, segs), len);
				ctx.lineTo(rx + Math.cos(a) * d, ry + Math.sin(a) * d);
				ctx.stroke();
			}

			// Robot
			ctx.save();
			ctx.translate(rx, ry);
			ctx.rotate(heading);
			const rw = Math.max(16, s * 0.04);
			ctx.fillStyle = 'hsl(150 30% 6%)';
			ctx.strokeStyle = green;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.roundRect(-rw * 0.6, -rw * 0.5, rw * 1.2, rw, 4);
			ctx.fill();
			ctx.stroke();
			ctx.fillStyle = green;
			ctx.beginPath();
			ctx.arc(rw * 0.25, 0, rw * 0.16, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();

			if (!reduce) raf = requestAnimationFrame(draw);
		};

		setup();
		raf = requestAnimationFrame(draw);
		const ro = new ResizeObserver(() => {
			setup();
			if (reduce) requestAnimationFrame(draw);
		});
		ro.observe(canvas);
		const onVis = () => {
			cancelAnimationFrame(raf);
			if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
		};
		document.addEventListener('visibilitychange', onVis);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			document.removeEventListener('visibilitychange', onVis);
		};
	}, []);

	return <canvas ref={ref} className={className} aria-hidden="true" />;
}

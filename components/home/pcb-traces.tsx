'use client';

import { useEffect, useRef } from 'react';

// Faint PCB traces for the hero background: bundles of parallel traces with 45° corners,
// vias and a few IC footprints, kept to the edges so the middle stays clear for text.
// Every few seconds a short silver "signal" runs along one trace.

type Pt = [number, number];

function rng(seed: number) {
	return () => {
		seed = (seed * 16807) % 2147483647;
		return (seed - 1) / 2147483646;
	};
}

// Cut each corner at 45° so the route looks like real PCB routing
function chamfer(pts: Pt[], c: number): Pt[] {
	const out: Pt[] = [pts[0]];
	for (let i = 1; i < pts.length - 1; i++) {
		const [px, py] = pts[i - 1];
		const [x, y] = pts[i];
		const [nx, ny] = pts[i + 1];
		const l1 = Math.hypot(x - px, y - py);
		const l2 = Math.hypot(nx - x, ny - y);
		const k = Math.min(c, l1 / 2, l2 / 2);
		out.push([x - ((x - px) / l1) * k, y - ((y - py) / l1) * k]);
		out.push([x + ((nx - x) / l2) * k, y + ((ny - y) / l2) * k]);
	}
	out.push(pts[pts.length - 1]);
	return out;
}

function length(pts: Pt[]) {
	let L = 0;
	for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
	return L;
}

function pointAt(pts: Pt[], d: number): Pt {
	for (let i = 1; i < pts.length; i++) {
		const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
		if (d <= seg) {
			const t = d / seg;
			return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
		}
		d -= seg;
	}
	return pts[pts.length - 1];
}

function buildBoard(w: number, h: number) {
	const g = 14; // trace pitch
	const rand = rng(11);
	const traces: Pt[][] = [];
	const vias: Pt[] = [];
	const chips: { x: number; y: number; cw: number; ch: number }[] = [];
	const wide = w > 768;
	const reach = wide ? 0.34 : 0.45; // how far traces come in from each side

	const bundles = Math.max(4, Math.round(w / 170));
	for (let b = 0; b < bundles; b++) {
		const fromLeft = b % 2 === 0;
		const top = Math.floor(b / 2) % 2 === 0;
		const n = 2 + Math.floor(rand() * 4);
		const bandY = top ? h * (0.08 + rand() * 0.22) : h * (0.68 + rand() * 0.2);
		const drop = (rand() < 0.5 ? -1 : 1) * g * (3 + Math.floor(rand() * 6));
		const turnX = w * (0.05 + rand() * (reach - 0.15));
		const endX = Math.min(w * reach, turnX + g * (4 + Math.floor(rand() * 8)));
		for (let j = 0; j < n; j++) {
			const off = j * g;
			const yA = bandY + off;
			const yB = yA + drop;
			// nest the corners so parallel traces never cross
			const xT = drop > 0 ? turnX - off : turnX + off;
			const xE = endX + (n - j) * g * 0.6;
			let pts: Pt[] = [[-10, yA], [xT, yA], [xT, yB], [xE, yB]];
			if (!fromLeft) pts = pts.map(([x, y]) => [w - x, y] as Pt);
			traces.push(chamfer(pts, g * 1.2));
			vias.push(pts[pts.length - 1]);
		}
	}

	// A few IC footprints near the corners with short stubs to their pads
	const spots: Pt[] = wide
		? [[w * 0.06, h * 0.46], [w * 0.88, h * 0.42], [w * 0.2, h * 0.9]]
		: [[w * 0.08, h * 0.45], [w * 0.7, h * 0.5]];
	for (const [x, y] of spots) {
		const cw = g * (4 + Math.floor(rand() * 3));
		const ch = g * (3 + Math.floor(rand() * 2));
		chips.push({ x, y, cw, ch });
		for (let k = 0; k <= cw / g - 1; k++) {
			const px = x + g * 0.5 + k * g;
			if (rand() < 0.55) {
				const len = g * (2 + Math.floor(rand() * 5));
				const pts = chamfer([[px, y + ch + 4], [px, y + ch + 4 + len], [px + (rand() < 0.5 ? -1 : 1) * g * 2, y + ch + 4 + len + g * 2]], g);
				traces.push(pts);
				vias.push(pts[pts.length - 1]);
			}
		}
	}

	// Loose vias scattered toward the edges
	for (let i = 0; i < Math.round(w / 60); i++) {
		const x = rand() < 0.5 ? rand() * w * 0.3 : w - rand() * w * 0.3;
		vias.push([Math.round(x / g) * g, Math.round((rand() * h) / g) * g]);
	}
	return { traces, vias, chips, g };
}

export function PcbTraces({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext('2d');
		if (!canvas || !ctx) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const css = (n: string, f: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || f;
		const pcb = css('--pcb', '152 45% 28%');
		const tin = css('--primary', '210 8% 78%');

		let w = 0, h = 0, dpr = 1;
		let board = buildBoard(1, 1);
		let lengths: number[] = [];
		const bg = document.createElement('canvas');
		let raf = 0;
		let pulse: { i: number; t0: number; dur: number } | null = null;
		let nextPulse = 0;

		const drawStatic = () => {
			bg.width = w * dpr;
			bg.height = h * dpr;
			const b = bg.getContext('2d')!;
			b.setTransform(dpr, 0, 0, dpr, 0, 0);
			b.lineCap = 'round';
			b.lineJoin = 'round';
			b.strokeStyle = `hsl(${pcb} / 0.45)`;
			b.lineWidth = 1.6;
			for (const t of board.traces) {
				b.beginPath();
				b.moveTo(t[0][0], t[0][1]);
				for (const p of t.slice(1)) b.lineTo(p[0], p[1]);
				b.stroke();
			}
			for (const [x, y] of board.vias) {
				b.fillStyle = 'hsl(0 0% 4%)';
				b.beginPath();
				b.arc(x, y, 3.6, 0, Math.PI * 2);
				b.fill();
				b.lineWidth = 1.6;
				b.stroke();
			}
			for (const c of board.chips) {
				b.strokeStyle = `hsl(${pcb} / 0.5)`;
				b.lineWidth = 1.2;
				b.strokeRect(c.x, c.y, c.cw, c.ch);
				b.fillStyle = `hsl(${pcb} / 0.35)`;
				for (let k = 0; k < c.cw / board.g; k++) {
					b.fillRect(c.x + board.g * 0.5 + k * board.g - 2.5, c.y - 7, 5, 6);
					b.fillRect(c.x + board.g * 0.5 + k * board.g - 2.5, c.y + c.ch + 1, 5, 6);
				}
				b.beginPath();
				b.arc(c.x + 6, c.y + 6, 2, 0, Math.PI * 2);
				b.fill();
			}
		};

		const setup = () => {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			const r = canvas.getBoundingClientRect();
			w = r.width;
			h = r.height;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			board = buildBoard(w, h);
			lengths = board.traces.map(length);
			drawStatic();
		};

		const frame = (now: number) => {
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(bg, 0, 0);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			if (!pulse && now > nextPulse && board.traces.length) {
				const i = Math.floor(Math.random() * board.traces.length);
				pulse = { i, t0: now, dur: Math.max(900, lengths[i] * 4) };
			}
			if (pulse) {
				const t = (now - pulse.t0) / pulse.dur;
				const pts = board.traces[pulse.i];
				const L = lengths[pulse.i];
				const tail = 70;
				const head = t * (L + tail);
				ctx.lineCap = 'round';
				ctx.shadowColor = `hsl(${tin} / 0.9)`;
				ctx.shadowBlur = 8;
				const steps = 14;
				for (let s = 0; s < steps; s++) {
					const d1 = head - (s / steps) * tail;
					const d2 = head - ((s + 1) / steps) * tail;
					if (d1 < 0 || d2 > L) continue;
					const a = pointAt(pts, Math.max(0, d2));
					const b = pointAt(pts, Math.min(L, d1));
					ctx.strokeStyle = `hsl(${tin} / ${0.9 * (1 - s / steps)})`;
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.moveTo(a[0], a[1]);
					ctx.lineTo(b[0], b[1]);
					ctx.stroke();
				}
				ctx.shadowBlur = 0;
				if (t >= 1) {
					pulse = null;
					nextPulse = now + 1500 + Math.random() * 2000;
				}
			}
			raf = requestAnimationFrame(frame);
		};

		setup();
		if (reduce) {
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.drawImage(bg, 0, 0);
		} else raf = requestAnimationFrame(frame);

		const ro = new ResizeObserver(() => {
			setup();
			if (reduce) {
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.drawImage(bg, 0, 0);
			}
		});
		ro.observe(canvas);
		const onVis = () => {
			cancelAnimationFrame(raf);
			if (!document.hidden && !reduce) raf = requestAnimationFrame(frame);
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

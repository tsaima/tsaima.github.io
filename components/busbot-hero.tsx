'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// A small BusBot scene: scan the QR code on the table, BusBot drives over, takes the dishes and drives away.
// The robot is redrawn from the team's BusBot icon so it can move on the dark page.

type Phase = 'idle' | 'flash' | 'arriving' | 'loading' | 'leaving' | 'resetting';

const W = 460;
const H = 300;
const FLOOR = 272;
const S = 0.26; // icon (800 px) to scene scale
const ROBOT_Y = FLOOR - 736 * S;
const AT_TABLE = 158; // robot x when parked beside the table
const STATION = 300; // robot x when parked at its dish station, idle

const status: Record<Phase, string> = {
	idle: 'Scan the QR code to call BusBot.',
	flash: 'Request sent.',
	arriving: 'BusBot is on its way.',
	loading: 'Collecting the dishes.',
	leaving: 'Back to the dish station.',
	resetting: 'Back to the dish station.',
};

// A generic QR-style pattern (not a real code): three finder squares plus fixed filler modules.
const QR_N = 21;
const qrModules: [number, number][] = (() => {
	const out: [number, number][] = [];
	let seed = 7;
	const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
	const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
	for (let y = 0; y < QR_N; y++) for (let x = 0; x < QR_N; x++) if (!inFinder(x, y) && rand() > 0.55) out.push([x, y]);
	return out;
})();

function Finder({ x, y, m }: { x: number; y: number; m: number }) {
	return (
		<g>
			<rect x={x} y={y} width={7 * m} height={7 * m} fill="#2b1d17" />
			<rect x={x + m} y={y + m} width={5 * m} height={5 * m} fill="#f6efe4" />
			<rect x={x + 2 * m} y={y + 2 * m} width={3 * m} height={3 * m} fill="#2b1d17" />
		</g>
	);
}

function Robot({ loaded }: { loaded: boolean }) {
	// Drawn on the 800 px icon grid, scaled by S.
	return (
		<g transform={`scale(${S})`}>
			<path d="M276 78 Q400 22 524 78" fill="none" stroke="#e3a66b" strokeWidth={22} strokeLinecap="round" />
			<path d="M318 118 Q400 82 482 118" fill="none" stroke="#e3a66b" strokeWidth={22} strokeLinecap="round" />
			<rect x={336} y={190} width={128} height={30} rx={8} fill="#2b1d17" />
			<rect x={352} y={152} width={96} height={48} rx={12} fill="#5c4a3f" />
			<rect x={372} y={168} width={56} height={12} rx={6} fill="#e3a66b" />
			<rect x={200} y={216} width={400} height={430} rx={60} fill="#2b1d17" stroke="hsl(40 12% 91% / 0.18)" strokeWidth={6} />
			<path d="M200 276 Q200 216 260 216 H540 Q600 216 600 276 V304 H200 Z" fill="#c88b4c" />
			<rect x={288} y={244} width={224} height={24} rx={12} fill="#2b1d17" />
			<rect x={240} y={336} width={320} height={128} rx={32} fill="#f3ebdf" />
			<circle cx={328} cy={400} r={36} fill="#cbb8a6" />
			<circle cx={472} cy={400} r={36} fill="#cbb8a6" />
			<circle cx={328} cy={400} r={24} fill="#2b1d17" />
			<circle cx={472} cy={400} r={24} fill="#2b1d17" />
			<circle cx={336} cy={391} r={8} fill="#f3ebdf" />
			<circle cx={480} cy={391} r={8} fill="#f3ebdf" />
			<path d="M372 432 Q400 452 428 432" fill="none" stroke="#8b4a1e" strokeWidth={10} strokeLinecap="round" />
			<rect x={240} y={496} width={320} height={112} rx={28} fill="#f8f3ea" />
			{[278, 326, 374, 422, 470, 518].map((x) => (
				<rect key={x} x={x - 5} y={512} width={10} height={84} fill="#c88b4c" />
			))}
			{/* Plates in the rack once collected */}
			<g style={{ opacity: loaded ? 1 : 0, transition: 'opacity 300ms ease-out' }}>
				{[302, 350, 398, 446].map((x) => (
					<rect key={x} x={x - 13} y={518} width={26} height={74} rx={13} fill="#f8f3ea" stroke="#d9cdbc" strokeWidth={6} />
				))}
			</g>
			<rect x={240} y={600} width={320} height={16} rx={8} fill="#8b4a1e" />
			<rect x={184} y={632} width={432} height={48} rx={24} fill="#2b1d17" />
			{[296, 504].map((cx) => (
				<g key={cx}>
					<circle cx={cx} cy={688} r={48} fill="#3d2a21" />
					<circle cx={cx} cy={688} r={20} fill="#c88b4c" />
				</g>
			))}
		</g>
	);
}

export function BusbotHero() {
	const [phase, setPhase] = useState<Phase>('idle');
	const timers = useRef<number[]>([]);
	const reduce = useRef(false);

	useEffect(() => {
		reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		return () => timers.current.forEach(clearTimeout);
	}, []);

	const run = () => {
		if (phase !== 'idle') return;
		const steps: [Phase, number][] = [
			['flash', 0],
			['arriving', 350],
			['loading', 2250],
			['leaving', 3350],
			['resetting', 4900],
			['idle', 5500],
		];
		timers.current = steps.map(([p, t]) => window.setTimeout(() => setPhase(p), t));
	};

	const robotX = phase === 'arriving' || phase === 'loading' ? AT_TABLE : STATION;
	const moving = phase === 'arriving' || phase === 'leaving';
	const robotTransition = reduce.current
		? 'none'
		: phase === 'arriving'
			? 'transform 1600ms cubic-bezier(0.45, 0, 0.2, 1)'
			: phase === 'leaving'
				? 'transform 1400ms cubic-bezier(0.45, 0, 0.2, 1)'
				: 'none';
	const platesGone = phase === 'loading' || phase === 'leaving' || phase === 'resetting';
	const loaded = phase === 'loading' || phase === 'leaving';
	const fast = reduce.current ? 'none' : undefined;

	return (
		<figure className="w-full max-w-[460px] md:w-[400px] lg:w-[460px]">
			<svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none overflow-visible" role="img" aria-label="Cartoon of BusBot, a dish-collecting robot, beside a café table with plates and a QR code">
				{/* Floor */}
				<line x1={0} y1={FLOOR} x2={W} y2={FLOOR} stroke="hsl(var(--border))" strokeWidth={1.5} />

				{/* Table */}
				<g stroke="hsl(var(--foreground) / 0.75)" strokeWidth={1.5} fill="none" strokeLinecap="round">
					<rect x={30} y={178} width={170} height={9} rx={4} fill="hsl(var(--background))" />
					<line x1={115} y1={187} x2={115} y2={FLOOR - 4} />
					<line x1={85} y1={FLOOR - 3} x2={145} y2={FLOOR - 3} />
				</g>

				{/* Mug */}
				<g>
					<path d="M128 156 h22 v18 a4 4 0 0 1 -4 4 h-14 a4 4 0 0 1 -4 -4 z" fill="#f3ebdf" />
					<path d="M150 161 a6 6 0 0 1 0 11" fill="none" stroke="#f3ebdf" strokeWidth={3} />
					<path d="M135 150 q-3 -5 0 -10 M143 150 q-3 -5 0 -10" fill="none" stroke="hsl(var(--foreground) / 0.35)" strokeWidth={1.5} strokeLinecap="round" />
				</g>

				{/* Plates: slide toward the robot's rack when it collects them */}
				<g
					style={{
						transform: platesGone ? 'translate(182px, 52px) scale(0.5)' : 'none',
						transformOrigin: '80px 172px',
						opacity: platesGone ? 0 : 1,
						transition:
							fast ??
							(platesGone ? 'transform 700ms cubic-bezier(0.65, 0, 0.35, 1), opacity 250ms 500ms ease-out' : 'opacity 500ms ease-out'),
					}}
				>
					<ellipse cx={80} cy={175} rx={34} ry={5} fill="#f3ebdf" />
					<ellipse cx={80} cy={170} rx={30} ry={5} fill="#f8f3ea" stroke="#d9cdbc" strokeWidth={1.5} />
					<ellipse cx={80} cy={165} rx={26} ry={4.5} fill="#f8f3ea" stroke="#d9cdbc" strokeWidth={1.5} />
				</g>

				{/* QR code card: click to scan */}
				<g
					role="button"
					tabIndex={0}
					aria-label="Scan the QR code to call BusBot"
					onClick={run}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							run();
						}
					}}
					className="group/qr cursor-pointer outline-none"
				>
					<rect x={158} y={126} width={36} height={52} rx={3} fill="#f6efe4" />
					<g transform="translate(161 129)">
						<Finder x={0} y={0} m={1.43} />
						<Finder x={14 * 1.43} y={0} m={1.43} />
						<Finder x={0} y={14 * 1.43} m={1.43} />
						{qrModules.map(([x, y]) => (
							<rect key={`${x}-${y}`} x={x * 1.43} y={y * 1.43} width={1.43} height={1.43} fill="#2b1d17" />
						))}
					</g>
					<text x={176} y={172} textAnchor="middle" fontSize={6.5} fill="#2b1d17" style={{ fontFamily: 'inherit' }}>
						SCAN
					</text>
					{/* Camera framing corners on hover or keyboard focus */}
					<g
						className="opacity-0 transition-opacity duration-150 group-hover/qr:opacity-100 group-focus-visible/qr:opacity-100"
						stroke="hsl(var(--primary))"
						strokeWidth={2}
						fill="none"
						strokeLinecap="round"
					>
						<path d="M150 128 v-8 h8 M202 128 v-8 h-8 M150 176 v8 h8 M202 176 v8 h-8" />
					</g>
					{/* Idle hint: a soft pulse around the card */}
					{phase === 'idle' && (
						<rect x={154} y={122} width={44} height={60} rx={5} fill="none" stroke="hsl(var(--primary) / 0.6)" strokeWidth={1.5} className="motion-safe:animate-pulse" />
					)}
					{/* Camera flash */}
					<rect
						x={140}
						y={110}
						width={72}
						height={84}
						rx={8}
						fill="#ffffff"
						style={{ opacity: phase === 'flash' ? 0.9 : 0, transition: fast ?? 'opacity 300ms ease-out', pointerEvents: 'none' }}
					/>
				</g>

				{/* BusBot */}
				<g style={{ transform: `translate(${robotX}px, ${ROBOT_Y}px)`, transition: robotTransition }}>
					{/* Motion lines while driving */}
					<g
						style={{ opacity: moving && !reduce.current ? 1 : 0, transition: 'opacity 200ms' }}
						transform={phase === 'leaving' ? 'translate(-140 0)' : undefined}
						stroke="#c88b4c"
						strokeWidth={3}
						strokeLinecap="round"
					>
						<line x1={168} y1={110} x2={192} y2={110} />
						<line x1={172} y1={128} x2={202} y2={128} />
						<line x1={168} y1={146} x2={188} y2={146} />
					</g>
					<Robot loaded={loaded} />
				</g>
			</svg>
			<figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-sm text-muted-foreground">
				<span aria-live="polite">{status[phase]}</span>
				<Link href="/projects/busbot/" className="hover:text-foreground transition-colors">
					BusBot project →
				</Link>
			</figcaption>
		</figure>
	);
}

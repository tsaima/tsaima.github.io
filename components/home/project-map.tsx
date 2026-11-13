'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { SectionHeader } from '@/components/ui/section-header';
import { projects } from '@/lib/projects';

// Schematic-style map: Maxwell is the IC in the middle, each project is a part wired to one of its pins.
// Hardware projects connect on the left, software on the right. Every block links to its project page.

const short: Record<string, string> = {
	busbot: '2026–27',
	'laundry-folder': 'SP26',
	'bedside-beacon': 'FA25',
	'dc-opf': 'FA25',
	'whack-a-mole': 'SP25',
	tetris: 'FA24',
};

const hw = projects.filter((p) => p.category === 'Hardware');
const sw = projects.filter((p) => p.category === 'Software');
const ordered = [...hw, ...sw];
const refdes = (slug: string) => `U${ordered.findIndex((p) => p.slug === slug) + 1}`;

const PIN_Y = [130, 230, 330];
const BLOCK_Y = [80, 230, 380];

function Wire({ d, active, delay }: { d: string; active: boolean; delay: number }) {
	return (
		<g>
			<motion.path
				d={d}
				fill="none"
				stroke={active ? 'hsl(var(--accent))' : 'hsl(var(--pcb))'}
				strokeWidth={active ? 3 : 2}
				strokeLinejoin="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true, margin: '-80px' }}
				transition={{ duration: 1, delay, ease: 'easeInOut' }}
				style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
			/>
			<path
				d={d}
				fill="none"
				stroke="hsl(var(--accent))"
				strokeWidth={active ? 3 : 2}
				strokeLinecap="round"
				className="current-flow"
				style={{ opacity: active ? 1 : 0.18, transition: 'opacity 0.2s' }}
			/>
		</g>
	);
}

function Block({
	x, y, w, h, slug, title, sub, active, onHover,
}: {
	x: number; y: number; w: number; h: number; slug: string; title: string; sub: string; active: boolean;
	onHover: (s: string | null) => void;
}) {
	return (
		<a
			href={`/projects/${slug}/`}
			aria-label={`${title} project page`}
			onMouseEnter={() => onHover(slug)}
			onMouseLeave={() => onHover(null)}
			onFocus={() => onHover(slug)}
			onBlur={() => onHover(null)}
			className="outline-none"
		>
			<rect
				x={x} y={y} width={w} height={h} rx={6}
				fill={active ? 'hsl(var(--accent) / 0.12)' : 'hsl(var(--card))'}
				stroke={active ? 'hsl(var(--accent))' : 'hsl(var(--pcb))'}
				strokeWidth={active ? 2.5 : 1.5}
				style={{ transition: 'all 0.2s', cursor: 'pointer' }}
			/>
			<text x={x + 14} y={y + h / 2 - 8} className="font-mono" fontSize={12} fill="hsl(var(--accent))">{refdes(slug)}</text>
			<text x={x + 48} y={y + h / 2 - 8} fontSize={16} fontWeight={700} fill="hsl(var(--foreground))">{title}</text>
			<text x={x + 48} y={y + h / 2 + 14} fontSize={12} fill="hsl(var(--muted-foreground))">{sub}</text>
		</a>
	);
}

export function ProjectMap() {
	const [hover, setHover] = useState<string | null>(null);

	const desktop = (
		<svg viewBox="0 0 1000 460" className="hidden md:block w-full h-auto" role="group" aria-label="Schematic map of projects">
			{/* Chip */}
			<rect x={410} y={70} width={180} height={320} rx={8} fill="hsl(var(--card))" stroke="hsl(var(--foreground) / 0.7)" strokeWidth={2} />
			<circle cx={428} cy={88} r={5} fill="hsl(var(--foreground) / 0.5)" />
			<text x={500} y={218} textAnchor="middle" fontSize={20} fontWeight={700} fill="hsl(var(--foreground))">Maxwell Tsai</text>
			<text x={500} y={242} textAnchor="middle" fontSize={12} className="font-mono" fill="hsl(var(--muted-foreground))">EE · ROBOTICS</text>
			<text x={426} y={60} fontSize={11} className="font-mono" fill="hsl(var(--muted-foreground))">HARDWARE</text>
			<text x={574} y={60} textAnchor="end" fontSize={11} className="font-mono" fill="hsl(var(--muted-foreground))">SOFTWARE</text>

			{PIN_Y.map((py, i) => (
				<g key={`pins-${i}`}>
					<line x1={390} y1={py} x2={410} y2={py} stroke="hsl(var(--foreground) / 0.7)" strokeWidth={2} />
					<line x1={590} y1={py} x2={610} y2={py} stroke="hsl(var(--foreground) / 0.7)" strokeWidth={2} />
					<text x={418} y={py + 4} fontSize={11} className="font-mono" fill="hsl(var(--muted-foreground))">{i + 1}</text>
					<text x={582} y={py + 4} textAnchor="end" fontSize={11} className="font-mono" fill="hsl(var(--muted-foreground))">{i + 4}</text>
				</g>
			))}

			{hw.map((p, i) => {
				const d = `M 390 ${PIN_Y[i]} H 320 V ${BLOCK_Y[i]} H 260`;
				return (
					<g key={p.slug}>
						<Wire d={d} active={hover === p.slug} delay={i * 0.15} />
						<circle cx={390} cy={PIN_Y[i]} r={3.5} fill="hsl(var(--pcb))" />
						<text x={355} y={PIN_Y[i] - 8} textAnchor="middle" fontSize={10} className="font-mono" fill="hsl(var(--muted-foreground))">{short[p.slug]}</text>
						<Block x={40} y={BLOCK_Y[i] - 38} w={220} h={76} slug={p.slug} title={p.title} sub={p.slug === 'busbot' ? 'Senior design, in progress' : p.period} active={hover === p.slug} onHover={setHover} />
					</g>
				);
			})}
			{sw.map((p, i) => {
				const d = `M 610 ${PIN_Y[i]} H 680 V ${BLOCK_Y[i]} H 740`;
				return (
					<g key={p.slug}>
						<Wire d={d} active={hover === p.slug} delay={0.45 + i * 0.15} />
						<circle cx={610} cy={PIN_Y[i]} r={3.5} fill="hsl(var(--pcb))" />
						<text x={645} y={PIN_Y[i] - 8} textAnchor="middle" fontSize={10} className="font-mono" fill="hsl(var(--muted-foreground))">{short[p.slug]}</text>
						<Block x={740} y={BLOCK_Y[i] - 38} w={220} h={76} slug={p.slug} title={p.title} sub={p.period} active={hover === p.slug} onHover={setHover} />
					</g>
				);
			})}
		</svg>
	);

	const rowY = (i: number) => 150 + i * 78;
	const mobile = (
		<svg viewBox="0 0 360 640" className="md:hidden w-full h-auto" role="group" aria-label="Schematic map of projects">
			<rect x={110} y={16} width={170} height={80} rx={8} fill="hsl(var(--card))" stroke="hsl(var(--foreground) / 0.7)" strokeWidth={2} />
			<text x={195} y={54} textAnchor="middle" fontSize={17} fontWeight={700} fill="hsl(var(--foreground))">Maxwell Tsai</text>
			<text x={195} y={74} textAnchor="middle" fontSize={11} className="font-mono" fill="hsl(var(--muted-foreground))">EE · ROBOTICS</text>
			<line x1={90} y1={56} x2={110} y2={56} stroke="hsl(var(--foreground) / 0.7)" strokeWidth={2} />
			{ordered.map((p, i) => {
				const cy = rowY(i);
				const d = `M 90 56 H 30 V ${cy} H 64`;
				return (
					<g key={p.slug}>
						<Wire d={d} active={hover === p.slug} delay={i * 0.12} />
						<circle cx={30} cy={cy} r={3.5} fill="hsl(var(--pcb))" />
						<Block x={64} y={cy - 30} w={286} h={60} slug={p.slug} title={p.title} sub={`${p.category} · ${short[p.slug]}`} active={hover === p.slug} onHover={setHover} />
					</g>
				);
			})}
			<circle cx={90} cy={56} r={3.5} fill="hsl(var(--pcb))" />
		</svg>
	);

	return (
		<section className="py-16 md:py-24 pcb-grid">
			<div className="container px-4">
				<SectionHeader title="Project Map" description="Every project, wired to the engineer who built it. Pick a part to open its page." />
				<div className="mt-6 rounded-xl border bg-background/60 p-4 md:p-8">
					{desktop}
					{mobile}
				</div>
			</div>
		</section>
	);
}

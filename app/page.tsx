import Link from 'next/link';

import { experiences } from '@/lib/constants';
import { projects, refdes, termCode } from '@/lib/projects';

const toolbox = ['Python', 'C/C++', 'MATLAB', 'Verilog', 'ESP32-S3', 'KiCad', 'I2C / UART', 'Onshape'];

const titleBlock = [
	['TITLE', 'Maxwell Tsai'],
	['SCHOOL', 'Boston University'],
	['GRADUATES', 'May 2027'],
	['REV', '2026.11'],
];

// Newest first; letters count up like drawing revisions.
const revisions = [
	{ rev: 'C', title: 'Senior design: BusBot', sub: 'Boston University · sensor integration lead', date: '2026–27', href: '/projects/busbot/' },
	...experiences.map((e, i) => ({
		rev: String.fromCharCode(66 - i), // B, A
		title: e.title,
		sub: `${e.company}${e.location ? ` · ${e.location}` : ''}`,
		date: `${e.startDate.replace(/ \d{4}$/, '')}–${e.endDate}`,
		href: '/experience/',
	})),
];

export default function Home() {
	const pinned = projects.filter((p) => p.pinned);

	return (
		<div className="flex flex-col gap-8">
			<section aria-label="Introduction" className="rounded-lg border bg-card overflow-hidden">
				<div className="p-6 md:p-7">
					<h2 className="text-3xl font-bold leading-tight">Maxwell Tsai, EE &amp; Robotics</h2>
					<p className="mt-2 text-lg font-medium text-[hsl(var(--pcb-light))]">Building hardware and systems for robotics.</p>
					<p className="mt-3 text-base leading-relaxed text-foreground/80 max-w-2xl">
						Electrical engineering student at Boston University, concentrating in robotics. Looking for full-time roles starting 2027.
					</p>
					<div className="mt-5 flex flex-wrap gap-2">
						{toolbox.map((t) => (
							<span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
						))}
					</div>
				</div>
				<dl className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border-t font-mono text-xs">
					{titleBlock.map(([k, v]) => (
						<div key={k} className="bg-card px-4 py-2.5">
							<dt className="text-muted-foreground">{k}</dt>
							<dd className="mt-0.5">{v}</dd>
						</div>
					))}
				</dl>
			</section>

			<section aria-label="Main projects">
				<div className="flex items-baseline justify-between mb-4">
					<h2 className="text-lg font-semibold">Placed parts</h2>
					<Link href="/projects/" className="text-sm text-muted-foreground hover:text-primary">All {projects.length} projects →</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4 px-[11px]">
					{pinned.map((p) => (
						<article key={p.slug} className="part rounded-lg border bg-card p-4 flex flex-col gap-2 hover:border-primary/60 transition-colors">
							<div className="flex items-center gap-2.5">
								<span className="font-mono text-xs font-semibold text-[hsl(var(--pcb-light))]">{refdes(p.slug)}</span>
								<Link href={`/projects/${p.slug}/`} className="text-base font-semibold hover:text-primary">{p.title}</Link>
								{p.status === 'In progress' && (
									<span className="ml-auto font-mono text-[11px] px-2 py-0.5 rounded-full border text-muted-foreground">in progress</span>
								)}
							</div>
							<p className="text-sm leading-relaxed text-foreground/75">{p.blurb ?? p.summary}</p>
							<div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
								<span
									aria-hidden="true"
									className={`h-2.5 w-2.5 ${p.category === 'Hardware' ? 'rounded-full bg-[hsl(var(--pcb-light))]' : 'rounded-sm bg-primary'}`}
								/>
								{p.tags.slice(0, 2).join(' · ')}
								<span className="ml-auto">{p.category} · {termCode(p)}</span>
							</div>
						</article>
					))}
				</div>
			</section>

			<section aria-label="Experience">
				<div className="flex items-baseline justify-between mb-4">
					<h2 className="text-lg font-semibold">Revision history</h2>
					<Link href="/experience/" className="text-sm text-muted-foreground hover:text-primary">All experience →</Link>
				</div>
				<div className="rounded-lg border bg-card overflow-x-auto">
					<table className="w-full min-w-[520px] text-sm">
						<thead>
							<tr className="font-mono text-[11px] tracking-widest text-muted-foreground text-left">
								<th className="px-4 py-2.5 font-medium border-b w-16">REV</th>
								<th className="px-4 py-2.5 font-medium border-b">DESCRIPTION</th>
								<th className="px-4 py-2.5 font-medium border-b text-right">DATE</th>
							</tr>
						</thead>
						<tbody>
							{revisions.map((r) => (
								<tr key={r.rev} className="border-b last:border-b-0">
									<td className="px-4 py-3 font-mono text-[hsl(var(--pcb-light))]">{r.rev}</td>
									<td className="px-4 py-3">
										<Link href={r.href} className="font-medium hover:text-primary">{r.title}</Link>
										<div className="text-[13px] text-muted-foreground">{r.sub}</div>
									</td>
									<td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}

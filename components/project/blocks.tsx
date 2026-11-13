import { FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Block, Figure } from '@/lib/projects';
import { RichText } from './rich-text';

// Figures and tables are numbered in order down the page, like a report.
export type Counter = { fig: number; tab: number };

function FigureView({ figure, n }: { figure: Figure; n: number }) {
	return (
		<figure className="space-y-2">
			<a href={figure.src} target="_blank" rel="noreferrer" title="Open full size">
				<img
					src={figure.src}
					alt={figure.alt}
					loading="lazy"
					className="w-full rounded-lg border bg-white/5 object-contain max-h-[520px]"
				/>
			</a>
			<figcaption className="text-sm text-muted-foreground">
				<span className="font-semibold text-foreground">Figure {n}.</span> {figure.caption}
			</figcaption>
		</figure>
	);
}

function cellClass(value: string) {
	if (value === 'Pass') return 'text-emerald-400 font-semibold';
	if (value === 'Fail') return 'text-rose-400 font-semibold';
	return '';
}

export function BlockView({ block, counter }: { block: Block; counter: Counter }) {
	switch (block.type) {
		case 'p':
			return <p className="text-muted-foreground leading-relaxed"><RichText text={block.text} /></p>;
		case 'note':
			return <p className="text-sm text-muted-foreground"><RichText text={block.text} /></p>;
		case 'h3':
			return <h3 className="text-xl font-semibold pt-4">{block.text}</h3>;
		case 'list':
			return (
				<ul className="space-y-2 text-muted-foreground">
					{block.items.map((item, i) => (
						<li key={i} className="flex gap-3">
							<span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
							<span className="leading-relaxed"><RichText text={item} /></span>
						</li>
					))}
				</ul>
			);
		case 'code':
			return (
				<pre className="overflow-x-auto rounded-lg border bg-card p-4 text-sm font-mono">
					<code>{block.text}</code>
				</pre>
			);
		case 'equation':
			return (
				<div className="rounded-lg border bg-card p-5 font-mono text-sm md:text-base space-y-1 overflow-x-auto">
					{block.lines.map((line, i) => (
						<div key={i} className="whitespace-pre">{line}</div>
					))}
				</div>
			);
		case 'button':
			return (
				<Button asChild variant="outline">
					<a href={block.href} target="_blank" rel="noreferrer">
						<FileText className="mr-2 h-4 w-4" /> {block.label}
					</a>
				</Button>
			);
		case 'figure':
			return <FigureView figure={block.figure} n={++counter.fig} />;
		case 'figures':
			return (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{block.figures.map((f, i) => (
						<FigureView key={i} figure={f} n={++counter.fig} />
					))}
				</div>
			);
		case 'video': {
			const n = ++counter.fig;
			return (
				<figure className="space-y-2">
					<video controls preload="metadata" src={block.src} aria-label={block.label} className="w-full rounded-lg border bg-black" />
					<figcaption className="text-sm text-muted-foreground">
						<span className="font-semibold text-foreground">Figure {n}.</span> {block.caption}
					</figcaption>
				</figure>
			);
		}
		case 'table': {
			const n = block.caption ? ++counter.tab : 0;
			return (
				<div className="overflow-x-auto rounded-lg border">
					<table className="w-full text-sm">
						{block.caption && (
							<caption className="caption-top px-4 py-3 text-left text-muted-foreground border-b">
								<span className="font-semibold text-foreground">Table {n}.</span> {block.caption}
							</caption>
						)}
						{block.head && (
							<thead className="bg-muted/50">
								<tr>
									{block.head.map((h, i) => (
										<th key={i} className={cn('px-4 py-2 font-semibold text-left', block.numeric?.includes(i) && 'text-right')}>{h}</th>
									))}
								</tr>
							</thead>
						)}
						<tbody>
							{block.rows.map((row, r) => (
								<tr key={r} className={cn('border-t first:border-t-0 [thead+tbody_&]:border-t', block.mine?.includes(r) && 'bg-primary/10')}>
									{row.map((cell, c) =>
										block.rowHeaders && c === 0 ? (
											<th key={c} scope="row" className="px-4 py-2 text-left font-semibold align-top whitespace-nowrap">{cell}</th>
										) : (
											<td key={c} className={cn('px-4 py-2 align-top text-muted-foreground', block.numeric?.includes(c) && 'text-right tabular-nums whitespace-nowrap', cellClass(cell))}>
												<RichText text={cell} />
											</td>
										)
									)}
								</tr>
							))}
						</tbody>
					</table>
					{block.mine && <p className="px-4 py-2 text-xs text-muted-foreground border-t"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary/30 mr-2 align-middle" />My work</p>}
				</div>
			);
		}
		case 'budget': {
			const n = ++counter.fig;
			const shades = ['bg-primary/80', 'bg-secondary/80', 'bg-accent/80 text-accent-foreground', 'bg-muted'];
			const values = block.segments.map((s) => parseFloat(s.value));
			const total = values.reduce((a, b) => a + b, 0);
			return (
				<figure className="space-y-2">
					<div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border text-sm" role="img" aria-label={block.segments.map((s) => `${s.value} ${s.label}`).join(', ')}>
						{block.segments.map((s, i) => (
							<div key={i} className={cn('p-3', shades[i % shades.length])} style={{ flexGrow: values[i] / total, flexBasis: 0, minWidth: '7.5rem' }}>
								<div className="font-bold text-base">{s.value}</div>
								<div className="opacity-90">{s.label}</div>
							</div>
						))}
					</div>
					<figcaption className="text-sm text-muted-foreground">
						<span className="font-semibold text-foreground">Figure {n}.</span> {block.caption}
					</figcaption>
				</figure>
			);
		}
		case 'trials': {
			const n = ++counter.tab;
			return (
				<div className="space-y-2">
					<div className="overflow-x-auto rounded-lg border">
						<table className="w-full text-sm">
							<caption className="caption-top px-4 py-3 text-left text-muted-foreground border-b">
								<span className="font-semibold text-foreground">Table {n}.</span> {block.caption}
							</caption>
							<thead className="bg-muted/50">
								<tr>
									<th className="px-4 py-2 text-right font-semibold">Distance</th>
									<th className="px-4 py-2 text-left font-semibold">Trials</th>
									<th className="px-4 py-2 text-right font-semibold">Succeeded</th>
								</tr>
							</thead>
							<tbody>
								{block.rows.map((row, i) => (
									<tr key={i} className="border-t">
										<td className="px-4 py-2 text-right tabular-nums">{row.label}</td>
										<td className="px-4 py-2">
											<span className="flex gap-1" aria-hidden="true">
												{row.results.map((ok, j) => (
													<span key={j} className={cn('h-3.5 w-3.5 rounded-sm border border-primary', ok && 'bg-primary')} />
												))}
											</span>
										</td>
										<td className="px-4 py-2 text-right tabular-nums text-muted-foreground">
											{row.results.filter(Boolean).length} of {row.results.length}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="text-sm text-muted-foreground">{block.note}</p>
				</div>
			);
		}
		case 'cols':
			return (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
					<div className="space-y-4 min-w-0">{block.left.map((b, i) => <BlockView key={i} block={b} counter={counter} />)}</div>
					<div className="space-y-4 min-w-0">{block.right.map((b, i) => <BlockView key={i} block={b} counter={counter} />)}</div>
				</div>
			);
	}
}

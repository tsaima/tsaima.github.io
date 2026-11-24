import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { BlockView, type Counter } from '@/components/project/blocks';
import { SkillIcon } from '@/components/skill-icon';
import { projects, getProject } from '@/lib/projects';
import { toolsFor } from '@/lib/skills';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);
	return project ? { title: `${project.title} | Maxwell Tsai`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Params }) {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();

	const index = projects.indexOf(project);
	const next = projects[(index + 1) % projects.length];
	const counter: Counter = { fig: 0, tab: 0 };
	const used = toolsFor(project.tags);
	const methods = project.tags.filter((t) => !used.some((u) => u.tags.includes(t)));

	return (
		<article className="pt-10 md:pt-14 pb-4">
			<div>
				<Link href="/#projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-10">
					<ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> All projects
				</Link>

				<header className="mb-12">
					<h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] mb-5">{project.title}</h1>
					<p className="text-lg md:text-xl leading-relaxed text-foreground/85 max-w-[60ch]">{project.lead}</p>
					<p className="mt-4 text-sm text-muted-foreground">
						{project.category} · {project.period}
					</p>
					<ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-muted-foreground">
						{used.map((t) => (
							<li key={t.name} className="inline-flex items-center gap-2 text-foreground/85">
								<SkillIcon tool={t} />
								{t.name}
							</li>
						))}
						{methods.map((m) => (
							<li key={m}>{m}</li>
						))}
					</ul>
				</header>

				<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-14">
					<dl className="border-y divide-y">
						{project.facts.map(([label, value]) => (
							<div key={label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3 text-sm">
								<dt className="text-muted-foreground">{label}</dt>
								<dd>{value}</dd>
							</div>
						))}
					</dl>
					{project.hero && <BlockView block={project.hero} counter={counter} />}
				</section>

				{project.sections.map((section) => (
					<section key={section.title} id={section.id} className="mb-14 scroll-mt-24">
						<h2 className="text-2xl font-semibold tracking-tight mb-6">{section.title}</h2>
						<div className="space-y-5">
							{section.blocks.map((block, i) => (
								<BlockView key={i} block={block} counter={counter} />
							))}
						</div>
					</section>
				))}

				<nav aria-label="More projects" className="mt-16 flex flex-col sm:flex-row justify-between gap-4 border-t pt-8">
					<Link href="/#projects" className="inline-flex items-center text-muted-foreground hover:text-foreground">
						<ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> All projects
					</Link>
					<Link href={`/projects/${next.slug}/`} className="inline-flex items-center font-medium hover:text-primary">
						Next: {next.title} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
					</Link>
				</nav>
			</div>
		</article>
	);
}

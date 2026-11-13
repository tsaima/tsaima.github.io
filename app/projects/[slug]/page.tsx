import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BlockView, type Counter } from '@/components/project/blocks';
import { projects, getProject } from '@/lib/projects';

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

	return (
		<article className="py-16 md:py-24">
			<div className="container max-w-5xl">
				<Link href="/projects/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
					<ArrowLeft className="mr-2 h-4 w-4" /> All projects
				</Link>

				<header className="mb-10">
					<p className="text-sm uppercase tracking-wide text-primary mb-2">
						{project.category} project · {project.period}
					</p>
					<h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
					<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{project.lead}</p>
					<div className="flex flex-wrap gap-2 mt-5">
						{project.tags.map((tag) => (
							<Badge key={tag} variant="secondary">{tag}</Badge>
						))}
					</div>
				</header>

				<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-14">
					<dl className="rounded-lg border bg-card divide-y">
						{project.facts.map(([label, value]) => (
							<div key={label} className="grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-3 text-sm">
								<dt className="font-semibold">{label}</dt>
								<dd className="text-muted-foreground">{value}</dd>
							</div>
						))}
					</dl>
					{project.hero && <BlockView block={project.hero} counter={counter} />}
				</section>

				{project.sections.map((section) => (
					<section key={section.title} id={section.id} className="mb-14 scroll-mt-24">
						<h2 className="section-title">{section.title}</h2>
						<div className="space-y-5">
							{section.blocks.map((block, i) => (
								<BlockView key={i} block={block} counter={counter} />
							))}
						</div>
					</section>
				))}

				<nav className="mt-16 flex flex-col sm:flex-row justify-between gap-4 border-t pt-8">
					<Link href="/projects/" className="inline-flex items-center text-muted-foreground hover:text-primary">
						<ArrowLeft className="mr-2 h-4 w-4" /> All projects
					</Link>
					<Link href={`/projects/${next.slug}/`} className="inline-flex items-center font-medium text-primary hover:underline">
						Next: {next.title} <ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</nav>
			</div>
		</article>
	);
}

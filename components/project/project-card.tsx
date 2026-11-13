import Link from 'next/link';
import { ArrowRight, Cpu, Code2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project }: { project: Project }) {
	const href = `/projects/${project.slug}/`;
	return (
		<Card className="flex flex-col h-full w-full card-gradient group">
			<Link href={href} className="relative block h-48 w-full overflow-hidden rounded-t-lg bg-muted" tabIndex={-1} aria-hidden="true">
				{project.image ? (
					<img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/30 via-card to-primary/20">
						{project.category === 'Hardware' ? <Cpu className="h-12 w-12 text-primary" /> : <Code2 className="h-12 w-12 text-primary" />}
					</div>
				)}
				<span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-0.5 text-xs font-medium backdrop-blur">
					{project.category}
				</span>
			</Link>
			<CardContent className="flex-grow p-6">
				<p className="text-xs uppercase tracking-wide text-primary mb-1">{project.period}</p>
				<h3 className="font-bold text-xl mb-2">
					<Link href={href} className="hover:text-primary transition-colors">{project.title}</Link>
				</h3>
				<p className="text-muted-foreground mb-3">{project.summary}</p>
				<p className="text-sm mb-4"><span className="font-semibold">My role:</span> <span className="text-muted-foreground">{project.role}</span></p>
				<div className="flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<Badge key={tag} variant="secondary">{tag}</Badge>
					))}
				</div>
			</CardContent>
			<CardFooter className="p-6 pt-0">
				<Link href={href} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
					Read more <ArrowRight className="ml-1 h-4 w-4" />
				</Link>
			</CardFooter>
		</Card>
	);
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { ProjectCard } from '@/components/project/project-card';
import { projects } from '@/lib/projects';
import { staggerContainer, fadeInScale } from '@/lib/motion';

export function ProjectsPreview() {
	const previewProjects = projects.filter((p) => !p.featured).slice(0, 3);

	return (
		<section className="py-16 md:py-24">
			<div className="container px-4">
				<SectionHeader title="More Projects" description="Robot arms, laser links, power grids and FPGAs." />

				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4"
				>
					{previewProjects.map((project, index) => (
						<motion.div key={project.slug} variants={fadeInScale(index * 0.1)} className="flex">
							<ProjectCard project={project} />
						</motion.div>
					))}
				</motion.div>

				<div className="flex justify-center mt-10">
					<Button asChild>
						<Link href="/projects/">
							View all projects <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

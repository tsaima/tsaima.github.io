'use client';

import { motion } from 'framer-motion';

import { ProjectCard } from '@/components/project/project-card';
import { projects } from '@/lib/projects';
import { staggerContainer, fadeInScale } from '@/lib/motion';

const groups = ['Hardware', 'Software'] as const;

export default function ProjectsPage() {
	return (
		<div className="py-16 md:py-24">
			<div className="container">
				<motion.div variants={staggerContainer()} initial="hidden" animate="show">
					<motion.div variants={fadeInScale(0.2)} className="text-center mb-12">
						<h1 className="text-4xl font-bold mb-4">Projects</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Hardware and software projects from Boston University. Short on time? Start with BusBot, my senior design
							project and the work I am proudest of.
						</p>
					</motion.div>

					{groups.map((group) => (
						<section key={group} className="mb-16">
							<h2 className="section-title">{group} projects</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{projects
									.filter((p) => p.category === group)
									.map((project, index) => (
										<motion.div key={project.slug} variants={fadeInScale(index * 0.1)} className="flex">
											<ProjectCard project={project} />
										</motion.div>
									))}
							</div>
						</section>
					))}
				</motion.div>
			</div>
		</div>
	);
}

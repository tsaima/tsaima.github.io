'use client';

import { motion } from 'framer-motion';

import { ProjectCard } from '@/components/project/project-card';
import { ProjectMap } from '@/components/home/project-map';
import { projects } from '@/lib/projects';
import { staggerContainer, fadeInScale } from '@/lib/motion';

const groups = [
	{ title: 'Main projects', filter: (p: (typeof projects)[number]) => !!p.pinned },
	{ title: 'Other projects', filter: (p: (typeof projects)[number]) => !p.pinned },
];

export default function ProjectsPage() {
	return (
		<div className="pb-4">
			<div>
				<motion.div variants={staggerContainer()} initial="hidden" animate="show">
					<motion.div variants={fadeInScale(0.2)} className="mb-10">
						<h1 className="text-3xl font-bold mb-4">Projects</h1>
						<p className="text-base text-muted-foreground max-w-2xl">
							Hardware and software projects from Boston University. Short on time? Start with BusBot, my senior design
							project and the work I am proudest of.
						</p>
					</motion.div>

					<ProjectMap />

					{groups.map((group) => (
						<section key={group.title} className="mb-16">
							<h2 className="section-title">{group.title}</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
								{projects
									.filter(group.filter)
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

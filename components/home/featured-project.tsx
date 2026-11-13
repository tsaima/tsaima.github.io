'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui/section-header';
import { projects } from '@/lib/projects';
import { fadeIn } from '@/lib/motion';

const highlights = [
	'Wrote ESP32-S3 firmware that stops the drive motor when an obstacle comes within 40 cm.',
	'Wrote and ran the obstacle detection test plan, including the test that failed.',
	'Integrated the battery monitor and chose the battery from a power budget.',
];

export function FeaturedProject() {
	const project = projects.find((p) => p.featured)!;
	const href = `/projects/${project.slug}/`;
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container px-4">
				<SectionHeader title="Featured Project" description="My senior design project and the work I am proudest of." />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4 items-center">
					<motion.div variants={fadeIn('right', 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
						<p className="text-sm uppercase tracking-wide text-primary mb-2">{project.period}</p>
						<h3 className="text-3xl font-bold mb-4">
							<Link href={href} className="hover:text-primary transition-colors">BusBot: a robot that collects dishes</Link>
						</h3>
						<p className="text-muted-foreground mb-5">{project.summary}</p>
						<ul className="space-y-2 mb-6">
							{highlights.map((h) => (
								<li key={h} className="flex gap-3 text-muted-foreground">
									<span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
									<span>{h}</span>
								</li>
							))}
						</ul>
						<div className="flex flex-wrap gap-2 mb-8">
							{project.tags.map((t) => (
								<Badge key={t} variant="secondary">{t}</Badge>
							))}
						</div>
						<Button asChild>
							<Link href={href}>
								Read about BusBot <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</motion.div>
					<motion.figure variants={fadeIn('left', 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-2">
						<img src={project.image} alt="BusBot system integration in November 2026: chassis base with motors, battery and control electronics" className="w-full rounded-lg border" />
						<figcaption className="text-sm text-muted-foreground">BusBot system integration, November 2026.</figcaption>
					</motion.figure>
				</div>
			</div>
		</section>
	);
}

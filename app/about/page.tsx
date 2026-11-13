'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown, GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { education, facts, intro, siteConfig, skillGroups } from '@/lib/constants';
import { fadeIn, staggerContainer } from '@/lib/motion';

export default function AboutPage() {
	return (
		<div className="py-16 md:py-24">
			<div className="container">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
				>
					<motion.div variants={fadeIn('right', 0.3)} className="space-y-6">
						<h1 className="text-4xl font-bold">About Me</h1>
						<p className="text-lg text-muted-foreground">{intro}</p>
						<dl className="rounded-lg border bg-card divide-y">
							{facts.map((f) => (
								<div key={f.label} className="grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-3 text-sm">
									<dt className="font-semibold">{f.label}</dt>
									<dd className="text-muted-foreground">{f.value}</dd>
								</div>
							))}
						</dl>
						<div className="flex flex-wrap gap-3">
							{siteConfig.resumes.map((r) => (
								<Button key={r.href} variant="outline" asChild>
									<a href={r.href} target="_blank" rel="noreferrer">
										{r.title} <FileDown className="ml-2 h-4 w-4" />
									</a>
								</Button>
							))}
						</div>
					</motion.div>

					<motion.div variants={fadeIn('left', 0.3)} className="relative h-[420px] lg:h-[500px] rounded-lg overflow-hidden">
						<img src="/images/headshot.jpg" alt="Maxwell Tsai" className="h-full w-full object-cover" />
					</motion.div>
				</motion.div>

				<motion.section variants={fadeIn('up', 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24">
					<h2 className="section-title">Education</h2>
					{education.map((e) => (
						<Card key={e.institution} className="card-gradient">
							<CardContent className="p-6 flex gap-4">
								<GraduationCap className="h-8 w-8 text-primary shrink-0" />
								<div>
									<h3 className="text-xl font-semibold">{e.degree}, {e.field}</h3>
									<p className="text-primary">{e.institution}, {e.location}</p>
									<p className="text-sm text-muted-foreground mt-1">{e.endDate}</p>
									{e.details.length > 0 && (
										<ul className="mt-3 list-disc pl-5 text-muted-foreground">
											{e.details.map((d) => <li key={d}>{d}</li>)}
										</ul>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</motion.section>

				<motion.section variants={fadeIn('up', 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20">
					<h2 className="section-title">Skills</h2>
					<p className="text-muted-foreground mb-6">Tools and methods I have used in the projects on this site.</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{skillGroups.map((g) => (
							<Card key={g.title}>
								<CardContent className="p-6">
									<h3 className="text-lg font-semibold mb-4">{g.title}</h3>
									<div className="flex flex-wrap gap-2">
										{g.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</motion.section>

				<div className="mt-16 flex justify-center">
					<Button asChild>
						<Link href="/projects/">See the projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

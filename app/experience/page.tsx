'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { experiences } from '@/lib/constants';
import { fadeIn, staggerContainer } from '@/lib/motion';

export default function ExperiencePage() {
	return (
		<div className="py-16 md:py-24">
			<div className="container">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
					className="max-w-3xl mx-auto"
				>
					<motion.h1
						variants={fadeIn('down', 0.2)}
						className="text-4xl font-bold mb-6"
					>
						Professional Experience
					</motion.h1>
					<motion.p
						variants={fadeIn('down', 0.3)}
						className="text-lg text-muted-foreground mb-12"
					>
						Two summer internships at Intel in Hillsboro, Oregon.
					</motion.p>

					<div className="space-y-8">
						{experiences.map((exp, index) => (
							<motion.div
								key={index}
								variants={fadeIn('up', 0.2 * index)}
							>
								<Card className="card-gradient">
									<CardContent className="p-6">
										<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
											<div>
												<h2 className="text-2xl font-semibold">{exp.title}</h2>
												<p className="text-primary">{exp.company}</p>
											</div>
										</div>

										<div className="space-y-3 mb-6">
											{exp.location && (
												<div className="flex items-center text-muted-foreground">
													<MapPin className="h-4 w-4 mr-2" />
													{exp.location}
												</div>
											)}
											<div className="flex items-center text-muted-foreground">
												<Calendar className="h-4 w-4 mr-2" />
												{exp.endDate ? `${exp.startDate} – ${exp.endDate}` : exp.startDate}
											</div>
										</div>

										{exp.summary && <p className="text-muted-foreground mb-6 leading-relaxed">{exp.summary}</p>}

										<div className="space-y-4">
											<h3 className="text-lg font-semibold">What I did</h3>
											<ul className="space-y-2">
												{exp.description.map((item, i) => (
													<li key={i} className="flex items-start">
														<CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
														<span className="text-muted-foreground">{item}</span>
													</li>
												))}
											</ul>
										</div>

										{exp.layers && (
											<figure className="mt-8 space-y-2">
												<h3 className="text-lg font-semibold mb-3">How the API is layered</h3>
												<div className="space-y-0">
													{exp.layers.map((layer, i) => (
														<div key={layer.title}>
															<div className={`grid grid-cols-[1fr_auto] gap-4 items-center rounded-md border px-4 py-3 ${layer.label === 'My API' ? 'border-primary/60 bg-[hsl(var(--pcb)/0.18)]' : 'bg-background'}`}>
																<div>
																	<p className="font-semibold">{layer.title}</p>
																	<p className="text-sm text-muted-foreground">{layer.detail}</p>
																</div>
																<span className="font-mono text-xs text-muted-foreground">{layer.label}</span>
															</div>
															{i < exp.layers!.length - 1 && <div className="mx-auto h-4 w-px bg-[hsl(var(--pcb))]" />}
														</div>
													))}
												</div>
												<figcaption className="text-sm text-muted-foreground pt-1">Highlighted layers are what I wrote.</figcaption>
											</figure>
										)}

										<div className="mt-6">
											<h3 className="text-lg font-semibold mb-3">Tools</h3>
											<div className="flex flex-wrap gap-2">
												{exp.technologies.map((tech, i) => (
													<Badge key={i} variant="secondary">
														{tech}
													</Badge>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
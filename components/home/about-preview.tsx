'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { facts, intro } from '@/lib/constants';
import { fadeIn } from '@/lib/motion';

export function AboutPreview() {
	const cards = facts.filter((f) => f.label !== 'Location');
	return (
		<section className="py-16 md:py-24">
			<div className="container px-4">
				<SectionHeader title="About Me" />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 items-center">
					<motion.div
						variants={fadeIn('right', 0.3)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-lg overflow-hidden border"
					>
						<img src="/images/headshot.jpg" alt="Maxwell Tsai" className="h-full w-full object-cover object-top" />
					</motion.div>

					<motion.div
						variants={fadeIn('left', 0.3)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="flex flex-col justify-center"
					>
						<p className="text-lg text-muted-foreground mb-6">{intro}</p>

						<div className="grid grid-cols-2 gap-4 mb-6">
							{cards.map((f) => (
								<Card key={f.label} className="card-gradient">
									<CardContent className="p-4">
										<h4 className="font-semibold">{f.label}</h4>
										<p className="text-sm text-muted-foreground">{f.value}</p>
									</CardContent>
								</Card>
							))}
						</div>

						<div>
							<Button asChild>
								<Link href="/about/">
									More about me <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

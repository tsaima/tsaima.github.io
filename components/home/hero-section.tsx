'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { LidarScan } from './lidar-scan';

import { Button } from '@/components/ui/button';
import { fadeIn, staggerContainer } from '@/lib/motion';
import { intro, siteConfig } from '@/lib/constants';

export function HeroSection() {
	return (
		<section className="relative overflow-hidden">
			{/* LiDAR sweep background */}
			<div className="absolute inset-0 z-0">
				<LidarScan className="h-full w-full" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_50%,hsl(var(--background)/0.85),transparent)]" />
			</div>
			<p className="absolute bottom-6 right-6 z-10 hidden md:block font-mono text-xs text-muted-foreground/80">
				276° LiDAR scan · dashed arcs: ultrasonic coverage of the blind spot
			</p>

			{/* Content */}
			<div className="container relative z-10 px-4 py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh]">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
					className="max-w-3xl mx-auto text-center"
				>
					<motion.h2
						variants={fadeIn('up', 0.2)}
						className="text-sm md:text-base font-mono uppercase tracking-[0.2em] mb-5 text-muted-foreground"
					>
						Electrical Engineering · Robotics
					</motion.h2>

					<motion.h1
						variants={fadeIn('up', 0.3)}
						className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
					>
						<span className="text-gradient">Maxwell Tsai</span>
					</motion.h1>

					<motion.p
						variants={fadeIn('up', 0.5)}
						className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
					>
						{intro}
					</motion.p>

					<motion.div
						variants={fadeIn('up', 0.7)}
						className="mt-10 flex flex-wrap gap-4 justify-center"
					>
						<Button size="lg" asChild>
							<Link href="/projects/">
								View projects <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						{siteConfig.resumes.map((r) => (
							<Button key={r.href} size="lg" variant="outline" asChild>
								<a href={r.href} target="_blank" rel="noreferrer">
									{r.short} <FileDown className="ml-2 h-4 w-4" />
								</a>
							</Button>
						))}
					</motion.div>
				</motion.div>
			</div>

			{/* Bottom gradient */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
		</section>
	);
}
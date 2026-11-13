'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { siteConfig } from '@/lib/constants';
import { fadeIn } from '@/lib/motion';

export function ContactPreview() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container px-4 text-center">
				<SectionHeader
					title="Get In Touch"
					description="I am looking for full-time engineering roles in Boston starting in 2027."
					className="flex flex-col items-center"
				/>
				<motion.div
					variants={fadeIn('up', 0.3)}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="mt-4 flex flex-wrap gap-4 justify-center"
				>
					<Button size="lg" asChild>
						<a href={siteConfig.links.email}>
							<Mail className="mr-2 h-4 w-4" /> Email me
						</a>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
							<Linkedin className="mr-2 h-4 w-4" /> LinkedIn
						</a>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}

import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';

import { siteConfig } from '@/lib/constants';
import { projects } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
	const currentYear = new Date().getFullYear();

	const columns = [
		{ title: 'Pages', links: siteConfig.mainNav.map((n) => ({ title: n.title, href: n.href })) },
		{ title: 'Projects', links: projects.map((p) => ({ title: p.title, href: `/projects/${p.slug}/` })) },
		{ title: 'Resumes', links: siteConfig.resumes.map((r) => ({ title: r.title, href: r.href, file: true })) },
	];

	return (
		<footer className="bg-card py-12 border-t">
			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="md:col-span-1">
						<Link href="/" className="inline-block">
							<span className="text-2xl font-bold text-gradient">Maxwell Tsai</span>
						</Link>
						<p className="mt-4 text-sm text-muted-foreground">
							Electrical engineering student, robotics concentration. Boston University, May 2027.
						</p>
						<div className="mt-6 flex flex-wrap gap-3">
							<Button size="icon" variant="outline" asChild>
								<a href={siteConfig.links.email} aria-label="Email"><Mail className="h-5 w-5" /></a>
							</Button>
							<Button size="icon" variant="outline" asChild>
								<a href={siteConfig.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin className="h-5 w-5" /></a>
							</Button>
						</div>
					</div>

					<div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
						{columns.map((column) => (
							<div key={column.title}>
								<h3 className="font-semibold mb-3">{column.title}</h3>
								<ul className="space-y-2">
									{column.links.map((link) => (
										<li key={link.href}>
											{'file' in link ? (
												<a href={link.href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary text-sm transition-colors">{link.title}</a>
											) : (
												<Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">{link.title}</Link>
											)}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
					<p>© {currentYear} Maxwell Tsai, Boston, MA</p>
					<a href={siteConfig.links.email} className="hover:text-primary transition-colors">{siteConfig.links.emailText}</a>
				</div>
			</div>
		</footer>
	);
}

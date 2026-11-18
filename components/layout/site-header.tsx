'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, BriefcaseBusiness, Cpu, Mail, User } from 'lucide-react';

import { siteConfig, experiences } from '@/lib/constants';
import { projects } from '@/lib/projects';

const isActive = (pathname: string, href: string) =>
	href === '/' ? pathname === '/' : pathname.replace(/\/$/, '').startsWith(href.replace(/\/$/, ''));

const tabs = [
	{ title: 'Overview', href: '/', icon: BookOpen },
	{ title: 'About', href: '/about/', icon: User },
	{ title: 'Experience', href: '/experience/', icon: BriefcaseBusiness, count: experiences.length },
	{ title: 'Projects', href: '/projects/', icon: Cpu, count: projects.length },
	{ title: 'Contact', href: '/contact/', icon: Mail },
];

function ChipIcon() {
	return (
		<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
			<rect x="5" y="5" width="18" height="18" rx="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" />
			<path
				d="M9 2v3M14 2v3M19 2v3M9 23v3M14 23v3M19 23v3M2 9h3M2 14h3M2 19h3M23 9h3M23 14h3M23 19h3"
				stroke="hsl(var(--pcb))"
				strokeWidth="1.6"
			/>
		</svg>
	);
}

export function SiteHeader() {
	const pathname = usePathname();

	return (
		<header className="bg-card/95 border-b">
			<div className="flex items-center justify-between gap-4 flex-wrap px-4 md:px-8 py-3">
				<Link href="/" className="flex items-center gap-3 hover:no-underline">
					<ChipIcon />
					<span className="font-mono text-sm">
						<span className="text-muted-foreground">maxwell-tsai /</span>{' '}
						<strong className="font-semibold text-foreground">portfolio</strong>
						<span className="text-muted-foreground">.pro</span>
					</span>
				</Link>
				<div className="flex items-center gap-2">
					{siteConfig.resumes.map((r) => (
						<a
							key={r.href}
							href={r.href}
							target="_blank"
							rel="noreferrer"
							className="text-xs sm:text-sm px-3 py-2 rounded-md border hover:border-primary hover:text-primary transition-colors"
						>
							{r.short}
						</a>
					))}
					<img src="/images/headshot-square.jpg" alt="" className="hidden sm:block h-8 w-8 rounded-full object-cover border" />
				</div>
			</div>
			<nav aria-label="Portfolio sections" className="flex gap-1 overflow-x-auto px-2 md:px-6">
				{tabs.map((t) => {
					const active = isActive(pathname, t.href);
					const Icon = t.icon;
					return (
						<Link
							key={t.href}
							href={t.href}
							aria-current={active ? 'page' : undefined}
							className={`flex items-center gap-2 whitespace-nowrap px-3 py-3 text-sm border-b-2 transition-colors ${
								active ? 'border-primary text-foreground font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'
							}`}
						>
							<Icon className="h-4 w-4" aria-hidden="true" />
							{t.title}
							{t.count !== undefined && (
								<span className="font-mono text-[11px] px-2 rounded-full bg-muted text-foreground/80">{t.count}</span>
							)}
						</Link>
					);
				})}
			</nav>
		</header>
	);
}

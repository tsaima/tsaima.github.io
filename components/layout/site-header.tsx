'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/lib/constants';

export function SiteHeader() {
	const pathname = usePathname();
	const onHome = pathname === '/';
	const [active, setActive] = useState<string | null>(null);

	// On the home page, mark the section currently in view.
	useEffect(() => {
		if (!onHome) return setActive(null);
		// The intro is watched too, so no link is marked while it fills the screen.
		const sections = ['intro', ...siteConfig.mainNav.map((n) => n.id)]
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => !!el);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) setActive(e.target.id === 'intro' ? null : e.target.id);
			},
			{ rootMargin: '-45% 0px -50% 0px' },
		);
		sections.forEach((s) => io.observe(s));
		return () => io.disconnect();
	}, [onHome]);

	return (
		<header className="sticky top-0 z-40 bg-background border-b">
			<div className="mx-auto max-w-[1080px] px-5 md:px-8 flex flex-wrap items-center gap-x-8 gap-y-1 py-3 md:py-0 md:h-16">
				<Link href="/" className="text-[15px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary transition-colors">
					{siteConfig.name}
				</Link>
				<a
					href={siteConfig.resume}
					target="_blank"
					rel="noreferrer"
					className="md:order-last ml-auto rounded-md border border-primary/70 px-3.5 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
				>
					Resume
				</a>
				<nav aria-label="Sections" className="w-full md:w-auto md:ml-auto -mx-2 md:mx-0 flex justify-between md:justify-end md:gap-1">
					{siteConfig.mainNav.map((n) => (
						<a
							key={n.id}
							href={`/#${n.id}`}
							aria-current={active === n.id ? 'location' : undefined}
							className={`px-2 py-2 text-sm transition-colors ${
								active === n.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
							}`}
						>
							{n.title}
						</a>
					))}
				</nav>
			</div>
		</header>
	);
}

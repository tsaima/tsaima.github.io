'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Linkedin, Mail, MapPin } from 'lucide-react';

import { siteConfig } from '@/lib/constants';
import { projects, refdes } from '@/lib/projects';

// The project tree: every project as a file in a folder, like an EDA project manager.
const folders: { name: string; files: { slug: string; file: string }[] }[] = [
	{
		name: 'hardware/',
		files: [
			{ slug: 'busbot', file: 'busbot.sch' },
			{ slug: 'meeting-timer', file: 'meeting-timer.sch' },
			{ slug: 'laundry-folder', file: 'laundry-folder.sch' },
			{ slug: 'bedside-beacon', file: 'bedside-beacon.sch' },
			{ slug: 'temperature-monitor', file: 'temp-monitor.sch' },
		],
	},
	{
		name: 'software/',
		files: [
			{ slug: 'whack-a-mole', file: 'whack-a-mole.v' },
			{ slug: 'tetris', file: 'tetris.java' },
			{ slug: 'dc-opf', file: 'grid-congestion.m' },
			{ slug: 'truss', file: 'truss.m' },
			{ slug: 'mbta-ridership', file: 'mbta-ridership.m' },
		],
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const onHome = pathname === '/';
	const current = pathname.match(/^\/projects\/([^/]+)/)?.[1];

	return (
		// On phones the profile shows on the overview only, so other pages start with their content.
		<aside className={`${onHome ? 'flex' : 'hidden lg:flex'} flex-col gap-5 w-full lg:w-[280px] lg:shrink-0`}>
			{/* Phones: headshot on the left, details on the right. Laptops: stacked, like a profile sidebar. */}
			<div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-5">
				<img
					src="/images/headshot-square.jpg"
					alt="Maxwell Tsai"
					className="w-28 sm:w-36 lg:w-full shrink-0 aspect-square rounded-full object-cover border-2"
				/>
				<div className="flex flex-col gap-3 min-w-0">
					<div>
						<h1 className="text-xl lg:text-2xl font-bold leading-tight">Maxwell Tsai</h1>
						<p className="font-mono text-xs lg:text-sm text-muted-foreground mt-1">EE · ROBOTICS</p>
					</div>
					<ul className="space-y-1.5 lg:space-y-2 text-[13px] lg:text-sm text-muted-foreground">
						<li className="flex items-center gap-2"><Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />Boston University ’27</li>
						<li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Boston, MA · Portland, OR</li>
						<li className="flex items-center gap-2 min-w-0">
							<Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
							<a href={siteConfig.links.email} className="hover:text-primary truncate">{siteConfig.links.emailText}</a>
						</li>
						<li className="flex items-center gap-2">
							<Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
							<a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">in/maxwelljtsai</a>
						</li>
					</ul>
				</div>
			</div>

			<nav aria-label="Project tree" className="hidden lg:block border-t pt-4">
				<h2 className="font-mono text-xs font-semibold tracking-widest text-muted-foreground mb-2">PROJECT TREE</h2>
				<div className="font-mono text-[13px] leading-7">
					<div>▾ portfolio.pro</div>
					{folders.map((f) => (
						<div key={f.name}>
							<div className="pl-3.5">▾ {f.name}</div>
							{f.files.map((file) => {
								const p = projects.find((x) => x.slug === file.slug);
								if (!p) return null;
								const active = current === file.slug;
								return (
									<div key={file.slug} className="pl-8">
										<span className="text-[hsl(var(--pcb-light))]">{refdes(file.slug)}</span>{' '}
										<Link
											href={`/projects/${file.slug}/`}
											title={p.title}
											aria-current={active ? 'page' : undefined}
											className={active ? 'text-primary font-semibold' : 'text-foreground/85 hover:text-primary'}
										>
											{file.file}
										</Link>
									</div>
								);
							})}
						</div>
					))}
				</div>
			</nav>
		</aside>
	);
}

import { siteConfig } from '@/lib/constants';

export function Footer() {
	return (
		<footer className="border-t bg-card/95 mt-12">
			<div className="flex flex-wrap gap-x-6 gap-y-2 px-4 md:px-8 py-5 font-mono text-xs text-muted-foreground">
				<span>© {new Date().getFullYear()} Maxwell Tsai</span>
				<span>Sheet 1 of 1</span>
				<a href={siteConfig.links.email} className="hover:text-primary">Email</a>
				<a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a>
				{siteConfig.resumes.map((r) => (
					<a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="hover:text-primary">{r.short}</a>
				))}
			</div>
		</footer>
	);
}

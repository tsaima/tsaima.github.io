import { siteConfig } from '@/lib/constants';

export function Footer() {
	return (
		<footer className="border-t mt-24">
			<div className="mx-auto max-w-[1080px] px-5 md:px-8 py-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
				<span>© {new Date().getFullYear()} {siteConfig.name}</span>
				<a href={siteConfig.links.email} className="ml-auto hover:text-foreground">Email</a>
				<a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
				<a href={siteConfig.resume} target="_blank" rel="noreferrer" className="hover:text-foreground">Resume</a>
			</div>
		</footer>
	);
}

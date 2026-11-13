import { Mail, Linkedin, MapPin, FileDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/lib/constants';

export const metadata = { title: 'Contact | Maxwell Tsai' };

export default function ContactPage() {
	const rows = [
		{ icon: <Mail className="h-5 w-5 text-primary" />, label: 'Email', value: siteConfig.links.emailText, href: siteConfig.links.email },
		{ icon: <Linkedin className="h-5 w-5 text-primary" />, label: 'LinkedIn', value: 'linkedin.com/in/maxwelljtsai', href: siteConfig.links.linkedin },
		{ icon: <MapPin className="h-5 w-5 text-primary" />, label: 'Location', value: 'Boston, MA · open to relocation' },
	];
	return (
		<div className="py-16 md:py-24">
			<div className="container max-w-3xl">
				<h1 className="text-4xl font-bold mb-4">Contact</h1>
				<p className="text-lg text-muted-foreground mb-10">
					I am looking for full-time engineering roles starting in 2027 and am open to relocating. Email is the fastest way to reach me.
				</p>
				<Card>
					<CardContent className="p-6 divide-y">
						{rows.map((r) => (
							<div key={r.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
								{r.icon}
								<div>
									<p className="text-sm text-muted-foreground">{r.label}</p>
									{r.href ? (
										<a href={r.href} className="font-medium hover:text-primary" target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{r.value}</a>
									) : (
										<p className="font-medium">{r.value}</p>
									)}
								</div>
							</div>
						))}
					</CardContent>
				</Card>
				<div className="mt-8 flex flex-wrap gap-3">
					{siteConfig.resumes.map((r) => (
						<Button key={r.href} variant="outline" asChild>
							<a href={r.href} target="_blank" rel="noreferrer">{r.title} <FileDown className="ml-2 h-4 w-4" /></a>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

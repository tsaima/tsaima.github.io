import { Mail, Linkedin, FileDown } from 'lucide-react';

import { ContactForm } from '@/components/contact-form';
import { siteConfig } from '@/lib/constants';

export const metadata = { title: 'Contact | Maxwell Tsai' };

export default function ContactPage() {
	const rows = [
		{ icon: Mail, label: 'Email', value: siteConfig.links.emailText, href: siteConfig.links.email },
		{ icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/maxwelljtsai', href: siteConfig.links.linkedin },
	];

	return (
		<div className="pb-4 flex flex-col gap-8">
			<div>
				<p className="font-mono text-xs tracking-widest text-[hsl(var(--pcb-light))] mb-2">CONTACT</p>
				<h1 className="text-3xl font-bold">Get in touch</h1>
			</div>

			<ContactForm />

			<div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3 text-sm">
				{rows.map((r) => {
					const Icon = r.icon;
					return (
						<div key={r.label} className="flex items-center gap-2 text-muted-foreground">
							<Icon className="h-4 w-4 text-primary" aria-hidden="true" />
							{r.href ? (
								<a href={r.href} className="hover:text-primary" target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{r.value}</a>
							) : (
								<span>{r.value}</span>
							)}
						</div>
					);
				})}
			</div>

			<div className="flex flex-wrap gap-3">
				{siteConfig.resumes.map((r) => (
					<a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:border-primary hover:text-primary">
						{r.title} <FileDown className="h-4 w-4" aria-hidden="true" />
					</a>
				))}
			</div>
		</div>
	);
}

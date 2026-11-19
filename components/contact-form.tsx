'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

import { siteConfig } from '@/lib/constants';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
	'w-full rounded-md border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring';

export function ContactForm() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState<Status>('idle');
	const formspreeId = siteConfig.links.formspreeId;

	const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// No form service set up yet: open the visitor's email app with the message filled in.
		if (!formspreeId) {
			const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
			const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
			window.location.href = `${siteConfig.links.email}?subject=${subject}&body=${body}`;
			return;
		}

		setStatus('sending');
		try {
			const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({ name: form.name, email: form.email, message: form.message, _subject: `Portfolio message from ${form.name}` }),
			});
			if (!res.ok) throw new Error(String(res.status));
			setStatus('sent');
			setForm({ name: '', email: '', message: '' });
		} catch {
			setStatus('error');
		}
	};

	return (
		<form onSubmit={submit} className="rounded-lg border bg-card p-5 md:p-6 flex flex-col gap-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="flex flex-col gap-1.5">
					<label htmlFor="cf-name" className="text-sm font-medium">Name</label>
					<input id="cf-name" name="name" required autoComplete="name" value={form.name} onChange={update} placeholder="Your name" className={field} />
				</div>
				<div className="flex flex-col gap-1.5">
					<label htmlFor="cf-email" className="text-sm font-medium">Email</label>
					<input id="cf-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update} placeholder="So I can reply" className={field} />
				</div>
			</div>
			<div className="flex flex-col gap-1.5">
				<label htmlFor="cf-message" className="text-sm font-medium">Message</label>
				<textarea id="cf-message" name="message" required rows={6} value={form.message} onChange={update} placeholder="A role, a project, or a question" className={`${field} resize-y`} />
			</div>
			<div className="flex flex-wrap items-center gap-4">
				<button
					type="submit"
					disabled={status === 'sending'}
					className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
				>
					<Send className="h-4 w-4" aria-hidden="true" />
					{status === 'sending' ? 'Sending…' : 'Send message'}
				</button>
				<p role="status" aria-live="polite" className="text-sm">
					{status === 'sent' && <span className="text-[hsl(var(--pcb-light))]">Thanks, your message was sent. I will reply by email.</span>}
					{status === 'error' && (
						<span className="text-destructive">
							Something went wrong. Please email me at <a href={siteConfig.links.email} className="underline">{siteConfig.links.emailText}</a>.
						</span>
					)}
				</p>
			</div>
		</form>
	);
}

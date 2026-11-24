'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { siteConfig } from '@/lib/constants';

// For visitors with no mail app set up: copy the address instead of relying on mailto.
export function CopyEmail() {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(siteConfig.links.emailText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};
	return (
		<button
			type="button"
			onClick={copy}
			className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
		>
			{copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
			<span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
		</button>
	);
}

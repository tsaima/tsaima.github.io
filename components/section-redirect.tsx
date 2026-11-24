'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Old page addresses (/about/, /experience/, ...) now live as sections of the home page.
// The site is static, so the redirect happens in the browser.
export function SectionRedirect({ id, title }: { id: string; title: string }) {
	useEffect(() => {
		window.location.replace(`/#${id}`);
	}, [id]);
	return (
		<p className="py-24 text-muted-foreground">
			{title} has moved to the <Link href={`/#${id}`} className="text-foreground underline underline-offset-4">home page</Link>.
		</p>
	);
}

import './globals.css';
import type { Metadata } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';

import { SiteHeader } from '@/components/layout/site-header';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/lib/constants';

const sans = Schibsted_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={sans.variable}>
			<body>
				<a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
					Skip to content
				</a>
				<div className="min-h-screen flex flex-col">
					<SiteHeader />
					<main id="content" className="flex-1 w-full mx-auto max-w-[1080px] px-5 md:px-8">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}

import './globals.css';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/layout/site-header';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
					<div className="min-h-screen flex flex-col">
						<SiteHeader />
						<div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1280px] mx-auto px-4 md:px-8 pt-8 flex-grow">
							<Sidebar />
							<main id="content" className="flex-1 min-w-0">{children}</main>
						</div>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

import { SectionRedirect } from '@/components/section-redirect';

export const metadata = { robots: { index: false } };

export default function Page() {
	return <SectionRedirect id="contact" title="Contact" />;
}

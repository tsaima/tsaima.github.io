import { SectionRedirect } from '@/components/section-redirect';

export const metadata = { robots: { index: false } };

export default function Page() {
	return <SectionRedirect id="about" title="About" />;
}

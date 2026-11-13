import { HeroSection } from '@/components/home/hero-section';
import { AboutPreview } from '@/components/home/about-preview';
import { FeaturedProject } from '@/components/home/featured-project';
import { ProjectMap } from '@/components/home/project-map';
import { ProjectsPreview } from '@/components/home/projects-preview';
import { ContactPreview } from '@/components/home/contact-preview';

export default function Home() {
	return (
		<>
			<HeroSection />
			<AboutPreview />
			<FeaturedProject />
			<ProjectMap />
			<ProjectsPreview />
			<ContactPreview />
		</>
	);
}

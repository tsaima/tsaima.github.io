import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { BusbotHero } from '@/components/busbot-hero';
import { ContactForm } from '@/components/contact-form';
import { CopyEmail } from '@/components/copy-email';
import { Reveal } from '@/components/reveal';
import { SkillIcon } from '@/components/skill-icon';
import { ToolIcons } from '@/components/tool-icons';
import { coursework, experiences, leadership, siteConfig } from '@/lib/constants';
import { projects } from '@/lib/projects';
import { analysisAndFabrication, embeddedAndPower, labEquipment, pythonLibraries, toolGroups, toolsFor, toolsNamed } from '@/lib/skills';

// 'May 2026'–'Aug 2026' -> 'May–Aug 2026'; different years stay whole.
const dateRange = (start: string, end: string) => {
	const [sm, sy] = start.split(' ');
	const ey = end.split(' ')[1];
	return sy === ey ? `${sm}–${end}` : `${start}–${end}`;
};

// 'May 2026 to Spring 2027, in progress' -> 'May 2026 to Spring 2027'
const projectDate = (period: string) => period.replace(/,\s*in progress$/i, '');

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<h2 id={`${id}-heading`} className="text-2xl md:text-[1.75rem] font-semibold tracking-tight mb-8">
			{children}
		</h2>
	);
}

const linkClass = 'text-foreground underline decoration-primary/60 underline-offset-[3px] hover:decoration-primary hover:text-primary';

export default function Home() {
	return (
		<>
			<section id="intro" aria-label="Introduction" className="pt-16 pb-14 md:pt-20 md:pb-20 border-b grid md:grid-cols-[1fr_auto] items-center gap-x-12 gap-y-10">
				<div>
					<h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">Maxwell Tsai</h1>
					<p className="mt-5 text-base md:text-lg text-muted-foreground">
						Electrical engineering, robotics concentration
						<br />
						Boston University · May 2027
					</p>
					<div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
						<a
							href={siteConfig.resume}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							View resume <span className="font-normal opacity-75">PDF</span>
						</a>
						<a href="#contact" className={`text-[15px] ${linkClass}`}>Get in touch</a>
					</div>
				</div>
				<BusbotHero />
			</section>

			<section id="about" aria-labelledby="about-heading" className="py-20 md:py-24 border-b scroll-mt-20">
				<SectionHeading id="about">About</SectionHeading>
				<div className="grid md:grid-cols-[1fr_220px] gap-10 md:gap-16 items-start">
					<div className="space-y-5 text-[17px] leading-relaxed text-foreground/85 max-w-[62ch]">
						<p>
							I am an electrical engineering student at Boston University, concentrating in robotics. I work on hardware from the circuit and
							the power budget, through firmware, to a build that passes its tests.
						</p>
						<p>
							I spent two summers at Intel in Hillsboro, Oregon. In 2025 I built a Python API that lets analog test engineers run the same test
							code on four lab instruments. In 2026 I built a JMP tool that cut wafer data retrieval from over two weeks to two hours, and the
							team kept using it after I left.
						</p>
						<p>
							This year I am the sensor integration lead on BusBot, our senior design robot, and a grader for Electric Energy Systems. I write
							down what fails as well as what works: the{' '}
							<Link href="/projects/busbot/#iterations" className={linkClass}>BusBot page</Link> has a section on what failed and what we changed.
						</p>
						<p className="pt-3 text-[15px] leading-relaxed text-foreground/75">
							<span className="text-muted-foreground">Coursework: </span>
							{coursework.join(', ')}.
						</p>
					</div>
					<img
						src="/images/headshot-square.jpg"
						alt="Maxwell Tsai"
						className="w-40 md:w-full aspect-square rounded-lg object-cover grayscale-[15%]"
					/>
				</div>
			</section>

			<section id="experience" aria-labelledby="experience-heading" className="py-20 md:py-24 border-b scroll-mt-20">
				<SectionHeading id="experience">Experience</SectionHeading>
				<ol className="border-t">
					{experiences.map((e) => (
						<li key={`${e.company}-${e.title}`} className="border-b last:border-b-0">
							<details className="group">
								<summary className="grid md:grid-cols-[170px_1fr_auto] gap-x-8 gap-y-1 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
									<span className="text-sm text-muted-foreground tabular-nums md:pt-0.5">{dateRange(e.startDate, e.endDate)}</span>
									<span>
										<span className="block text-[17px] font-medium">{e.title}</span>
										<span className="block text-sm text-muted-foreground mt-0.5">
											{e.company}
											{e.location ? ` · ${e.location}` : ''}
										</span>
										<span className="block mt-2 text-[15px] leading-relaxed text-foreground/80 max-w-[62ch]">{e.headline}</span>
										<ToolIcons tools={toolsNamed(e.tools)} className="mt-3 gap-3 text-foreground/75" />
									</span>
									<ChevronDown
										className="hidden md:block h-4 w-4 mt-1.5 text-muted-foreground transition-transform group-open:rotate-180"
										aria-hidden="true"
									/>
									<span className="md:hidden text-sm text-primary group-open:hidden">More</span>
								</summary>
								<div className="md:pl-[202px] pb-6 -mt-1">
									<ul className="space-y-2 text-[15px] leading-relaxed text-foreground/75 max-w-[62ch] list-disc pl-5 marker:text-muted-foreground">
										{e.description.map((d) => (
											<li key={d}>{d}</li>
										))}
									</ul>
									<p className="mt-3 text-sm text-muted-foreground">{e.technologies.join(' · ')}</p>
								</div>
							</details>
						</li>
					))}
				</ol>
			</section>

			<section id="projects" aria-labelledby="projects-heading" className="py-20 md:py-24 border-b scroll-mt-20">
				<SectionHeading id="projects">Projects</SectionHeading>
				<ul className="grid gap-y-8 sm:gap-y-12 md:gap-y-14">
					{projects.map((p) => {
						const used = toolsFor(p.tags);
						return (
							<Reveal as="li" key={p.slug}>
								<Link href={`/projects/${p.slug}/`} className="group grid grid-cols-[120px_1fr] sm:grid-cols-[280px_1fr] md:grid-cols-[340px_1fr] gap-x-4 sm:gap-x-8 items-start">
									<div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
										{p.image && (
											<img
												src={p.image}
												alt=""
												loading="lazy"
												className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
											/>
										)}
										{used.length > 0 && (
											<div className="absolute inset-x-0 bottom-0 bg-[hsl(var(--background)/0.88)] px-2 py-1.5 sm:px-3 sm:py-2 text-foreground/90">
												<ToolIcons tools={used} className="gap-2 sm:gap-3" iconClassName="h-3.5 w-3.5 sm:h-4 sm:w-4" />
											</div>
										)}
									</div>
									<div className="sm:pt-1">
										<h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
											{p.title}
										</h3>
										<p className="mt-1.5 sm:mt-2 text-[15px] sm:text-[17px] leading-relaxed text-foreground/80 max-w-[68ch]">{p.blurb ?? p.summary}</p>
										<p className="mt-2 text-sm text-muted-foreground">
											{p.category} · {projectDate(p.period)}
											{p.status === 'In progress' && ' · in progress'}
										</p>
									</div>
								</Link>
							</Reveal>
						);
					})}
				</ul>
			</section>

			<section id="skills" aria-labelledby="skills-heading" className="py-20 md:py-24 border-b scroll-mt-20">
				<SectionHeading id="skills">Skills</SectionHeading>
				<div className="grid md:grid-cols-3 gap-10">
					{toolGroups.map((g) => (
						<div key={g.title}>
							<h3 className="text-sm text-muted-foreground mb-4">{g.title}</h3>
							<ul className="space-y-3">
								{g.tools.map((t) => (
									<li key={t.name} className="flex items-center gap-3 text-[17px]">
										<SkillIcon tool={t} className="h-5 w-5 text-foreground/85" />
										{t.name}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="mt-14 pt-10 border-t grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
					{[
						{ title: 'Embedded and power', items: embeddedAndPower },
						{ title: 'Lab equipment', items: labEquipment },
						{ title: 'Python libraries', items: pythonLibraries },
						{ title: 'Analysis and fabrication', items: analysisAndFabrication },
					].map((g) => (
						<div key={g.title}>
							<h3 className="text-sm text-muted-foreground mb-4">{g.title}</h3>
							<ul className="space-y-2 text-[15px] leading-snug text-foreground/85">
								{g.items.map((i) => (
									<li key={i}>{i}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<section id="leadership" aria-labelledby="leadership-heading" className="py-20 md:py-24 border-b scroll-mt-20">
				<SectionHeading id="leadership">Leadership</SectionHeading>
				<ul className="border-t">
					{leadership.map((l) => (
						<li key={l.org} className="grid md:grid-cols-[170px_1fr] gap-x-8 gap-y-1 py-5 border-b last:border-b-0">
							<span className="text-sm text-muted-foreground md:pt-0.5">{l.org}</span>
							<span className="text-[17px] font-medium">{l.role}</span>
						</li>
					))}
				</ul>
			</section>

			<section id="contact" aria-labelledby="contact-heading" className="py-20 md:py-24 scroll-mt-20">
				<SectionHeading id="contact">Contact</SectionHeading>
				<div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
					<div>
						<dl className="space-y-4 text-[17px]">
							<div>
								<dt className="text-sm text-muted-foreground">Email</dt>
								<dd className="mt-1 flex flex-wrap items-center gap-3">
									<a href={siteConfig.links.email} className={linkClass}>{siteConfig.links.emailText}</a>
									<CopyEmail />
								</dd>
							</div>
							<div>
								<dt className="text-sm text-muted-foreground">LinkedIn</dt>
								<dd className="mt-1">
									<a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className={linkClass}>linkedin.com/in/maxwelljtsai</a>
								</dd>
							</div>
							<div>
								<dt className="text-sm text-muted-foreground">Resume</dt>
								<dd className="mt-1">
									<a href={siteConfig.resume} target="_blank" rel="noreferrer" className={linkClass}>Maxwell Tsai, resume (PDF)</a>
								</dd>
							</div>
						</dl>
					</div>
					<ContactForm />
				</div>
			</section>
		</>
	);
}

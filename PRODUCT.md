# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and reviewers evaluating Maxwell for full-time roles, internships and master's programs in electrical engineering and robotics (he graduates from Boston University in May 2027). They arrive from a resume, application or LinkedIn and decide in about 30 seconds whether to pass him to the hiring team.

Secondary: hiring engineers and managers who come later and read project pages in depth (10 minutes or more) to judge technical judgment: how a system was designed, what broke and what changed.

The site has to work for both. Recruiters need the scan (who he is, what he built, where he interned, the resume to download). Engineers need the depth (diagrams, data and failure write-ups).

## Product Purpose

A personal engineering portfolio for Maxwell Tsai, an EE student with a robotics concentration. It turns resume lines into evidence: each project and role is shown with photos, diagrams, videos, reports and plain explanations. Success means a visitor moves him forward in a hiring process: downloads a resume, reaches out, or forwards the link to an engineer.

## Positioning

What a typical EE student's portfolio can't truthfully claim, all backed by content already on the site:

- **Full-system integrator:** takes systems from circuit and power budget through firmware to a tested, working build (BusBot, Meeting Timer).
- **Honest about failures:** project pages say what failed and what changed ("What failed and what changed", "What went wrong"), so engineering judgment is visible, not just polished results.
- **Hardware plus software:** works across the boundary, from embedded C, ESP-IDF and Verilog to Python, MATLAB, Java and Android.
- **Industry-tested tooling:** two Intel internships in which tools he built were adopted by teams (a common Python instrument API, and a JMP data-pulling tool that kept being used after the internship).

## Operating Context

- Visitors reach the site from resumes, job applications and LinkedIn. Many recruiters view it on a phone.
- One general resume PDF. Currently the EE resume (`public/files/Maxwell Tsai Resume A Fall '26.pdf`); the Robotics resume is no longer offered on the site.
- Pages: Home, About, Experience, Projects (Hardware and Software), one page per project, and Contact.
- Contact goes through Formspree when a form ID is set, and otherwise falls back to a mailto link.

## Capabilities and Constraints

- Next.js App Router, Tailwind CSS, Framer Motion and shadcn/ui, built with `output: 'export'` to static files hosted on GitHub Pages. It must stay a static export: no server and no backend. Deploys run through `.github/workflows/deploy.yml` on every push to `main`.
- Content lives in `lib/constants.ts` (site, experience, education, skills) and `lib/projects.ts` (each project's page content, as typed blocks).
- Media limits: images under about 500 KB, and videos under 100 MB (GitHub's file limit).
- Terminology: projects are grouped as "Hardware" and "Software". The single resume is just "Resume".

## Brand Commitments

- Name: Maxwell Tsai.
- Voice: plain and factual, in the first person. No hype words and no invented metrics. Every claim traces to a project page or a resume line.
- The site shows the work and does not say what kind of role or program he is seeking (he applies to full-time roles, internships and master's programs at once).
- The site is built on the open-source Engineering Student Portfolio template by niladri-1, and the README credits it.

## Evidence on Hand

- Ten projects in `lib/projects.ts`: BusBot, Laundry Folder, Bedside Beacon, Meeting Timer, Room Temperature Monitor (hardware); Grid congestion (DC OPF), Whack-a-Mole (FPGA), Tetris for Android, Truss Design in MATLAB, Predicting MBTA Bus Ridership (software).
- Photos and diagrams in `public/images`, demo videos in `public/videos` (BusBot integration, Meeting Timer, Tetris, Whack-a-Mole), and reports and resumes in `public/files`.
- Roles: two Intel internships (Analog Product Development & Test, 2025; Data Science and Analytics, 2026), BU Teaching Assistant (Logic Design), BU Grader (Electric Energy Systems), and Undergraduate Research Assistant (SemeterLab).
- Headshots: `public/images/headshot.jpg` and `public/images/headshot-square.jpg`.
- There are no testimonials, references, awards or press on hand. Don't invent any.

## Product Principles

1. **Evidence over adjectives.** Show the build, the diagram, the data or the video. Don't describe skill in the abstract.
2. **Serve the 30-second scan and the 10-minute read.** The key facts and a resume download stay one step away. Depth stays available without getting in the way.
3. **Show the reasoning, including failures.** What broke and what changed is a feature, not something to hide.
4. **Stay truthful to the resumes.** Dates, titles and numbers on the site agree with the resume PDFs.

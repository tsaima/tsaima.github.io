---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/projects/[slug]/page.tsx","components/layout/site-header.tsx"]
---

# Home: single scrolling portfolio

Scope and mode: the whole site becomes one scrolling page (About, Experience, Projects, Skills, Leadership, Contact) plus the existing project detail pages. Mode: Experience with a Persuade close. Audience: recruiters first (30-second scan), hiring engineers second. Action: open the resume, or get in touch.

Constraints: dark background; one general resume; plain, factual voice; static export on GitHub Pages; skill icons appear on project thumbnails; subtle scroll reveals only; no 3D hero, no elaborate effects.

## Direction contract

THESIS: A quiet, dark, text-first engineering portfolio where the builds' photos are the only imagery and every tool has its own icon. It refuses the busy developer-portfolio default: no 3D hero, no stats band, no card grid, no decoration.
OWN-WORLD: Near-black neutral ground (#111214), warm off-white text, one muted copper accent used only for links, focus and the Resume action. Hairline rules separate rows. A single grotesk family (Schibsted Grotesk) at clear size steps; the name set in spaced capitals in the header. Monochrome brand icons for tools, shown in a dark strip along the bottom of each project thumbnail.
STORY: The visitor learns who Maxwell is and what he builds in one screen, reads a short About with a portrait, scans Experience rows, sees every project as a photo with one line and its tool icons, then contacts him or opens the resume.
FIRST VIEWPORT: A sticky thin header (spaced-capitals name left; About, Experience, Projects, Skills, Contact and an outlined Resume right). Below, left-aligned in a narrow column with generous top space: the name large, one line of degree and graduation facts in muted text, the positioning sentence, then Resume (filled copper) and Contact (text link). The About heading starts within the fold on desktop.
FORM: seed: none (pinned). User's words: "I want it to more simple, like this one: https://akemizollinger.wixsite.com/portfolio. I still like the other ideas of having one scrollable page ... but I want it to be more minimalistic and clean"; answers: "Dark, minimal"; keep "Skill icons on projects, Subtle scroll reveals"; projects show "Thumbnail, title, one line".
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

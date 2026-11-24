---
name: Maxwell Tsai, Engineering Portfolio
description: A quiet, dark, text-first portfolio where build photos are the only imagery and copper marks only what can be acted on.
colors:
  copper: "hsl(30 68% 65%)"
  copper-ink: "hsl(15 30% 9%)"
  pcb: "hsl(24 30% 38%)"
  ink: "hsl(15 11% 7%)"
  graphite: "hsl(20 17% 10%)"
  slate: "hsl(20 12% 13%)"
  hairline: "hsl(20 12% 18%)"
  field-edge: "hsl(20 10% 22%)"
  bone: "hsl(36 45% 91%)"
  ash: "hsl(30 14% 61%)"
  signal-red: "hsl(0 65% 58%)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontFeature: "'ss01' on"
  headline:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25
  wordmark:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  gutter-sm: "20px"
  gutter: "32px"
  heading-gap: "32px"
  row: "20px"
  project-gap: "56px"
  section-sm: "80px"
  section: "96px"
  container: "1080px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.copper-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-outline:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "6px 14px"
  button-outline-hover:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.copper-ink}"
  button-quiet:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ash}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  input:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  nav-link:
    textColor: "{colors.ash}"
    typography: "{typography.label}"
    padding: "8px"
  nav-link-active:
    textColor: "{colors.bone}"
  project-thumb:
    backgroundColor: "{colors.slate}"
    rounded: "{rounded.lg}"
    width: "340px"
  data-panel:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: Maxwell Tsai, Engineering Portfolio

## Overview

**Creative North Star: "The Bench Log"**

A single dark page read top to bottom like a well-kept lab notebook: name and intent first, then short ruled rows of experience, then each build shown as its own photograph with one line beneath it. The ground is a warm near-black, the text BusBot's cream, and there is exactly one colour with a job: BusBot's amber, which appears where the reader can click, focus or act. Everything else is type, hairline rules and the builds' own photos.

Density is low and the column is narrow. Hierarchy comes from size and weight inside one grotesk family, not from boxes, colour fields or ornament. The home page has no cards, no stat bands, no illustration and no 3D; structure is carried by 1px rules between sections and between rows. Project pages carry the same voice into report form, numbering figures and tables down the page and reserving bordered panels for data.

Motion is small and optional: content below the fold fades up once, a thumbnail photo eases in by 3% on hover, and all of it switches off under reduced motion.

**Key Characteristics:**
- Near-black neutral ground with warm bone text; one copper accent for action.
- One family (Schibsted Grotesk), hierarchy by size, weight 600 and tight tracking.
- Hairline rules, not cards, separate sections and rows.
- Build photographs are the only imagery; tools appear as monochrome single-path icons in the text colour.
- A narrow 1080px column, generous vertical rhythm, left-aligned throughout.

## Colors

BusBot's palette: a warm near-black ground, the robot's cream for text and its amber as the single accent; colour is information, never decoration.

### Primary
- **BusBot Amber** (copper, `#e3a66b`): link underlines (at 60% alpha, full on hover), link and title hover colour, the filled "View resume" action, the outlined header Resume and Send buttons, the focus outline, the text caret, text selection (at 35% alpha), the range-slider accent and measured success marks in project-page data.
- **Copper Ink** (copper-ink): text on filled copper surfaces only.

### Secondary
- **Muted Rust** (pcb): project-page data highlight for "my work" table rows (at 25% alpha) and its legend swatch. The token keeps its legacy name from the earlier schematic look; its role is the data highlight, nothing else.

### Neutral
- **Ink** (ink): the page ground, the sticky header ground, and the thumbnail tool-strip ground (at 88% alpha).
- **Graphite** (graphite): input fields, code and equation panels, the interactive demo panel.
- **Slate** (slate): empty thumbnail placeholder, demo track, table header tint (at 50% alpha).
- **Hairline** (hairline): every border: section rules, row rules, panel edges.
- **Field Edge** (field-edge): input borders, one step brighter than hairlines so fields read as fields.
- **Bone** (bone): primary text. Body copy sits at 85% alpha, secondary prose at 75-80%, so the full value is kept for headings and the one sentence that matters in a paragraph.
- **Ash** (ash): dates, metadata lines, labels, inactive navigation, captions.
- **Signal Red** (signal-red): form error text only.

### Named Rules
**The Single Copper Rule.** Copper marks what the reader can act on (links, hover, focus, caret, the Resume and Send actions) and, on project pages, measured results. It never fills a section, decorates a heading or tints a background.

**The Alpha-Before-New-Colour Rule.** Quieter text is Bone at reduced alpha, not a new grey. A new neutral needs a structural job (ground, panel, edge) before it earns a token.

## Typography

**Display Font:** Schibsted Grotesk (with -apple-system, Segoe UI, Helvetica, Arial)
**Body Font:** Schibsted Grotesk, with stylistic set 1 (`ss01`) on globally

**Character:** One sturdy, slightly technical grotesk does everything. Large sizes tighten their tracking and drop their leading; small sizes stay at normal tracking and lean on Ash for hierarchy.

### Hierarchy
- **Display** (600, 3rem mobile to 4.5rem desktop, 0.95, -0.03em): the name on the home page, once.
- **Headline** (600, 2.25rem to 3rem, -0.025em): a project page title.
- **Title** (600, 1.5rem to 1.75rem, -0.025em): section headings ("About", "Experience", project-page sections), always 32px above their content. Project titles in the home list use the same weight and tracking at 1.125rem to 1.5rem.
- **Lede** (400, 1.5rem to 1.75rem, 1.375, max 34ch): the single positioning sentence under the name.
- **Body** (400, 17px, 1.625, max 62ch): About and Contact prose; experience row titles at 500.
- **Body Small** (400, 15-16px, 1.625): experience headlines and bullets (max 62ch), project one-liners (max 68ch), the Methods line (max 70ch).
- **Label** (400, 14px): dates (tabular numerals), metadata joined with " · ", form labels (at 500), nav links, captions.
- **Wordmark** (600, 15px, uppercase, 0.14em tracking): the name in the header, nowhere else.

### Named Rules
**The One Family Rule.** Every role is Schibsted Grotesk. Hierarchy comes from size steps, weight 600 and tracking, never from a second display face.

**The Wordmark-Only Capitals Rule.** Spaced capitals belong to the header name. Section labels, metadata and buttons stay in sentence case.

## Layout

One centred column, max 1080px, with 20px side gutters on phones and 32px from 768px. Everything is left-aligned. The home page is one scroll: Intro, About, Experience, Projects, Skills, Contact, each a full-width band separated by a hairline rule, with 80px vertical padding (96px from 768px) and a 32px gap under each heading. The intro gets more top space (80px to 112px) so the name lands with air around it.

Inside sections the grid is asymmetric and content-sized: About is prose plus a 220px portrait column; Experience rows are a 170px date column, the role, and a disclosure chevron; Projects rows are a fixed thumbnail column (120px, 280px from 640px, 340px from 768px) beside the text; Skills is three columns from 768px; Contact is prose and details beside a wider form column. Below 768px each grid collapses to one column, except the project row, which keeps its thumbnail beside the text at 120px.

Anchored sections clear the 64px sticky header with 80px scroll padding. Project pages use the same column, open with a facts list beside the hero figure from 1024px, and space sections 56px apart.

## Elevation & Depth

The system is flat. There are no shadows anywhere; depth comes from three tonal steps (Ink ground, Graphite panels, Slate tints) and hairline borders. The sticky header sits on solid Ink with a bottom rule rather than blur or shadow. The only overlay is the tool strip laid across the bottom of each project photo, which uses Ink at 88% alpha.

### Named Rules
**The Flat Bench Rule.** Surfaces are flat at rest and on hover. State is shown by colour (copper, Bone) and by the photo's own slight zoom, never by lift.

## Shapes

Corners are gently rounded and consistent: 8px on photographs, the portrait, thumbnails and data panels; 6px on buttons and inputs; 4px on the focus outline and small square markers. Lines are 1px hairlines. The home page draws its structure with full-width horizontal rules (section borders, the ruled Experience list) rather than enclosed boxes; enclosed, bordered shapes appear only around data on project pages (tables, code, equations, the demo).

## Components

### Buttons
Few, plain, and copper only where they are the action.
- **Shape:** gently rounded (6px).
- **Primary:** the one filled button, "View resume", in BusBot Amber with Copper Ink text, 12px by 20px, 15px semibold, with a lighter "PDF" suffix. Hover drops it to 90% opacity.
- **Outline:** header Resume and the form's Send: a copper border at 70% alpha on the Ink ground, Bone text, 14px medium. Hover fills with copper and switches text to Copper Ink.
- **Quiet:** the Copy-email control: a hairline border, Ash text, 14px; hover brightens text to Bone and the border to Bone at 40%.
- **Focus:** a 2px copper outline offset by 2px on every focusable element.

### Text links
Bone text with a copper underline at 60% alpha, offset 3px; hover turns both text and underline full copper. Secondary links (footer, "All projects") are Ash and brighten to Bone.

### Inputs / Fields
- **Style:** Graphite fill, Field Edge 1px border, 6px radius, 10px by 12px padding, 14px text, placeholders in Ash at 70%.
- **Focus:** a 2px copper ring; the caret is copper.
- **Error:** a single sentence in Signal Red under the form, with an email fallback link. Success text is copper.

### Navigation
A sticky 64px header on solid Ink with a bottom hairline. The wordmark sits left; five section links (14px, Ash) and the outlined Resume sit right. On the home page the section in view turns its link Bone (`aria-current="location"`); nothing is marked while the intro fills the screen. On phones the links drop to a full-width second row, spaced evenly, with Resume staying beside the wordmark.

### Experience rows
A ruled list: each row is a disclosure with the date range (14px, Ash, tabular), the role (17px medium) over the company and location (14px Ash), and a one-line headline (15px). A chevron rotates on open on desktop; phones show a copper "More". Detail bullets indent under the role column, with tools listed as one " · " line in Ash.

### Project rows (signature)
Each project is a link row: a 4:3 photograph with 8px corners beside its title, one line and a metadata line in Ash. A strip of monochrome tool icons (14-16px, Bone at 90%) runs across the bottom of the photo on Ink at 88%. Hover turns the title copper and eases the photo to 103% scale over 700ms. Rows reveal once, fading up 14px, when they first scroll into view.

### Tool icons
Each tool is a single-path 24x24 SVG filled in the current text colour. Nine tools use their simple-icons mark (Python, C, C++, Java, MicroPython, ESP32, Arduino, Android Studio, GitHub). Seven use authored glyphs drawn on the same grid with plain geometric fills: MATLAB (a plotted curve), Verilog (a square wave), JMP (bars), KiCad (a trace between two pads), Xilinx Vivado (a pinned chip), Onshape (an isometric cube) and Tinkercad (stacked blocks). An authored glyph shows what the tool does in one silhouette, at the same visual weight as the brand marks beside it. This departs from the direction contract's "brand icons"; the build mixes the two on purpose. Icons label tools on thumbnails (14-16px), in Skills (20px, beside the name) and in project-page headers (16px, beside the name). Methods and techniques have no icons; they are listed as words.

### Data panels (project pages)
Tables, code, equations and the interactive demo sit in bordered panels (hairline, 8px radius); code and equations on Graphite. Table captions run above, starting "Table n." in semibold Bone; figure captions run below, starting "Figure n.". Numeric columns right-align with tabular numerals. Rows that are the author's own work take the Muted Rust highlight with a "My work" legend.

## Do's and Don'ts

### Do:
- **Do** keep copper to actions, hover, focus and measured results (The Single Copper Rule).
- **Do** separate sections and list rows with 1px Hairline rules, and keep the home page free of enclosing cards.
- **Do** set every role in Schibsted Grotesk, using weight 600 and negative tracking for headings.
- **Do** step text down with Bone at 85%, 75-80% and Ash, rather than adding greys.
- **Do** show a project with its real photograph, one line and its tool icons; give a new tool its simple-icons mark, or an authored single-path glyph on the 24px grid when it has none.
- **Do** number figures and tables in order down a project page, captions in Ash with a semibold Bone "Figure n." or "Table n.".
- **Do** gate every motion on `prefers-reduced-motion` and leave above-the-fold content visible without JavaScript.

### Don't:
- **Don't** add shadows, glows, blur or lift on hover (The Flat Bench Rule).
- **Don't** add imagery other than build photos and the portrait: no illustration, 3D hero, stock art or decorative backgrounds.
- **Don't** add a stats band, metric tiles or a card grid of projects.
- **Don't** set anything but the header name in spaced capitals, and don't add small uppercase labels above headings.
- **Don't** use coloured brand logos, multicolour icons, stroked outline icons or emoji for tools; every tool icon is one filled path, monochrome in the text colour.
- **Don't** introduce a second accent hue for decoration.

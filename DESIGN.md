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

<!-- impeccable:design-map -->
Name: Maxwell Tsai, Engineering Portfolio
Colors: primary: copper hsl(30 68% 65%); secondary: pcb hsl(24 30% 38%); neutral: ink hsl(15 11% 7%); error: signal-red hsl(0 65% 58%); primary: copper-ink hsl(15 30% 9%) (+6 more in the sidecar)
Fonts: Schibsted Grotesk (display, headline, title, lede, body, body-sm, label, wordmark)
Spacing: gutter-sm 20px, gutter 32px, heading-gap 32px, row 20px, project-gap 56px, section-sm 80px, section 96px, container 1080px
Radius: sm 4px, md 6px, lg 8px
North Star: "The Bench Log"
Rules:
- The Single Copper Rule. Copper marks what the reader can act on (links, hover, focus, caret, the Resume and Send actions) and, on project pages, measured results.
- The Alpha-Before-New-Colour Rule. Quieter text is Bone at reduced alpha, not a new grey.
- The One Family Rule. Every role is Schibsted Grotesk.
- The Wordmark-Only Capitals Rule. Spaced capitals belong to the header name.
- The Flat Bench Rule. Surfaces are flat at rest and on hover.
Don't:
- Don't add shadows, glows, blur or lift on hover (The Flat Bench Rule).
- Don't add imagery other than build photos and the portrait: no illustration, 3D hero, stock art or decorative backgrounds.
- Don't add a stats band, metric tiles or a card grid of projects.
- Don't set anything but the header name in spaced capitals, and don't add small uppercase labels above headings.
- Don't use coloured brand logos, multicolour icons, stroked outline icons or emoji for tools; every tool icon is one filled path, monochrome in the text colour.
- Don't introduce a second accent hue for decoration.
Do:
- Do keep copper to actions, hover, focus and measured results (The Single Copper Rule).
- Do separate sections and list rows with 1px Hairline rules, and keep the home page free of enclosing cards.
- Do set every role in Schibsted Grotesk, using weight 600 and negative tracking for headings.
- Do step text down with Bone at 85%, 75-80% and Ash, rather than adding greys.
- Do show a project with its real photograph, one line and its tool icons; give a new tool its simple-icons mark, or an authored single-path glyph on the 24px grid when it has none.
- Do number figures and tables in order down a project page, captions in Ash with a semibold Bone "Figure n." or "Table n.".
- (+1 more)
Full: .impeccable/design-full.md (read a section when you need its detail)

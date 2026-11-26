# MTDBackOffice.co.uk website

Marketing site for MTD Back Office: done-for-you admin automation and Making Tax Digital setup for UK sole traders, landlords and small firms. One goal: visitors book a free 30-minute admin check.

## Read first

1. `docs/BUILD_SPEC.md`: pages, sections, components, states, breakpoints, accessibility, SEO and the definition of done.
2. `reference/home-design.html`: the approved visual design and all copy. Match it; do not copy its inline styles.
3. `src/styles/tokens.css`: the only source of colours, type, spacing, radius and motion.
4. `brand/`: outlined logo files. Use them as images; never redraw or retype the logo.

## Stack (suggested; confirm with the owner before changing)

- Astro with static output, plain CSS using the tokens, no client-side framework.
- JavaScript only for the mobile menu and the scrolled header border.
- Manrope self-hosted (`@fontsource/manrope`, weights 400/600/700/800).
- Deploy to a static host; the domain is MTDBackOffice.co.uk.
- Booking link and business email (info@mtdbackoffice.co.uk) live in one config file (`src/config.ts`).
- The business trades as a sole trader for now: do not add company number, registered office or ICO number.

## Rules

- Use token variables; no hard-coded hex values outside `tokens.css`.
- British English, sentence-case headings, copy verbatim from the reference.
- Prices are always labelled ex-VAT.
- Never write "HMRC approved" or use HMRC branding; every page footer carries "MTD Back Office is an independent business, not part of HMRC."
- Keep `[bracketed]` placeholders visible and list them in README.md under "Before launch".
- Accessibility is part of done: WCAG 2.2 AA, focus visible, 44px targets, one h1, skip link.
- No tracking cookies without consent.

## Definition of done

- All routes in the spec build and render at 390px, 768px and 1280px without horizontal scroll.
- Lighthouse mobile scores 95+ for performance, accessibility and SEO.
- Works with JavaScript disabled.
- README lists remaining placeholders and how to deploy.

## Suggested first prompt

"Read CLAUDE.md and docs/BUILD_SPEC.md, then scaffold the Astro project, implement tokens.css and the components, build the home page to match reference/home-design.html, and add /thanks, /privacy, /terms and 404. Show me the plan before writing code."

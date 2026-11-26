# Handoff Spec: MTDBackOffice.co.uk (v1 launch site)

## Overview

A one-page marketing site for MTD Back Office, a done-for-you admin-automation and Making Tax Digital (MTD) setup service for UK sole traders, landlords and small firms. Visitors are busy trades and landlords, mostly on phones, often between jobs. The site has one goal: get them to book a **free 30-minute admin check** through an external booking link. Everything else supports that.

Visual reference: `reference/home-design.html` (open it in a browser). It is a design export with inline styles; rebuild it properly with the tokens and components below rather than copying the inline styles.

## Pages

| Route | Purpose | Notes |
| --- | --- | --- |
| `/` | Home, single scrolling page | Sections below, anchor nav |
| `/thanks` | Booking confirmed | Booking tool redirects here; "What happens next" in 3 lines + link home |
| `/privacy` | Privacy notice | UK GDPR; content supplied by owner: use a clearly marked placeholder |
| `/terms` | Terms of service | Placeholder; scope excludes tax advice and filing |
| `/404` | Not found | Branded, one line + "Back to home" button |

Phase 2 (not now): `/mtd-guide` with workshop sign-up.

## Layout

- Container: `max-width: var(--container)` (1120px), side padding `var(--gutter)`.
- Sections alternate `--surface` and `--surface-alt`; vertical padding `--section-y` (hero `--hero-y`).
- Left-aligned text throughout; line length under 80 characters (`max-width: 760px` on paragraphs).

### Home sections, top to bottom

1. **Header** (sticky): logo (`brand/logo-primary.svg`, 200px wide desktop; `brand/icon-app.svg` 32px on mobile), links How it works / Prices / FAQ, primary button "Book a free check".
2. **Hero** `#top` on `--surface-alt`: eyebrow with amber square ("Making Tax Digital · from 6 April 2027"), h1 "Your admin, sorted. MTD-ready before April.", lead paragraph, primary button "Book a free 30-minute admin check" + text link "See prices", trust line. Side card "Your MTD year" listing the four quarterly update dates (7 Aug 2027, 7 Nov 2027, 7 Feb 2028, 7 May 2028) and an indigo note "We set up the software and the records. Your accountant handles the tax."
3. **Problem**: h2 "You didn't start a business to do admin." + one paragraph.
4. **Offers** `#prices` on `--surface-alt`: three OfferCards: MTD & Admin Setup £495; Automation Sprint £1,500 (featured); Ongoing care £99/month. All "ex-VAT".
5. **How it works** `#how`: ordered list of four Steps.
6. **Trust band** on `--surface-alt`: h2 "We don't do your tax. Your accountant does." + paragraph; three TrustBullets (Fully insured; Fixed prices, agreed up front; Independent business, not part of HMRC).
7. **FAQ** `#faq`: four FaqItems, first open.
8. **Booking CTA** `#book` on `--brand`: h2, line, accent button "Book your free check" → `BOOKING_URL`.
9. **Footer** on `--ink`: reversed logo, "MTD Back Office" + tagline, privacy link, info@mtdbackoffice.co.uk, independence line. The business trades as a sole trader for now: no company number, registered office or ICO number on the site.

All copy is in `reference/home-design.html`; use it verbatim. Keep `[bracketed]` placeholders visible and list them in the README until the owner fills them.

## Design Tokens Used

All in `src/styles/tokens.css`. Never hard-code hex values.

| Token | Value | Usage |
| --- | --- | --- |
| `--brand` | #2E2A8C | Headings, links, primary buttons, featured card, CTA band |
| `--brand-hover` | #221E6E | Primary hover/active |
| `--accent` | #F5A524 | Amber square, accent button (on indigo only), bullets |
| `--ink` | #1F1D4A | Body text, footer background, text on amber |
| `--ink-muted` | #4A4870 | Secondary text, eyebrows |
| `--on-brand-muted` | #D6D4F5 | Secondary text on indigo |
| `--surface` / `--surface-alt` | #FFFFFF / #F4F4FA | Backgrounds |
| `--line` | #DEDDF0 | Borders |
| `--font-sans` | Manrope 400/600/700/800 | Everything. Self-host (e.g. `@fontsource/manrope`), `font-display: swap` |
| `--fs-h1` | 56/60, 800, −1.2px (36/42 under 900px) | Hero h1 (only h1 on the page) |
| `--fs-h2` | 36/42, 800, −0.6px (28/34 under 900px) | Section titles |
| `--space-*` | 4–96px | All spacing |
| `--radius-md` / `--radius-faq` / `--radius-lg` | 8 / 12 / 16px | Buttons / FAQ / cards. Amber square always 0 |

## Components

| Component | Variant | Props | Notes |
| --- | --- | --- | --- |
| Button | primary, secondary, accent | `label`, `href`, `variant`, `size` (md 48px, lg 52px) | Rendered as `<a>` for links. Accent only on `--brand` backgrounds |
| Header | desktop, mobile | none | Mobile < 900px: icon logo, "Book" button, menu button |
| Eyebrow | default | `text` | 10px amber square + uppercase label |
| OfferCard | standard, featured | `eyebrow`, `title`, `price`, `unit`, `description` (≤200 chars), `ctaLabel`, `ctaHref`, `featured` | Equal heights, CTA pinned to bottom; one featured per row |
| Step | default | `number`, `title`, `text` (≤120 chars) | Inside a real `<ol>` |
| DateList | default | `items[{label, date}]` | Hero side card |
| TrustBullet | default | `text` | 8px amber square |
| FaqItem | closed, open | `question`, `answer`, `open` | Native `<details>/<summary>` |
| CtaBand | default | `title`, `text`, `ctaLabel`, `ctaHref` | Indigo background |
| Footer | default | none | Includes independence line |

## States and Interactions

| Element | State | Behavior |
| --- | --- | --- |
| Primary button | Hover/active | Background `--brand-hover`, `--dur-fast` `--ease-out`; no movement |
| Secondary button | Hover | Fill `--surface-alt` |
| Accent button | Hover | Background #E8951A |
| All interactive | Focus-visible | 3px `--ink` outline, 3px offset; white outline on indigo backgrounds |
| Header | Scrolled > 8px | Adds 1px `--line` bottom border |
| Mobile menu | Open | Full-width panel with the three links; `aria-expanded`, Esc closes, focus to first link, closes on link click |
| Anchor links | Click | Smooth scroll with `scroll-margin-top` = header height |
| FaqItem | Toggle | Plus/minus icon swap; open item gets `--brand` border; height transition `--dur-base` |
| Booking links | Click | Same tab to `BOOKING_URL` with `?utm_source=website&utm_medium=<section>` |

## Responsive Behavior

| Breakpoint | Changes |
| --- | --- |
| Desktop (≥ 900px) | Hero two columns (1.6fr / 1fr); offers 3 columns; steps 4 columns; full header |
| Tablet (600–899px) | Hero stacks (date card below); offers 2 + 1; steps 2 × 2; mobile header |
| Mobile (< 600px) | One column; buttons full width; featured offer card shown first (CSS `order`); section padding 56px |

Why mobile-first matters here: most visitors open a link from a partner's email or social post on their phone.

## Edge Cases

- **Booking URL missing**: read from a single config value; if empty, buttons link to `mailto:info@mtdbackoffice.co.uk`.
- **JS disabled**: mobile menu falls back to visible stacked links; FAQ works natively.
- **Long text**: offer descriptions capped at 200 characters; titles wrap, never truncate.
- **Slow connections**: no hero image; fonts swap; total page weight target under 200 KB excluding fonts.
- **Placeholders**: `[booking link]` and `[privacy notice]` stay visible until filled.

## Animation / Motion

| Element | Trigger | Animation | Duration | Easing |
| --- | --- | --- | --- | --- |
| Buttons, links | Hover | Colour change | 150ms | ease-out |
| FAQ answer | Toggle | Height reveal | 200ms | ease-out |
| Anchor scroll | Click | Smooth scroll | browser default | — |

No scroll-triggered entrance animations. Everything off under `prefers-reduced-motion: reduce`.

## Accessibility Notes

- WCAG 2.2 AA. Skip link to `#main`; landmarks `header`, `nav`, `main`, `footer`; one `h1`.
- Focus order follows visual order; header CTA before menu button on mobile.
- Logo link `aria-label="MTD Back Office home"`; menu button `aria-label="Menu"`, `aria-controls`, `aria-expanded`.
- Amber is never used for text on white (fails contrast). Ink on amber passes.
- Touch targets ≥ 44px.

## SEO and metadata

- Title: "MTD Back Office · MTD and admin setup for sole traders and landlords"
- Meta description (≤155 chars) from the hero paragraph.
- Open Graph image 1200×630 in the brand style (indigo, white wordmark, "MTD-ready before 6 April 2027").
- Favicon set from `brand/icon-app.svg` / `brand/icon-app-1024.png` (32, 180 apple-touch, 192, 512).
- JSON-LD `ProfessionalService` with name, url, email (info@mtdbackoffice.co.uk), areaServed GB, priceRange.
- `lang="en-GB"`, sitemap.xml, robots.txt.

## Content and compliance rules

- Prices always shown "ex-VAT".
- Say "HMRC-recognised software"; never "HMRC approved"; no HMRC logo or crest.
- Footer line on every page: "MTD Back Office is an independent business, not part of HMRC."
- No tracking cookies without consent; prefer cookieless analytics.

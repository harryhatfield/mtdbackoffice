# MTDBackOffice.co.uk

Marketing site for MTD Back Office. Astro (static output), plain CSS built on `src/styles/tokens.css`, no client-side framework. The only JavaScript is the mobile menu and scrolled-header border (`src/scripts/header.ts`).

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run assets    # regenerate favicons and og.png from brand/ (needs playwright)
```

Routes: `/`, `/thanks`, `/privacy`, `/terms`, `/404`.

## Before launch

Placeholders still to fill:

- **`[booking link]`**: set `BOOKING_URL` in `src/config.ts`. While it is empty, every booking button opens an email to info@mtdbackoffice.co.uk instead. Set the booking tool to redirect to `/thanks` after booking.
- **`[privacy notice]`**: replace the placeholder in `src/pages/privacy.astro` with the UK GDPR notice.
- **`[terms of service]`**: replace the placeholder in `src/pages/terms.astro` (scope must exclude tax advice and filing).

Also check: no company number, registered office or ICO number is shown (sole trader for now). Prices stay labelled ex-VAT. Never say "HMRC approved".

The `theme-color` meta tag and `site.webmanifest` hold the indigo/white hex values directly, because CSS variables cannot be used there. Update them if the tokens change.

## Deploy

Any static host works (Cloudflare Pages, Netlify, GitHub Pages). `public/CNAME` carries the custom domain into `dist/` for GitHub Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Node 20 or later
- Point the `mtdbackoffice.co.uk` domain at the host and enable HTTPS.

`public/brand/` holds copies of the logo SVGs used on the page; `brand/` is the source set.

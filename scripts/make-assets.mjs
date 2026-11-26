// Generates favicons and the Open Graph image from brand/ assets.
// Run: npm run assets   (needs sharp and playwright)
import sharp from 'sharp';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (f) => resolve(root, 'public', f);

for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(resolve(root, 'brand/icon-app-1024.png')).resize(size, size).png().toFile(out(name));
}

const logo = readFileSync(resolve(root, 'brand/logo-reversed.svg')).toString('base64');
const fontCss = [400, 800]
  .map((w) => {
    const f = readFileSync(resolve(root, `node_modules/@fontsource/manrope/files/manrope-latin-${w}-normal.woff2`)).toString('base64');
    return `@font-face{font-family:Manrope;font-weight:${w};src:url(data:font/woff2;base64,${f})}`;
  })
  .join('');
const html = `<!doctype html><html><head><style>${fontCss}
body{margin:0;width:1200px;height:630px;background:#2E2A8C;font-family:Manrope,sans-serif;color:#fff;display:flex;flex-direction:column;justify-content:center;gap:48px;padding:0 96px;box-sizing:border-box}
img{width:560px;height:auto}
p{margin:0;font-size:56px;line-height:64px;font-weight:800;letter-spacing:-1.2px;max-width:900px}
i{display:block;width:16px;height:16px;background:#F5A524;margin-bottom:24px}
</style></head><body><img src="data:image/svg+xml;base64,${logo}"><div><i></i><p>MTD-ready before 6 April 2027</p></div></body></html>`;

let chromium;
try {
  chromium = createRequire(import.meta.url)('playwright').chromium;
} catch {
  chromium = createRequire('/usr/lib/node_modules/')('playwright').chromium;
}
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
writeFileSync(out('og.png'), await page.screenshot());
await browser.close();
console.log('assets written to public/');

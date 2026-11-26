// Mobile menu and scrolled-header border. The only client-side JavaScript on the site.
const header = document.getElementById('site-header');
const btn = header?.querySelector<HTMLButtonElement>('.menu-btn');
const nav = document.getElementById('site-nav');

function syncHeight() {
  if (header) document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
}
function onScroll() {
  header?.classList.toggle('scrolled', window.scrollY > 8);
}
function setOpen(open: boolean, focusFirst = false) {
  if (!btn || !nav) return;
  btn.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  syncHeight();
  if (open && focusFirst) nav.querySelector<HTMLAnchorElement>('a')?.focus();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', syncHeight);
onScroll();
syncHeight();

btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true', true));
nav?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setOpen(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && btn?.getAttribute('aria-expanded') === 'true') {
    setOpen(false);
    btn.focus();
  }
});

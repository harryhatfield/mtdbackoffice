// Single place for the booking link and business details.

/** Booking tool URL. Leave empty until the owner has one: buttons then fall back to email. */
export const BOOKING_URL = '';

export const EMAIL = 'info@mtdbackoffice.co.uk';
export const SITE_URL = 'https://mtdbackoffice.co.uk';
export const INDEPENDENCE_LINE = 'MTD Back Office is an independent business, not part of HMRC.';

/** Link for any "book" button. `medium` names the page section for utm tracking. */
export function bookingHref(medium: string): string {
  if (!BOOKING_URL) return `mailto:${EMAIL}?subject=Free%2030-minute%20admin%20check`;
  const sep = BOOKING_URL.includes('?') ? '&' : '?';
  return `${BOOKING_URL}${sep}utm_source=website&utm_medium=${encodeURIComponent(medium)}`;
}

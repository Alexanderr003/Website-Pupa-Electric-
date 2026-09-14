import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { company } from '@/content/company';
import { isTodo } from '@/content/todo';
import { hrefFor } from '@/i18n/routing';

/**
 * The quick lane. Until the owner supplies a number it points at the quote
 * form rather than at a dead wa.me link.
 */
export function WhatsAppFab({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const configured = !isTodo(company.whatsapp);
  const href = configured
    ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(t.whatsappIntro)}`
    : hrefFor('quote', locale);

  return (
    <a
      className="fab"
      href={href}
      {...(configured ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.3-1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.3.4c-.1.1-.3.3-.1.6.1.3.6 1.1 1.4 1.7 1 .8 1.7 1 2 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
      </svg>
      <span>{t.fab}</span>
    </a>
  );
}

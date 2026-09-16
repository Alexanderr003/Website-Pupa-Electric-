import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { allStaticPaths, pageIdFromSlug, slugFor, type PageId } from '@/i18n/routing';
import { alternatesFor } from '@/lib/seo';
import { services } from '@/content/services';
import { company } from '@/content/company';
import { QuoteForm } from '@/components/QuoteForm';
import { Todo } from '@/components/Todo';

export const dynamicParams = false;

export function generateStaticParams() {
  return allStaticPaths();
}

function titleFor(page: PageId, t: ReturnType<typeof getDictionary>): string {
  if (page === 'quote') return t.qTitle;
  if (page === 'privacy') return t.privacyTitle;
  return t.termsTitle;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = pageIdFromSlug(locale, slug);
  if (!page) return {};
  const t = getDictionary(locale);

  const paths = Object.fromEntries(
    locales.map((l) => [l, `/${l}/${slugFor(page, l)}`]),
  ) as Record<Locale, string>;

  return {
    title: titleFor(page, t),
    alternates: alternatesFor(paths, locale),
    robots: page === 'quote' ? undefined : { index: false, follow: true },
  };
}

export default async function SecondaryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const page = pageIdFromSlug(locale, slug);
  if (!page) notFound();
  const t = getDictionary(locale);

  if (page === 'quote') {
    const serviceLabels: [string, string][] = services.map((s) => [s.id, s[locale].name]);

    return (
      <div className="wrap">
        <div className="page-head">
          <p className="eyebrow">{t.eb5}</p>
          <h1>{t.qTitle}</h1>
          <p className="lede">{t.qLede}</p>
        </div>
        <Suspense fallback={<p className="lede" style={{ paddingBlock: 40 }}>…</p>}>
          <QuoteForm t={t} locale={locale} homeHref={`/${locale}`} serviceLabels={serviceLabels} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="page-head">
        <h1>{titleFor(page, t)}</h1>
      </div>
      <div className="prose">
        <p className="alert">{t.legalDraft}</p>
        {page === 'privacy' ? <PrivacyBody locale={locale} /> : <TermsBody locale={locale} />}
      </div>
    </div>
  );
}

const PRIVACY: Record<Locale, { h: string; p: string }[]> = {
  nl: [
    { h: 'Wie verwerkt uw gegevens', p: `${company.name}, ingeschreven bij de KvK onder nummer ${company.kvk}, gevestigd in ${company.address.city}.` },
    { h: 'Wat wij vastleggen', p: 'Alleen wat u zelf invult in het offerteformulier: naam, bedrijfsnaam, e-mailadres, telefoonnummer, postcode en huisnummer, en uw toelichting. Wij gebruiken geen tracking-cookies en geen advertentienetwerken.' },
    { h: 'Waarvoor', p: 'Uitsluitend om uw aanvraag te beantwoorden en, als daar een opdracht uit voortkomt, om het werk uit te voeren en te documenteren.' },
    { h: 'Hoe lang', p: 'Aanvragen die niet tot een opdracht leiden bewaren wij twaalf maanden. Dossiers van uitgevoerde installaties bewaren wij zolang de wettelijke bewaartermijn en de garantie dat vereisen.' },
    { h: 'Uw rechten', p: `U mag uw gegevens inzien, laten corrigeren of laten verwijderen. Een mail naar ${company.email} volstaat.` },
  ],
  en: [
    { h: 'Who processes your data', p: `${company.name}, registered with the Dutch Chamber of Commerce under number ${company.kvk}, based in ${company.address.city}.` },
    { h: 'What we record', p: 'Only what you enter in the quote form: name, company name, email address, phone number, postcode and house number, and your notes. We use no tracking cookies and no ad networks.' },
    { h: 'What for', p: 'Solely to answer your request and, if it becomes a job, to carry out and document the work.' },
    { h: 'How long', p: 'Requests that do not become a job are kept for twelve months. Dossiers for completed installations are kept for as long as statutory retention and the warranty require.' },
    { h: 'Your rights', p: `You may see, correct or delete your data. An email to ${company.email} is enough.` },
  ],
  es: [
    { h: 'Quién trata sus datos', p: `${company.name}, inscrita en el registro mercantil neerlandés con el número ${company.kvk} y domicilio en ${company.address.city}.` },
    { h: 'Qué registramos', p: 'Solo lo que usted introduce en el formulario de presupuesto: nombre, empresa, correo, teléfono, código postal y número, y sus comentarios. No usamos cookies de seguimiento ni redes publicitarias.' },
    { h: 'Para qué', p: 'Únicamente para responder a su solicitud y, si da lugar a un encargo, para ejecutar y documentar el trabajo.' },
    { h: 'Cuánto tiempo', p: 'Las solicitudes que no se convierten en encargo se conservan doce meses. Los expedientes de instalaciones ejecutadas se conservan mientras lo exijan el plazo legal y la garantía.' },
    { h: 'Sus derechos', p: `Puede consultar, corregir o eliminar sus datos. Basta un correo a ${company.email}.` },
  ],
};

const TERMS: Record<Locale, { h: string; p: string }[]> = {
  nl: [
    { h: 'Offertes', p: 'Een offerte is dertig dagen geldig en gebaseerd op de situatie zoals aangetroffen tijdens de intake. Afwijkingen die pas bij demontage zichtbaar worden, melden wij vóór wij doorgaan.' },
    { h: 'Uitvoering', p: 'Alle werk wordt uitgevoerd volgens NEN 1010 en, waar van toepassing, NEN 3140. Bij oplevering ontvangt u het meetrapport, het eendraadschema en de fotodocumentatie.' },
    { h: 'Garantie', p: 'Op ons werk geldt TODO_GARANTIE jaar garantie. Op geleverde componenten geldt de fabrieksgarantie, die wij bij oplevering meeleveren.' },
    { h: 'Betaling', p: 'Betaling binnen veertien dagen na factuurdatum, tenzij schriftelijk anders overeengekomen.' },
  ],
  en: [
    { h: 'Quotations', p: 'A quotation is valid for thirty days and based on the situation as found during intake. Anything that only becomes visible on dismantling is reported before we continue.' },
    { h: 'Execution', p: 'All work is carried out to NEN 1010 and, where applicable, NEN 3140. At handover you receive the test report, the one-line diagram and the photographic record.' },
    { h: 'Warranty', p: 'Our workmanship carries a TODO_GARANTIE year warranty. Supplied components carry the manufacturer warranty, handed over with the job.' },
    { h: 'Payment', p: 'Payment within fourteen days of the invoice date, unless agreed otherwise in writing.' },
  ],
  es: [
    { h: 'Presupuestos', p: 'Un presupuesto es válido treinta días y se basa en la situación encontrada en la visita previa. Todo lo que solo aparece al desmontar se comunica antes de continuar.' },
    { h: 'Ejecución', p: 'Todo el trabajo se ejecuta según NEN 1010 y, cuando aplica, NEN 3140. En la entrega recibe el informe de medición, el esquema unifilar y el registro fotográfico.' },
    { h: 'Garantía', p: 'Nuestra mano de obra tiene TODO_GARANTIE años de garantía. Los componentes suministrados llevan la garantía del fabricante, que se entrega con la obra.' },
    { h: 'Pago', p: 'Pago en catorce días desde la fecha de factura, salvo acuerdo escrito distinto.' },
  ],
};

function Body({ sections }: { sections: { h: string; p: string }[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          <p>
            {s.p.split(/(TODO_[A-Z]+)/).map((part, i) =>
              part.startsWith('TODO_') ? <Todo key={i} value={part} /> : <span key={i}>{part}</span>,
            )}
          </p>
        </section>
      ))}
    </>
  );
}

const PrivacyBody = ({ locale }: { locale: Locale }) => <Body sections={PRIVACY[locale]} />;
const TermsBody = ({ locale }: { locale: Locale }) => <Body sections={TERMS[locale]} />;

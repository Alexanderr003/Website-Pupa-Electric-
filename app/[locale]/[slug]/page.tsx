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
import { ApplicationForm } from '@/components/ApplicationForm';
import { Todo } from '@/components/Todo';
import { VanBand } from '@/components/VanBand';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StorageSection } from '@/components/sections/StorageSection';
import { PriceSection } from '@/components/sections/PriceSection';
import { DossierSection } from '@/components/sections/DossierSection';
import { WallSection } from '@/components/sections/WallSection';
import { CertSection } from '@/components/sections/CertSection';
import { PartnerBand } from '@/components/sections/PartnerBand';
import { CtaBand } from '@/components/sections/CtaBand';

export const dynamicParams = false;

export function generateStaticParams() {
  return allStaticPaths();
}

type Dict = ReturnType<typeof getDictionary>;

function titleFor(page: PageId, t: Dict): string {
  switch (page) {
    case 'services':
      return t.servicesTitle;
    case 'work':
      return t.workTitle;
    case 'about':
      return t.aboutTitle;
    case 'careers':
      return t.jobsTitle;
    case 'quote':
      return t.qTitle;
    case 'privacy':
      return t.privacyTitle;
    case 'terms':
      return t.termsTitle;
  }
}

function ledeFor(page: PageId, t: Dict): string | null {
  switch (page) {
    case 'services':
      return t.servicesLede;
    case 'work':
      return t.workLede;
    case 'about':
      return t.aboutLede;
    case 'careers':
      return t.jobsLede;
    case 'quote':
      return t.qLede;
    default:
      return null;
  }
}

/** The legal drafts stay out of the index; everything else is a real page. */
const NOINDEX: PageId[] = ['privacy', 'terms'];

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
    description: ledeFor(page, t) ?? undefined,
    robots: NOINDEX.includes(page) ? { index: false, follow: true } : undefined,
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

  const head = (
    <div className="page-head">
      <h1>{titleFor(page, t)}</h1>
      {ledeFor(page, t) ? <p className="lede">{ledeFor(page, t)}</p> : null}
    </div>
  );

  if (page === 'services') {
    return (
      <div className="wrap">
        {head}
        <ServicesSection locale={locale} head={false} />
        <StorageSection locale={locale} />
        <PriceSection locale={locale} />
        <CtaBand locale={locale} withVan={false} />
      </div>
    );
  }

  if (page === 'work') {
    return (
      <div className="wrap">
        {head}
        <DossierSection locale={locale} head={false} />
        <WallSection locale={locale} />
        <CtaBand locale={locale} withVan={false} />
      </div>
    );
  }

  if (page === 'about') {
    return (
      <div className="wrap">
        {head}
        <section className="sec">
          <div className="prose" style={{ maxWidth: '70ch' }}>
            <section>
              <h2>{t.aboutFoundedH}</h2>
              <p>{t.aboutFoundedP}</p>
            </section>
            <section>
              <h2>{t.aboutReachH}</h2>
              <p>{t.aboutReachP}</p>
            </section>
            <section>
              <h2>{t.aboutCrewH}</h2>
              <p>{t.vanBody}</p>
            </section>
            <section>
              <h2>{t.aboutWhyH}</h2>
              <p>{t.aboutWhyP}</p>
            </section>
          </div>
          <div style={{ marginTop: 'clamp(26px,4vw,44px)' }}>
            <VanBand locale={locale} />
          </div>
        </section>
        <PartnerBand locale={locale} />
        <CertSection locale={locale} />
        <CtaBand locale={locale} withVan={false} />
      </div>
    );
  }

  if (page === 'careers') {
    return (
      <div className="wrap">
        {head}
        <section className="sec">
          <div className="prose" style={{ maxWidth: '70ch' }}>
            <section>
              <h2>{t.jobsWhoH}</h2>
              <p>{t.jobsWhoP}</p>
            </section>
            <section>
              <h2>{t.jobsOfferH}</h2>
              <p>{t.jobsOfferP}</p>
            </section>
          </div>
          <ApplicationForm t={t} homeHref={`/${locale}`} />
        </section>
      </div>
    );
  }

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
  fr: [
    { h: 'Qui traite vos données', p: `${company.name}, immatriculée au registre du commerce néerlandais sous le numéro ${company.kvk}, établie à ${company.address.city}.` },
    { h: 'Ce que nous enregistrons', p: 'Uniquement ce que vous saisissez dans le formulaire de devis : nom, raison sociale, adresse e-mail, numéro de téléphone, code postal et numéro, et vos précisions. Nous n’utilisons ni cookies de suivi ni régies publicitaires.' },
    { h: 'À quelle fin', p: 'Uniquement pour répondre à votre demande et, si elle devient un chantier, pour exécuter et documenter les travaux.' },
    { h: 'Combien de temps', p: 'Les demandes qui ne débouchent pas sur un chantier sont conservées douze mois. Les dossiers d’installations réalisées sont conservés aussi longtemps que l’exigent le délai légal et la garantie.' },
    { h: 'Vos droits', p: `Vous pouvez consulter, faire corriger ou faire supprimer vos données. Un e-mail à ${company.email} suffit.` },
  ],
  pt: [
    { h: 'Quem trata os seus dados', p: `${company.name}, inscrita no registo comercial neerlandês com o número ${company.kvk} e sede em ${company.address.city}.` },
    { h: 'O que registamos', p: 'Apenas o que introduz no formulário de orçamento: nome, nome da empresa, endereço de e-mail, telefone, código postal e número, e as suas observações. Não usamos cookies de rastreio nem redes de publicidade.' },
    { h: 'Para quê', p: 'Exclusivamente para responder ao seu pedido e, se der origem a uma obra, para a executar e documentar.' },
    { h: 'Durante quanto tempo', p: 'Os pedidos que não dão origem a obra são guardados doze meses. Os processos de instalações executadas são guardados enquanto o prazo legal e a garantia o exigirem.' },
    { h: 'Os seus direitos', p: `Pode consultar, corrigir ou apagar os seus dados. Basta um e-mail para ${company.email}.` },
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
  fr: [
    { h: 'Devis', p: 'Un devis est valable trente jours et repose sur la situation constatée lors de la visite. Tout écart qui n’apparaît qu’au démontage vous est signalé avant que nous poursuivions.' },
    { h: 'Exécution', p: 'Tous les travaux sont exécutés selon la NEN 1010 et, le cas échéant, la NEN 3140. À la réception, vous recevez le rapport de mesures, le schéma unifilaire et le reportage photographique.' },
    { h: 'Garantie', p: 'Notre main-d’œuvre est garantie TODO_GARANTIE ans. Les composants fournis bénéficient de la garantie constructeur, remise avec le chantier.' },
    { h: 'Paiement', p: 'Paiement sous quatorze jours à compter de la date de facture, sauf accord écrit contraire.' },
  ],
  pt: [
    { h: 'Orçamentos', p: 'Um orçamento é válido trinta dias e baseia-se na situação encontrada na visita prévia. Tudo o que só se torna visível ao desmontar é comunicado antes de continuarmos.' },
    { h: 'Execução', p: 'Todo o trabalho é executado segundo a NEN 1010 e, quando aplicável, a NEN 3140. Na entrega recebe o relatório de medição, o esquema unifilar e o registo fotográfico.' },
    { h: 'Garantia', p: 'A nossa mão de obra tem TODO_GARANTIE anos de garantia. Os componentes fornecidos têm a garantia do fabricante, entregue com a obra.' },
    { h: 'Pagamento', p: 'Pagamento em catorze dias a contar da data da fatura, salvo acordo escrito em contrário.' },
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

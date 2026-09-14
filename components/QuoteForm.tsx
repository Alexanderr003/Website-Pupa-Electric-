'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useId, useMemo, useRef, useState } from 'react';
import { submitQuote, type QuoteState } from '@/lib/actions/quote';
import type { QuoteField } from '@/lib/schemas/quote';

type Dict = Record<string, string>;
type Errors = Partial<Record<QuoteField, string>>;

const TOTAL_STEPS = 5; // four question steps plus the review

export function QuoteForm({
  t,
  locale,
  homeHref,
  serviceLabels,
}: {
  t: Dict;
  locale: string;
  homeHref: string;
  /** [value, label] pairs, already in the visitor's language */
  serviceLabels: [string, string][];
}) {
  const router = useRouter();
  const search = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const stepParam = Number(search.get('stap') ?? 1);
  const step = Number.isFinite(stepParam) ? Math.min(TOTAL_STEPS, Math.max(1, stepParam)) : 1;

  const [state, formAction, pending] = useActionState<QuoteState, FormData>(submitQuote, {
    status: 'idle',
  });
  const [localErrors, setLocalErrors] = useState<Errors>({});
  const [values, setValues] = useState<Record<string, string>>({
    customerType: 'residential',
    preferredContact: 'phone',
  });
  const [dirty, setDirty] = useState(false);

  const errors: Errors = useMemo(
    () => ({ ...(state.status === 'error' ? state.fieldErrors : undefined), ...localErrors }),
    [state, localErrors],
  );

  /** Leaving mid-flow loses the answers, so say so before it happens. */
  useEffect(() => {
    if (!dirty || state.status === 'success') return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, state.status]);

  /** Move focus to the first thing that needs fixing, as the guidelines require. */
  useEffect(() => {
    const first = Object.keys(errors)[0];
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  }, [errors]);

  function goTo(next: number) {
    const params = new URLSearchParams(search.toString());
    params.set('stap', String(next));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const required: Record<number, QuoteField[]> = {
    1: ['service', 'customerType'],
    2: ['connection', 'timeline'],
    3: [],
    4: ['name', 'email', 'phone', 'postcode', 'houseNumber', 'preferredContact', 'consent'],
  };

  function validateStep(n: number): boolean {
    const data = new FormData(formRef.current ?? undefined);
    const found: Errors = {};
    for (const field of required[n] ?? []) {
      const value = String(data.get(field) ?? '').trim();
      if (!value) found[field] = field === 'consent' ? 'errConsent' : 'errRequired';
    }
    if (n === 4) {
      const email = String(data.get('email') ?? '');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) found.email = 'errEmail';
      const postcode = String(data.get('postcode') ?? '');
      if (postcode && !/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(postcode)) found.postcode = 'errPostcode';
      if (data.get('customerType') === 'business' && !String(data.get('company') ?? '').trim()) {
        found.company = 'errCompany';
      }
    }
    setLocalErrors(found);
    return Object.keys(found).length === 0;
  }

  if (state.status === 'success') {
    return (
      <div className="done">
        <h2>{t.successTitle}</h2>
        <p>{t.successBody}</p>
        {state.mode === 'logged' && <p className="alert">{t.devNotice}</p>}
        <p className="ref">
          {t.successRef}: <b>{state.reference}</b>
        </p>
        <p style={{ marginTop: 22 }}>
          <Link className="btn btn-s" href={homeHref}>
            {t.backHome}
          </Link>
        </p>
      </div>
    );
  }

  const stepTitles = [t.s1Title, t.s2Title, t.s3Title, t.s4Title, t.reviewTitle];

  const err = (field: QuoteField) =>
    errors[field] ? (
      <span className="err" id={`${uid}-${field}-err`} role="alert">
        {t[errors[field] as string] ?? t.errRequired}
      </span>
    ) : null;

  const aria = (field: QuoteField) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${uid}-${field}-err` : undefined,
  });

  /** Labels come from the service content layer, so the form never drifts from the site. */
  const serviceOptions = serviceLabels;

  return (
    <form
      className="form"
      ref={formRef}
      action={formAction}
      onChange={(e) => {
        setDirty(true);
        const target = e.target as unknown as { name?: string; value?: string };
        if (target.name) setValues((v) => ({ ...v, [target.name as string]: target.value ?? '' }));
      }}
      noValidate
    >
      <ol className="steps">
        {stepTitles.map((title, i) => (
          <li key={title} data-state={i + 1 === step ? 'current' : i + 1 < step ? 'done' : 'todo'}>
            <span>
              {t.qStep} {i + 1} {t.qOf} {TOTAL_STEPS} — {title}
            </span>
          </li>
        ))}
      </ol>

      {/* Hidden steps stay in the DOM so their answers are still submitted. */}
      <fieldset hidden={step !== 1}>
        <legend>{t.s1Title}</legend>
        <div className="field">
          <span className="grouplabel" id={`${uid}-service`}>
            {t.fService}
          </span>
          <div className="cards" role="radiogroup" aria-labelledby={`${uid}-service`}>
            {serviceOptions.map(([value, label]) => (
              <label className="card-opt" key={value}>
                <input type="radio" name="service" value={value} {...aria('service')} />
                <span className="dot" aria-hidden="true" />
                <span className="lbl">{label}</span>
              </label>
            ))}
          </div>
          {err('service')}
        </div>
        <div className="field">
          <span className="grouplabel" id={`${uid}-ctype`}>
            {t.fCustomer}
          </span>
          <div className="cards" role="radiogroup" aria-labelledby={`${uid}-ctype`}>
            {[
              ['residential', t.fResidential],
              ['business', t.fBusiness],
            ].map(([value, label]) => (
              <label className="card-opt" key={value}>
                <input
                  type="radio"
                  name="customerType"
                  value={value}
                  defaultChecked={value === 'residential'}
                />
                <span className="dot" aria-hidden="true" />
                <span className="lbl">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset hidden={step !== 2}>
        <legend>{t.s2Title}</legend>
        <div className="field">
          <label htmlFor={`${uid}-conn`}>{t.fConnection}</label>
          <select id={`${uid}-conn`} name="connection" defaultValue="" {...aria('connection')}>
            <option value="" disabled>
              —
            </option>
            <option value="1x25">1×25 A</option>
            <option value="3x25">3×25 A</option>
            <option value="3x35">3×35 A</option>
            <option value="3x80">3×80 A</option>
            <option value="grootverbruik">&gt; 3×80 A</option>
            <option value="unknown">{t.fConnUnknown}</option>
          </select>
          {err('connection')}
        </div>
        <div className="field">
          <span className="grouplabel" id={`${uid}-time`}>
            {t.fTimeline}
          </span>
          <div className="cards" role="radiogroup" aria-labelledby={`${uid}-time`}>
            {[
              ['asap', t.fAsap],
              ['1-3', t.f1to3],
              ['3-6', t.f3to6],
              ['orienting', t.fOrienting],
            ].map(([value, label]) => (
              <label className="card-opt" key={value}>
                <input type="radio" name="timeline" value={value} {...aria('timeline')} />
                <span className="dot" aria-hidden="true" />
                <span className="lbl">{label}</span>
              </label>
            ))}
          </div>
          {err('timeline')}
        </div>
      </fieldset>

      <fieldset hidden={step !== 3}>
        <legend>{t.s3Title}</legend>
        <div className="field">
          <label htmlFor={`${uid}-msg`}>
            {t.fMessage} <span className="hint">({t.fOptional})</span>
          </label>
          <textarea id={`${uid}-msg`} name="message" maxLength={2000} placeholder={t.fMessageHint} />
        </div>
      </fieldset>

      <fieldset hidden={step !== 4}>
        <legend>{t.s4Title}</legend>
        <div className="field">
          <label htmlFor={`${uid}-name`}>{t.fName}</label>
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" {...aria('name')} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-email`}>{t.fEmail}</label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            {...aria('email')}
          />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-phone`}>{t.fPhone}</label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            spellCheck={false}
            {...aria('phone')}
          />
          {err('phone')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-pc`}>{t.fPostcode}</label>
          <input
            id={`${uid}-pc`}
            name="postcode"
            type="text"
            autoComplete="postal-code"
            spellCheck={false}
            placeholder="2011 AB"
            {...aria('postcode')}
          />
          {err('postcode')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-hn`}>{t.fHouseNumber}</label>
          <input
            id={`${uid}-hn`}
            name="houseNumber"
            type="text"
            inputMode="numeric"
            autoComplete="address-line2"
            {...aria('houseNumber')}
          />
          {err('houseNumber')}
        </div>
        <div className="field" hidden={values.customerType !== 'business'}>
          <label htmlFor={`${uid}-co`}>{t.fCompany}</label>
          <input
            id={`${uid}-co`}
            name="company"
            type="text"
            autoComplete="organization"
            {...aria('company')}
          />
          {err('company')}
        </div>
        <div className="field">
          <span className="grouplabel" id={`${uid}-pref`}>
            {t.fPreferred}
          </span>
          <div className="cards" role="radiogroup" aria-labelledby={`${uid}-pref`}>
            {[
              ['phone', t.fByPhone],
              ['email', t.fByEmail],
              ['whatsapp', t.fByWhatsapp],
            ].map(([value, label]) => (
              <label className="card-opt" key={value}>
                <input
                  type="radio"
                  name="preferredContact"
                  value={value}
                  defaultChecked={value === 'phone'}
                />
                <span className="dot" aria-hidden="true" />
                <span className="lbl">{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="field">
          <label className="consent">
            <input type="checkbox" name="consent" {...aria('consent')} />
            <span>{t.fConsent}</span>
          </label>
          {err('consent')}
        </div>
        {/* honeypot — off-screen, never announced, never tabbable */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
      </fieldset>

      <fieldset hidden={step !== 5}>
        <legend>{t.reviewTitle}</legend>
        <dl className="review">
          {[
            [t.fService, values.service ?? '—'],
            [t.fCustomer, values.customerType === 'business' ? t.fBusiness : t.fResidential],
            [t.fConnection, values.connection ?? '—'],
            [t.fTimeline, values.timeline ?? '—'],
            [t.fName, values.name ?? '—'],
            [t.fEmail, values.email ?? '—'],
            [t.fPhone, values.phone ?? '—'],
            [t.fPostcode, `${values.postcode ?? '—'} ${values.houseNumber ?? ''}`],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'contents' }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </fieldset>

      {state.status === 'error' && (state.formError || Object.keys(errors).length > 0) && (
        <p className="alert" role="alert">
          {state.formError ? `${t.errorTitle} — ${t[state.formError] ?? ''}` : t.errorSummary}
        </p>
      )}

      <div className="form-nav">
        {step > 1 && (
          <button type="button" className="btn btn-s" onClick={() => goTo(step - 1)}>
            {t.back}
          </button>
        )}
        <span className="spacer" />
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            className="btn btn-p"
            onClick={() => {
              // An incomplete step still "submits": it reveals what is missing
              // rather than silently refusing the click.
              if (validateStep(step)) goTo(step + 1);
            }}
          >
            {t.next}
          </button>
        ) : (
          // Stays enabled until the request actually starts, then keeps its label.
          <button type="submit" className="btn btn-p" aria-disabled={pending}>
            {pending && <span className="spinner" aria-hidden="true" />}
            {pending ? t.submitting : t.submit}
          </button>
        )}
      </div>
      <input type="hidden" name="locale" value={locale} />
    </form>
  );
}

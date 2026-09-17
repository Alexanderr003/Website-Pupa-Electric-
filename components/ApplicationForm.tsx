'use client';

import Link from 'next/link';
import { useActionState, useEffect, useId, useRef } from 'react';
import { submitApplication, type ApplicationState } from '@/lib/actions/application';
import { jobCerts, type ApplicationField } from '@/lib/schemas/application';

type Dict = Record<string, string>;

/**
 * One page, not four. The quote flow is staged because a quote needs a lot of
 * detail before it is worth anything; an application only needs enough to start
 * a conversation, and every extra step loses a good candidate who is filling
 * this in on a phone between jobs.
 */
export function ApplicationForm({ t, homeHref }: { t: Dict; homeHref: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const [state, formAction, pending] = useActionState<ApplicationState, FormData>(
    submitApplication,
    { status: 'idle' },
  );

  const errors = state.status === 'error' ? (state.fieldErrors ?? {}) : {};

  /** Move focus to the first thing that needs fixing, as the guidelines require. */
  useEffect(() => {
    const first = Object.keys(errors)[0];
    if (!first || !formRef.current) return;
    formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [errors]);

  if (state.status === 'success') {
    return (
      <div className="done">
        <h2>{t.jSuccessTitle}</h2>
        <p>{t.jSuccessBody}</p>
        <p className="ref mono">
          {t.successRef}: <b>{state.reference}</b>
        </p>
        {state.mode === 'logged' ? <p className="caption">{t.devNotice}</p> : null}
        <p style={{ marginTop: 22 }}>
          <Link className="btn btn-s" href={homeHref}>
            {t.backHome}
          </Link>
        </p>
      </div>
    );
  }

  const err = (field: ApplicationField) => errors[field];

  /** A field's error is announced by the input itself, so screen readers get it on focus. */
  const describe = (field: ApplicationField) => (err(field) ? `${uid}-${field}-err` : undefined);

  function Err({ field }: { field: ApplicationField }) {
    const code = err(field);
    if (!code) return null;
    return (
      <p className="err" id={`${uid}-${field}-err`}>
        {t[code] ?? t.errRequired}
      </p>
    );
  }

  const roleOptions: [string, string][] = [
    ['monteur', t.jRoleMonteur ?? ''],
    ['first', t.jRoleFirst ?? ''],
    ['apprentice', t.jRoleApprentice ?? ''],
    ['other', t.jRoleOther ?? ''],
  ];
  const startOptions: [string, string][] = [
    ['now', t.jStartNow ?? ''],
    ['1m', t.jStart1 ?? ''],
    ['2m', t.jStart2 ?? ''],
  ];
  const certLabels: Record<(typeof jobCerts)[number], string> = {
    nen3140: t.jCertNen ?? '',
    vca: t.jCertVca ?? '',
    dvp: t.jCertDvp ?? '',
    bhv: t.jCertBhv ?? '',
    driving: t.jCertDriving ?? '',
  };

  return (
    <form className="form" ref={formRef} action={formAction} noValidate>
      {/* Honeypot. Hidden from people and from assistive tech, visible to bots. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend>{t.jobsFormTitle}</legend>
        <p className="hint" style={{ marginTop: 8 }}>
          {t.jobsFormLede}
        </p>

        <div className="field">
          <span className="grouplabel" id={`${uid}-role-label`}>
            {t.jRole}
          </span>
          <div
            className="cards"
            role="radiogroup"
            aria-labelledby={`${uid}-role-label`}
            aria-describedby={describe('role')}
          >
            {roleOptions.map(([value, label]) => (
              <label className="card-opt" key={value}>
                <input type="radio" name="role" value={value} />
                <span className="dot" aria-hidden="true" />
                <span className="lbl">{label}</span>
              </label>
            ))}
          </div>
          <Err field="role" />
        </div>

        <div className="field">
          <label htmlFor={`${uid}-years`}>{t.jYears}</label>
          <input
            id={`${uid}-years`}
            name="years"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={err('years') ? true : undefined}
            aria-describedby={describe('years')}
          />
          <Err field="years" />
        </div>

        <div className="field">
          <span className="grouplabel" id={`${uid}-certs-label`}>
            {t.jCerts} <span className="hint">({t.fOptional})</span>
          </span>
          <div className="cards" role="group" aria-labelledby={`${uid}-certs-label`}>
            {jobCerts.map((value) => (
              <label className="card-opt" key={value}>
                <input type="checkbox" name="certs" value={value} />
                <span className="dot dot-sq" aria-hidden="true" />
                <span className="lbl">{certLabels[value]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor={`${uid}-start`}>{t.jStart}</label>
          <select
            id={`${uid}-start`}
            name="start"
            defaultValue=""
            aria-invalid={err('start') ? true : undefined}
            aria-describedby={describe('start')}
          >
            <option value="" disabled>
              —
            </option>
            {startOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Err field="start" />
        </div>

        <div className="field">
          <label htmlFor={`${uid}-motivation`}>
            {t.jMotivation} <span className="hint">({t.fOptional})</span>
          </label>
          <textarea id={`${uid}-motivation`} name="motivation" rows={5} />
          <p className="hint">{t.jMotivationHint}</p>
        </div>

        <div className="field">
          <label htmlFor={`${uid}-name`}>{t.fName}</label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={err('name') ? true : undefined}
            aria-describedby={describe('name')}
          />
          <Err field="name" />
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
            aria-invalid={err('email') ? true : undefined}
            aria-describedby={describe('email')}
          />
          <Err field="email" />
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
            aria-invalid={err('phone') ? true : undefined}
            aria-describedby={describe('phone')}
          />
          <Err field="phone" />
        </div>

        <div className="field">
          <label className="consent">
            <input type="checkbox" name="consent" aria-describedby={describe('consent')} />
            <span>{t.jConsent}</span>
          </label>
          <Err field="consent" />
        </div>
      </fieldset>

      <div aria-live="polite">
        {state.status === 'error' && Object.keys(errors).length > 0 ? (
          <p className="alert">{t.errorSummary}</p>
        ) : null}
        {state.status === 'error' && state.formError ? (
          <p className="alert">
            <b>{t.errorTitle}</b> {t[state.formError] ?? t.errorBody}
          </p>
        ) : null}
      </div>

      <div className="form-nav">
        <span className="spacer" />
        {/* Enabled until the request actually starts, and the label never disappears. */}
        <button className="btn btn-p" type="submit" disabled={pending}>
          {pending ? <span className="spinner" aria-hidden="true" /> : null}
          {pending ? t.jSubmitting : t.jSubmit}
        </button>
      </div>
    </form>
  );
}

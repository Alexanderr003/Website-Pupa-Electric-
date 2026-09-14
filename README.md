# Pupa Electric

Marketing site for a Dutch electrical contractor: battery storage, medium-voltage
substations, industrial distribution boards, charging infrastructure, and the
inspection and maintenance that goes with them.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4, for Vercel.

## What makes this site what it is

**Transparency is a feature, not a slogan.** Three parts of the page exist to
prove workmanship rather than claim it:

- the **job dossier** — every phase of an installation with its date, its crew,
  and the standard that was checked at that exact point;
- the **open price indication** — a real job broken out line by line, including
  the subsidy deduction and an explicit list of what is *not* included;
- the **certification wall** — each accreditation with its registration number
  and expiry date, so a customer can check the public register themselves.

**One accent colour.** Solar yellow on black. Because the yellow is scarce it
can carry meaning: it marks what is live, what is certified, and what costs
money. Everything else is a warm neutral derived from the same two.

**The imagery is generated, not stock.** The hero and the isometric service
renders in `public/img` were produced for this site. They are deliberately
*illustrations*, not photographs: presenting invented photos as the company's
own work would contradict exactly what the page is selling. The photo slots in
the job dossier stay marked as pending until real site photography exists.

## Running it

```bash
pnpm install
pnpm dev            # http://localhost:3000 -> redirects to your language
pnpm build          # 16 prerendered routes
pnpm typecheck      # the gate — `next lint` was removed in Next 16
pnpm check:todos    # everything the owner still has to supply
```

## Languages

Dutch, English and Spanish, at `/nl`, `/en` and `/es`.

`middleware.ts` sends a bare `/` to the best match for the visitor's
`Accept-Language`, unless they have already chosen a language — a manual choice
is remembered in a cookie and always wins. Requests that already name a locale
are never redirected, so a crawler that landed on `/en` stays on `/en`.

Secondary pages carry a translated slug (`/nl/offerte`, `/en/quote`,
`/es/presupuesto`), mapped in `i18n/routing.ts`. The language switcher
translates the current path rather than dumping you on the home page.

`i18n/dictionaries.ts` and `i18n/ui.ts` both use Dutch as the source of truth
and type the other two against it, so a missing translation fails
`pnpm typecheck` instead of shipping a blank string.

## Filling in the real details

Every value only the owner can supply is prefixed `TODO_`:

```bash
pnpm check:todos
```

Most of them live in `content/company.ts`; the rest are certificate numbers in
`content/certifications.ts` and a warranty term in the legal pages. They render
in yellow with a dashed underline, so the site cannot quietly go live with
placeholders in it.

## Environment

Copy `.env.example` to `.env.local`. Every variable is optional in development:

| Variable | Effect when unset |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URLs fall back to `https://pupa-electric.nl` |
| `NEXT_PUBLIC_WHATSAPP` | the floating button points at the quote form instead |
| `RESEND_API_KEY`, `QUOTE_TO_EMAIL` | quote requests are written to the server log and the visitor still sees success — **in production a missing key is a visible error instead, because a lost lead is worse than a silent drop** |

## Interface rules

The site is written against Vercel's
[Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines).
The ones that shaped the code:

- only `transform` and `opacity` are animated, never layout properties, and
  never `transition: all`;
- every ambient loop (hero drift, ticker, the pulsing arrow on the chart) reads
  one flag, so the single **pause** button in the header satisfies the
  "autoplay longer than five seconds needs a control" rule for all of them at
  once — and `prefers-reduced-motion` switches them off without being asked;
- the before/after comparison is driven by a native `<input type="range">`, so
  the drag gesture has a keyboard alternative for free;
- the quote form keeps its submit button enabled until the request actually
  starts, accepts incomplete submissions in order to reveal what is missing,
  moves focus to the first error, and warns before you navigate away mid-flow.

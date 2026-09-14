import type { Localised } from './types';

export type PriceCopy = { label: string; note?: string };

/** `kind` drives the row styling: a plain line, the subtotal, a deduction, the total. */
export type PriceLine = Localised<PriceCopy> & {
  amount: number;
  kind: '' | 'sum' | 'sub' | 'tot';
};

const raw = [
    {v:6400, cls:'', nl:{l:'Batterijsysteem 15 kWh (LFP)',s:'Merk TODO_MERK · 10 jaar fabrieksgarantie'},
     en:{l:'Battery system 15 kWh (LFP)',s:'Brand TODO_MERK · 10-year manufacturer warranty'},
     es:{l:'Sistema de baterías 15 kWh (LFP)',s:'Marca TODO_MERK · 10 años de garantía de fábrica'}},
    {v:1250, cls:'', nl:{l:'Omvormer / AC-koppeling',s:'3-fase, 10 kW, met noodstroomschakeling'},
     en:{l:'Inverter / AC coupling',s:'Three-phase, 10 kW, with backup changeover'},
     es:{l:'Inversor / acoplamiento CA',s:'Trifásico, 10 kW, con conmutación de respaldo'}},
    {v:780, cls:'', nl:{l:'Installatiemateriaal',s:'Kabel 5×6 mm², groepenuitbreiding, overspanningsbeveiliging type 2'},
     en:{l:'Installation materials',s:'Cable 5×6 mm², board extension, type 2 surge protection'},
     es:{l:'Material de instalación',s:'Cable 5×6 mm², ampliación de cuadro, protección contra sobretensiones tipo 2'}},
    {v:1560, cls:'', nl:{l:'Arbeid',s:'2 monteurs × 1,5 dag, inclusief voorrijden'},
     en:{l:'Labour',s:'2 engineers × 1.5 days, travel included'},
     es:{l:'Mano de obra',s:'2 técnicos × 1,5 días, desplazamiento incluido'}},
    {v:320, cls:'', nl:{l:'Keuring NEN 1010 + meetrapport',s:'Isolatieweerstand, Zs, uitschakeltijd aardlekbeveiliging'},
     en:{l:'NEN 1010 inspection + test report',s:'Insulation resistance, Zs, RCD trip time'},
     es:{l:'Inspección NEN 1010 + informe',s:'Resistencia de aislamiento, Zs, tiempo de disparo del diferencial'}},
    {v:10310, cls:'sum', nl:{l:'Subtotaal'}, en:{l:'Subtotal'}, es:{l:'Subtotal'}},
    {v:-1850, cls:'sub', nl:{l:'ISDE-subsidie (indicatief)',s:'Aanvraag doen wij, uitbetaling loopt via RVO'},
     en:{l:'ISDE subsidy (indicative)',s:'We file the application; RVO pays it out'},
     es:{l:'Subvención ISDE (indicativa)',s:'La solicitud la tramitamos nosotros; el pago lo hace RVO'}},
    {v:8460, cls:'tot', nl:{l:'Totaal indicatief'}, en:{l:'Indicative total'}, es:{l:'Total indicativo'}}
  ];

export const priceLines: PriceLine[] = raw.map((r) => ({
  amount: r.v,
  kind: r.cls as PriceLine['kind'],
  nl: { label: r.nl.l, note: r.nl.s },
  en: { label: r.en.l, note: r.en.s },
  es: { label: r.es.l, note: r.es.s },
}));

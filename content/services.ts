import type { Localised } from './types';

export type ServiceCopy = {
  /** short category chip shown on the card image */
  tag: string;
  name: string;
  description: string;
  /** hard specifications — the numbers a buyer actually compares */
  specs: string[];
};

export type Service = Localised<ServiceCopy> & {
  /** basename of the render in /public/img, e.g. `batterij` -> svc-batterij.png */
  image: string;
};

const raw = [
    {img:'batterij',
     nl:{tag:'Opslag',n:'Batterijopslag',d:'Thuisbatterijen en bedrijfsopslag, AC- of DC-gekoppeld, met noodstroom en peakshaving.',s:['5 – 250 kWh','AC- en DC-gekoppeld','Noodstroom & peakshaving']},
     en:{tag:'Storage',n:'Battery storage',d:'Home batteries and commercial storage, AC- or DC-coupled, with backup power and peak shaving.',s:['5 – 250 kWh','AC- and DC-coupled','Backup power & peak shaving']},
     es:{tag:'Almacenaje',n:'Almacenamiento en baterías',d:'Baterías domésticas y almacenamiento industrial, acoplado en CA o CC, con respaldo y recorte de picos.',s:['5 – 250 kWh','Acoplamiento CA y CC','Respaldo y recorte de picos']}},
    {img:'middenspanning',
     nl:{tag:'20 kV',n:'Middenspanning & onderstations',d:'Compactstations, schakel- en beveiligingsinstallaties, inclusief afstemming met de netbeheerder.',s:['10 kV / 20 kV','Compactstations','Schakel- en beveiligingsinstallaties']},
     en:{tag:'20 kV',n:'Medium voltage & substations',d:'Compact substations, switchgear and protection, including coordination with the grid operator.',s:['10 kV / 20 kV','Compact substations','Switchgear & protection']},
     es:{tag:'20 kV',n:'Media tensión y centros de transformación',d:'Centros compactos, aparamenta y protecciones, incluida la coordinación con la distribuidora.',s:['10 kV / 20 kV','Centros compactos','Aparamenta y protecciones']}},
    {img:'verdeelkast',
     nl:{tag:'Industrie',n:'Verdeelinrichtingen',d:'Hoofd- en onderverdelers voor industrie, met selectiviteitsberekening en volledige labeling.',s:['Tot 4000 A','Hoofd- en onderverdelers','Selectiviteitsberekening']},
     en:{tag:'Industry',n:'Distribution boards',d:'Main and sub-distribution boards for industry, with a discrimination study and full labelling.',s:['Up to 4000 A','Main & sub-boards','Discrimination study']},
     es:{tag:'Industria',n:'Cuadros de distribución',d:'Cuadros generales y secundarios para industria, con estudio de selectividad y rotulación completa.',s:['Hasta 4000 A','Generales y secundarios','Estudio de selectividad']}},
    {img:'laadpaal',
     nl:{tag:'Mobiliteit',n:'Laadinfrastructuur',d:'Van één laadpaal tot een laadplein voor het wagenpark, met dynamisch load balancing.',s:['11 – 400 kW','Dynamisch load balancing','MID-gekeurde meting']},
     en:{tag:'Mobility',n:'Charging infrastructure',d:'From a single charge point to a fleet charging hub, with dynamic load balancing.',s:['11 – 400 kW','Dynamic load balancing','MID-certified metering']},
     es:{tag:'Movilidad',n:'Infraestructura de recarga',d:'De un único punto de recarga a una electrolinera para flotas, con reparto dinámico de carga.',s:['11 – 400 kW','Reparto dinámico de carga','Medida certificada MID']}},
    {img:'onderhoud',
     nl:{tag:'Onderhoud',n:'Onderhoud & keuring',d:'Periodieke inspectie van zonne-installaties: thermografie, stringmeting en NEN 3140-rapportage.',s:['NEN 3140-inspectie','Thermografie','Stringmeting PV']},
     en:{tag:'Maintenance',n:'Maintenance & inspection',d:'Periodic inspection of solar installations: thermography, string measurement and NEN 3140 reporting.',s:['NEN 3140 inspection','Thermography','PV string measurement']},
     es:{tag:'Mantenimiento',n:'Mantenimiento e inspección',d:'Inspección periódica de instalaciones solares: termografía, medida de strings e informe NEN 3140.',s:['Inspección NEN 3140','Termografía','Medida de strings FV']}},
    {img:'advies',
     nl:{tag:'Engineering',n:'Advies & engineering',d:'Netberekening, kabeltracé en subsidieaanvraag — voordat er één kabel getrokken wordt.',s:['Netberekening','Kabeltracéstudie','ISDE- & EIA-aanvraag']},
     en:{tag:'Engineering',n:'Advice & engineering',d:'Grid calculation, cable routing and subsidy application — before a single cable is pulled.',s:['Grid calculation','Cable route study','ISDE & EIA application']},
     es:{tag:'Ingeniería',n:'Asesoría e ingeniería',d:'Cálculo de red, trazado de cable y solicitud de subvención — antes de tirar un solo cable.',s:['Cálculo de red','Estudio de trazado','Solicitud ISDE y EIA']}}
  ];

export const services: Service[] = raw.map((s) => ({
  image: s.img,
  nl: { tag: s.nl.tag, name: s.nl.n, description: s.nl.d, specs: s.nl.s },
  en: { tag: s.en.tag, name: s.en.n, description: s.en.d, specs: s.en.s },
  es: { tag: s.es.tag, name: s.es.n, description: s.es.d, specs: s.es.s },
}));

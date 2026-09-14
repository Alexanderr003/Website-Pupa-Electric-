import 'server-only';
import { dictionaries, type Dictionary } from './dictionaries';
import { uiDictionaries, type UiDictionary } from './ui';
import type { Locale } from './config';

export type FullDictionary = Dictionary & UiDictionary;

/** One `t` for the whole app: marketing copy plus interface strings. */
export function getDictionary(locale: Locale): FullDictionary {
  return { ...dictionaries[locale], ...uiDictionaries[locale] };
}

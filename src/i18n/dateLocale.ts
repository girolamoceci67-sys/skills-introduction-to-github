import { ar, enUS, es, fr, it, ja, pt, ru, zhCN } from 'date-fns/locale';
import type { Locale } from 'date-fns';

const DATE_FNS_LOCALES: Record<string, Locale> = {
  en: enUS,
  es,
  it,
  zh: zhCN,
  pt,
  ar,
  ja,
  fr,
  ru,
};

export function dateFnsLocaleFor(languageCode: string): Locale {
  return DATE_FNS_LOCALES[languageCode] ?? enUS;
}

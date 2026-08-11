export interface SupportedLanguage {
  code: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

/** Le 7 lingue più parlate al mondo, mostrate nella schermata di selezione lingua. */
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', nativeName: 'English', flag: '🇬🇧', rtl: false },
  { code: 'zh', nativeName: '中文', flag: '🇨🇳', rtl: false },
  { code: 'es', nativeName: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'ar', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'pt', nativeName: 'Português', flag: '🇵🇹', rtl: false },
  { code: 'ja', nativeName: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'it', nativeName: 'Italiano', flag: '🇮🇹', rtl: false },
];

export const DEFAULT_LANGUAGE_CODE = 'en';

export function isSupportedLanguageCode(code: string): boolean {
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
}

export function isRtlLanguage(code: string): boolean {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code)?.rtl ?? false;
}

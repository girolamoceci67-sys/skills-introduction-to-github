import { I18nManager } from 'react-native';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import { DEFAULT_LANGUAGE_CODE, SUPPORTED_LANGUAGES, isSupportedLanguageCode, isRtlLanguage } from './languages';
import { getStoredLanguage, setStoredLanguage } from './storage';
import ar from './locales/ar';
import en from './locales/en';
import es from './locales/es';
import it from './locales/it';
import ja from './locales/ja';
import pt from './locales/pt';
import zh from './locales/zh';

const resources = {
  en: { translation: en },
  es: { translation: es },
  it: { translation: it },
  zh: { translation: zh },
  pt: { translation: pt },
  ar: { translation: ar },
  ja: { translation: ja },
};

function deviceLanguageCode(): string {
  const [locale] = Localization.getLocales();
  return locale?.languageCode ?? DEFAULT_LANGUAGE_CODE;
}

let initPromise: Promise<void> | null = null;

/** Inizializza i18next una sola volta, con la lingua salvata (o quella del dispositivo come primo tentativo). */
export function initI18n(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const stored = await getStoredLanguage();
    const deviceCode = deviceLanguageCode();
    const initialLanguage = stored ?? (isSupportedLanguageCode(deviceCode) ? deviceCode : DEFAULT_LANGUAGE_CODE);

    await i18next.use(initReactI18next).init({
      resources,
      lng: initialLanguage,
      fallbackLng: DEFAULT_LANGUAGE_CODE,
      supportedLngs: SUPPORTED_LANGUAGES.map((lang) => lang.code),
      interpolation: { escapeValue: false },
      compatibilityJSON: 'v4',
    });

    applyTextDirection(initialLanguage);
  })();

  return initPromise;
}

/**
 * Applica il verso del testo per l'arabo (RTL). Su nativo, il mirroring completo del
 * layout richiede un riavvio dell'app: I18nManager registra la preferenza, ma non
 * ribalta una UI già montata. Il contenuto testuale resta comunque corretto subito.
 */
function applyTextDirection(code: string): void {
  const rtl = isRtlLanguage(code);
  if (I18nManager.isRTL !== rtl) {
    I18nManager.allowRTL(rtl);
    I18nManager.forceRTL(rtl);
  }
}

export async function changeLanguage(code: string): Promise<void> {
  await i18next.changeLanguage(code);
  await setStoredLanguage(code);
  applyTextDirection(code);
}

export async function hasStoredLanguage(): Promise<boolean> {
  return (await getStoredLanguage()) !== null;
}

export default i18next;

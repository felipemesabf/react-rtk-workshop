import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import lg1 from "./app/en.json";

interface Language {
  value: string;
  label: string;
}

type SupportedLanguage = {
  [index: string]: Language;
};

export const supportedLanguages: SupportedLanguage = {
  en: {
    value: "en",
    label: "English",
  },
  es: {
    value: "es",
    label: "Español",
  },
  fr: {
    value: "fr",
    label: "Français",
  },
};

interface Namespaces {
  app: typeof lg1.app;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: keyof Namespaces;
    resources: Namespaces;
  }
}

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      app: lg1.app,
    },
  },
});

export const loadLanguage = async (language: string, namespace: string) => {
  if (i18n.hasResourceBundle(language, namespace)) {
    return i18n.changeLanguage(language);
  }

  const locale = await import(`./${namespace}/${language}.json`);
  i18n.addResourceBundle(language, namespace, locale[`${namespace}`]);
  return i18n.changeLanguage(language);
};

export default i18n;

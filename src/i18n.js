import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translationFA from "./locales/fa/translation.json";
import translationSV from "./locales/sv/translation.json";

export const SUPPORTED_LOCALES = [
  {
    code: "fa",
    name: "فارسی",
  },
  {
    code: "sv",
    name: "Svenska",
  },
];

const resources = {
  fa: { translation: translationFA },
  sv: { translation: translationSV },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources,
    lng: "sv",

    keySeparator: false,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  });

export default i18n;

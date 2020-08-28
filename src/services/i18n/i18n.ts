import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from '../../assets/translations.json';

const resources = translations;

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    keySeparator: false,
    debug: process.env.NODE_ENV === 'production' ? false : true,
    interpolation: {
      escapeValue: false,
    },
  });

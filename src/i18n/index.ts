import de from './de.json';
import en from './en.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb: Function) => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources = {
  en,
  de,
};

i18n.use(languageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  resources,
});

export default i18n;

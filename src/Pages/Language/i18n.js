import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Load translation files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Default language
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome to our website",
          language: "Language",
        }
      },
      bn: {
        translation: {
          welcome: "আমাদের ওয়েবসাইটে স্বাগতম",
          language: "ভাষা",
        }
      },
      ar: {
        translation: {
          welcome: "مرحبًا بك في موقعنا",
          language: "لغة",
        }
      }
    }
  });

export default i18n;

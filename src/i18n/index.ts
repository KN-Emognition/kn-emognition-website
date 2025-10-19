import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'

import en from './locales/en.json'
import pl from './locales/pl.json'

void i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  lng: 'pl',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next

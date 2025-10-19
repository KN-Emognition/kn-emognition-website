import { useTranslation } from 'react-i18next'
export const useLang = () =>
  (useTranslation().i18n.language?.startsWith('pl') ? 'pl' : 'en') as 'en' | 'pl'
export const pick = <T extends Record<'en' | 'pl', string>>(x: T, lang: 'en' | 'pl') =>
  x[lang] ?? x.en

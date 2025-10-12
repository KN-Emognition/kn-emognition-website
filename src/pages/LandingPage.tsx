import { useTranslation } from 'react-i18next'

const LandingPage = () => {
  const { t } = useTranslation()

  return (
    <section className="page">
      <h1>{t('pages.landing.heading')}</h1>
      <p className="page-lead">{t('pages.landing.lead')}</p>
      <p className="page-cta">{t('pages.landing.cta')}</p>
    </section>
  )
}

export default LandingPage

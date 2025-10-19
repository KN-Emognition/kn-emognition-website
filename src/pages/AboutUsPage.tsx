import { useTranslation } from 'react-i18next'

const AboutUsPage = () => {
  const { t } = useTranslation()

  return (
    <section className="full-height flex flex-column justify-content-center align-items-center bg-blue-200">
      <div>
        <h1>{t('pages.aboutus.heading')}</h1>
        <p className="page-lead">{t('pages.aboutus.lead')}</p>
      </div>
    </section>
  )
}

export default AboutUsPage

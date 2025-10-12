import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <section className="page">
      <h1>{t('pages.notFound.heading')}</h1>
      <p className="page-lead">{t('pages.notFound.lead')}</p>
    </section>
  )
}

export default NotFoundPage

import { useTranslation } from 'react-i18next'

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <section className="hero full-height flex flex-column justify-content-center align-items-center bg-blue-100">
      <div className="content">
        <h1>{t('pages.contact.heading')}</h1>
        <p className="page-lead">{t('pages.contact.lead')}</p>
      </div>
    </section>
  )
}

export default ContactPage

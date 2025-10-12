import { useTranslation } from 'react-i18next'

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <section className="page">
      <h1>{t('pages.contact.heading')}</h1>
      <p className="page-lead">{t('pages.contact.lead')}</p>
    </section>
  )
}

export default ContactPage

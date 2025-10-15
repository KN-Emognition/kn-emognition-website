import { useTranslation } from 'react-i18next'

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <section className="h-screen flex flex-column justify-content-center align-items-center bg-blue-100">
      <h1>{t('pages.contact.heading')}</h1>
      <p className="page-lead">{t('pages.contact.lead')}</p>
    </section>
  )
}

export default ContactPage

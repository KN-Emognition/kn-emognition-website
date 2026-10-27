import { useTranslation } from 'react-i18next'

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <section id="contact" className="section">
      <div className="container reveal">
        <span className="eyebrow">{t('navigation.contact')}</span>
        <h2>{t('pages.contact.heading')}</h2>
        <p className="lead" style={{ marginTop: '1rem' }}>
          {t('pages.contact.lead')}
        </p>
        <a className="contact-mail" href="mailto:kn.emognition@pwr.edu.pl">
          <i className="pi pi-envelope" aria-hidden="true" />
          kn.emognition@pwr.edu.pl
        </a>
      </div>
    </section>
  )
}

export default ContactPage

import { useTranslation } from 'react-i18next'

const RecruitmentPage = () => {
  const { t } = useTranslation()

  return (
    <section id="recruitment" className="section">
      <div className="container">
        <div className="cta-band reveal">
          <span className="eyebrow">{t('navigation.recruitment')}</span>
          <h2>{t('pages.recruitment.heading')}</h2>
          <p className="lead">{t('pages.recruitment.lead')}</p>
          <p className="lead">{t('pages.recruitment.lead2')}</p>
          <div className="cta-band__actions">
            <a
              href="https://forms.gle/Krsdrks1zFMcaMmVA"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="pi pi-pen-to-square" aria-hidden="true" />
              {t('pages.recruitment.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecruitmentPage

import { useTranslation } from 'react-i18next'

const pillars = [
  { key: 'interdisciplinarity', icon: 'pi pi-share-alt', color: 'var(--violet)' },
  { key: 'creativity', icon: 'pi pi-lightbulb', color: 'var(--amber)' },
  { key: 'cooperation', icon: 'pi pi-users', color: 'var(--teal)' },
] as const

const AboutUsPage = () => {
  const { t } = useTranslation()

  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="reveal">
          <span className="eyebrow">{t('navigation.about')}</span>
          <h2>{t('pages.aboutus.heading')}</h2>
          <p className="about-text" style={{ marginTop: '1.25rem' }}>
            {t('pages.aboutus.lead')}
          </p>
        </div>
        <div className="pillars">
          {pillars.map((p) => (
            <div
              key={p.key}
              className="pillar reveal"
              style={{ '--c': p.color } as React.CSSProperties}
            >
              <i className={p.icon} aria-hidden="true" />
              <div>
                <h3>{t(`pages.aboutus.pillars.${p.key}.title`)}</h3>
                <p>{t(`pages.aboutus.pillars.${p.key}.text`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUsPage

import TeamSection from '@/components/TeamSection'
import { useTranslation } from 'react-i18next'

const TeamPage = () => {
  const { t } = useTranslation()

  return (
    <section id="team" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t('navigation.team')}</span>
          <h2>{t('pages.team.heading')}</h2>
          <p className="lead">{t('pages.team.lead')}</p>
        </div>
        <TeamSection />
      </div>
    </section>
  )
}

export default TeamPage

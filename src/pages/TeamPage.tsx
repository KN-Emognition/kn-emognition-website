import TeamSection from '@/components/TeamSection'
import { useTranslation } from 'react-i18next'

const TeamPage = () => {
  const { t } = useTranslation()

  return (
    <section
      id="team-section"
      className="flex flex-column justify-content-center align-items-center gap-3 py-5 min-full-height emognition-gradient px-4"
    >
      <div className="flex flex-column flex-wrap justify-center align-items-center text-center">
        <h1>{t('pages.team.heading')}</h1>
        <p className="page-lead">{t('pages.team.lead')}</p>
      </div>
      <TeamSection />
    </section>
  )
}

export default TeamPage

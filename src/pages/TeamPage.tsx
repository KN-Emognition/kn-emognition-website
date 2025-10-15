import { useTranslation } from 'react-i18next'

const TeamPage = () => {
  const { t } = useTranslation()

  return (
    <section className="h-screen flex flex-column justify-content-center align-items-center bg-blue-200">
      <h1>{t('pages.team.heading')}</h1>
      <p className="page-lead">{t('pages.team.lead')}</p>
    </section>
  )
}

export default TeamPage

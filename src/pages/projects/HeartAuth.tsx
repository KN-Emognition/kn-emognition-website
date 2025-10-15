import { useTranslation } from 'react-i18next'

const ProjectsPage = () => {
  const { t } = useTranslation()

  return (
    <section className="h-screen page flex flex-column justify-content-center align-items-center">
      <h1>{t('pages.projects.heading')}</h1>
      <p className="page-lead">{t('pages.projects.lead')}</p>
    </section>
  )
}

export default ProjectsPage

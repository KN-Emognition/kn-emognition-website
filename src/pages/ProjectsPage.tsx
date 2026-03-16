import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ProjectsPage = () => {
  const { t } = useTranslation()

  const projectKeys = ['heartauth', 'resqvoice', 'psychotherapy']

  return (
    <section className="page">
      <h1>{t('pages.projects.heading')}</h1>
      <p className="page-lead">{t('pages.projects.lead')}</p>

      <div className="grid grid-nogutter mt-4">
        {projectKeys.map((key) => (
          <div key={key} className="col-12 md:col-4 px-3 mb-4">
            <Link to={`/projects/${key}`} className="card p-4 h-full block">
              <h2 className="text-xl font-semibold">{t(`pages.projects.${key}.title`)}</h2>
              <p className="mt-2 text-sm">{t(`pages.projects.${key}.short_description`)}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage

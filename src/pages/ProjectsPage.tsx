import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'

const ProjectsPage = () => {
  const { t } = useTranslation()

  return (
    <section className="section page-top">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('navigation.projects')}</span>
          <h1>{t('pages.projects.heading')}</h1>
          <p className="lead">{t('pages.projects.lead')}</p>
        </div>

        <div className="project-grid">
          {projects.map(({ key, icon, accent }) => (
            <Link
              key={key}
              to={`/projects/${key}`}
              className="card card--interactive project-card reveal"
              style={{ '--accent': accent } as React.CSSProperties}
            >
              <span className="project-card__icon">
                <i className={icon} aria-hidden="true" />
              </span>
              <h3>{t(`pages.projects.${key}.title`)}</h3>
              <p>{t(`pages.projects.${key}.short_description`)}</p>
              <span className="project-card__more">
                {t('pages.projects.more')} <i className="pi pi-arrow-right" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsPage

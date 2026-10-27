import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { ProjectKey } from '@/data/projects'

interface Props {
  projectKey: ProjectKey
  image?: string
  extra?: ReactNode
}

/** Shared layout for all project detail pages. */
const ProjectDetail = ({ projectKey, image, extra }: Props) => {
  const { t } = useTranslation()
  const base = `pages.projects.${projectKey}`
  const paragraphs = t(`${base}.description`).split(/\n{2,}/)
  const repo = t(`${base}.repo`)

  return (
    <section className="section page-top">
      <div className="container">
        <Link to="/projects" className="back-link">
          <i className="pi pi-arrow-left" aria-hidden="true" />
          {t('pages.projects.back')}
        </Link>
        <div className="section-head">
          <span className="eyebrow">{t('navigation.projects')}</span>
          <h1>{t(`${base}.title`)}</h1>
          <p className="lead">{t(`${base}.short_description`)}</p>
        </div>

        {extra}

        <div className={`project-detail${image ? ' project-detail--with-image' : ''}`}>
          {image && (
            <div className="project-detail__image reveal">
              <img src={image} alt={t(`${base}.title`)} loading="lazy" />
            </div>
          )}
          <div className="project-detail__body reveal">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {repo && (
              <a
                href={repo}
                className="btn btn-ghost"
                style={{ justifySelf: 'start' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="pi pi-github" aria-hidden="true" />
                Repository
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail

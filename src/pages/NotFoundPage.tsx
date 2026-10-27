import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <section className="not-found">
      <div>
        <div className="not-found__code text-gradient" aria-hidden="true">
          404
        </div>
        <h1>{t('pages.notFound.heading')}</h1>
        <p className="lead">{t('pages.notFound.lead')}</p>
        <Link to="/" className="btn btn-primary">
          <i className="pi pi-home" aria-hidden="true" />
          {t('pages.notFound.cta')}
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage

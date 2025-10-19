import { useTranslation } from 'react-i18next'

const RecruitmentPage = () => {
  const { t } = useTranslation()

  return (
    <section className="hero  full-height flex flex-column justify-content-center align-items-center bg-red-200">
      <div className="content">
        <h1>{t('pages.recruitment.heading')}</h1>
        <p className="page-lead">{t('pages.recruitment.lead')}</p>
      </div>
    </section>
  )
}

export default RecruitmentPage

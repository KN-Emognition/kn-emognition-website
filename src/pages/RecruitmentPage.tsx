import { useTranslation } from 'react-i18next'

const RecruitmentPage = () => {
  const { t } = useTranslation()

  return (
    <section className="page">
      <h1>{t('pages.recruitment.heading')}</h1>
      <p className="page-lead">{t('pages.recruitment.lead')}</p>
    </section>
  )
}

export default RecruitmentPage

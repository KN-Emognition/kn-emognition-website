import { useTranslation } from 'react-i18next'

const RecruitmentPage = () => {
  const { t } = useTranslation()

  return (
    <section className="h-screen flex flex-column justify-content-center align-items-center bg-red-200">
      <h1>{t('pages.recruitment.heading')}</h1>
      <p className="page-lead">{t('pages.recruitment.lead')}</p>
    </section>
  )
}

export default RecruitmentPage

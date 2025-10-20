import { useTranslation } from 'react-i18next'
import { Card } from 'primereact/card'

const RecruitmentPage = () => {
  const { t } = useTranslation()

  return (
    <section className="h-screen flex flex-column justify-content-center align-items-center text-center w-screen">
      <div className="content flex align-items-center justify-content-center">
        <Card className="w-11 lg:w-8 bg-black-alpha-30 text-white p-1 lg:p-5">
          <h1 className="text-xl lg:text-5xl">{t('pages.recruitment.heading')}</h1>
          <h2 className="text-sm lg:text-xl page-lead font-normal py-3 lg:py-5 text-justify">
            {t('pages.recruitment.lead')}
          </h2>
          <h2 className="text-sm lg:text-xl page-lead font-normal pb-3 lg:pb-5 text-justify">
            {t('pages.recruitment.lead2')}
          </h2>
          <a
            href="https://forms.gle/Krsdrks1zFMcaMmVA"
            className="p-button bg-white-alpha-10 border-white-alpha-30 scale-on-hover"
          >
            <span className="p-button-icon pi pi-pen-to-square" aria-hidden="true" />
            <div className="pl-2">{t('pages.recruitment.cta')}</div>
          </a>
        </Card>
      </div>
    </section>
  )
}

export default RecruitmentPage

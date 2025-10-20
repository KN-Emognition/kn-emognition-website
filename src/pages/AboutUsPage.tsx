import { useTranslation } from 'react-i18next'
import { Card } from 'primereact/card'

const AboutUsPage = () => {
  const { t } = useTranslation()

  return (
    <section className="hero-aboutus h-screen flex flex-column justify-content-center align-items-center text-center w-screen">
      <div className="content flex align-items-center justify-content-center w-full">
        <Card className="w-12 lg:w-8 bg-black-alpha-20 text-white w-full p-1 lg:p-5">
          <h1 className="text-xl lg:text-5xl">{t('pages.aboutus.heading')}</h1>
          <h2 className="text-sm lg:text-xl page-lead pt-5 text-justify font-normal">
            {t('pages.aboutus.lead')}
          </h2>
        </Card>
      </div>
    </section>
  )
}

export default AboutUsPage

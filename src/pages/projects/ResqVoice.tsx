import { useTranslation } from 'react-i18next'

const ResqVoicePage = () => {
  const { t } = useTranslation()
  const photo = t('pages.projects.resqvoice.photo')

  return (
    <section className="lg:h-screen w-screen page navbar-padding flex flex-column justify-content-center align-items-center pb-5">
      <div className="text-center pt-5">
        <h1>{t('pages.projects.resqvoice.title')}</h1>
        <h2 className="font-normal text-xl lg:text-2xl">
          {t('pages.projects.resqvoice.short_description')}
        </h2>
      </div>
      <div className="flex flex-column lg:flex-row flex-1 justify-content-around align-items-center lg:align-items-start px-3 lg:px-0">
        {photo ? (
          <div className="flex flex-row align-items-center justify-content-center w-12 lg:w-4">
            <img src={photo} alt="resqvoice" className="w-8 lg:w-10" />
          </div>
        ) : null}
        <div className="w-12 lg:w-6 lg:pt-8">
          <h2 className="font-normal text-xl lg:text-2xl lg:pt-8 text-justify">
            {t('pages.projects.resqvoice.description')}
          </h2>
        </div>
        <div></div>
      </div>
    </section>
  )
}

export default ResqVoicePage

import { useTranslation } from 'react-i18next'
import hauthImage from '@/assets/img/projects/heartauth/hauth-2.png'

const ProjectsPage = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:h-screen w-screen page navbar-padding flex flex-column justify-content-center align-items-center pb-5">
      <div className="text-center pt-5">
        <h1>{t('pages.projects.heartauth.title')}</h1>
        <h2 className="font-normal text-xl lg:text-2xl">
          {t('pages.projects.heartauth.short_description')}
        </h2>
      </div>
      <div className="flex flex-column lg:flex-row flex-1 justify-content-around align-items-center lg:align-items-start px-3 lg:px-0">
        <div className="flex flex-row align-items-center justify-content-center w-12 lg:w-4">
          <img src={hauthImage} alt="hauth" className="w-8 lg:w-10" />
        </div>
        <div className="w-12 lg:w-6 lg:pt-8">
          <h2 className="font-normal text-xl lg:text-2xl lg:pt-8 text-justify">
            {t('pages.projects.heartauth.description')}
          </h2>
        </div>
        <div></div>
      </div>
    </section>
  )
}

export default ProjectsPage

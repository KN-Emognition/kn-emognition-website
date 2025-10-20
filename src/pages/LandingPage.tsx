import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import logoSmall from '@/assets/img/logo-small.svg'

const LandingPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleScroll = () => {
    navigate('/about')
  }

  return (
    <section className="h-screen flex flex-column justify-content-center align-items-center fadein animation-duration-1500 transition-ease-in w-screen">
      <div className="flex flex-1 flex-column justify-content-center align-items-center text-center">
        <img src={logoSmall} className="w-10rem lg:w-20rem" alt="logo" />
        <h1 className="text-2xl lg:text-5xl">{t('pages.landing.heading')}</h1>
        <h2 className="text-xl lg:text-xl font-italic font-normal">{t('pages.landing.lead')}</h2>
      </div>
      <div onClick={handleScroll} className="cursor-pointer">
        <div className="flex flex-column align-items-center text-white pb-5 lg:pb-2 gap-1 lg:gap-3 move-down-on-hover">
          <p className="text-lg mb-1 font-bold">{t('pages.landing.cta')}</p>
          <i className="text-2xl mb-3 text-white pi pi-arrow-down"></i>
        </div>
      </div>
    </section>
  )
}

export default LandingPage

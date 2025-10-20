import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Element, scroller } from 'react-scroll'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css'
import LandingPage from './pages/LandingPage.tsx'
import TeamPage from './pages/TeamPage.tsx'
import RecruitmentPage from './pages/RecruitmentPage.tsx'
import AboutUsPage from './pages/AboutUsPage.tsx'
import ContactPage from '@/pages/ContactPage.tsx'

export function ScrollLayout() {
  const location = useLocation()

  useEffect(() => {
    const getNavbarHeight = () => {
      const cssVar = getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-height')
        .trim()
      if (cssVar) {
        const px = parseInt(cssVar.replace('px', ''), 10)
        if (!isNaN(px)) return px
      }
      const nav = document.querySelector('#site-navbar') as HTMLElement | null
      return nav ? nav.offsetHeight : 0
    }

    const offset = -getNavbarHeight()

    console.log(`Scrolling to section: ${location.pathname}, with offset: ${offset}`)

    const section = location.pathname.replace('/', '') || 'home'
    scroller.scrollTo(section, {
      duration: 600,
      smooth: 'easeInOutQuart',
      // offset: offset,
      offset: 0,
    })
  }, [location])

  return (
    <>
      <Element name="home" className="min-full-height">
        <LandingPage />
      </Element>
      <Element name="about" className="min-full-height">
        <AboutUsPage />
      </Element>
      <Element name="team" className="min-full-height">
        <TeamPage />
      </Element>
      <hr className="w-10 border-t-2 border-gray-200 my-3" />
      <Element name="recruitment" className="min-full-height">
        <RecruitmentPage />
      </Element>
      <Element name="contact" className="min-full-height">
        <ContactPage />
      </Element>
    </>
  )
}

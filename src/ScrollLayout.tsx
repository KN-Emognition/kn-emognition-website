import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Element, scroller } from 'react-scroll'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css'
import LandingPage from './pages/LandingPage.tsx'
import Navbar from './components/Navbar.tsx'
import ContactPage from './pages/ContactPage.tsx'
import TeamPage from './pages/TeamPage.tsx'
import RecruitmentPage from './pages/RecruitmentPage.tsx' // flex

export function ScrollLayout() {
  const location = useLocation()

  useEffect(() => {
    const section = location.pathname.replace('/', '') || 'home'
    scroller.scrollTo(section, {
      duration: 600,
      smooth: 'easeInOutQuart',
      offset: 0,
    })
  }, [location])

  return (
    <>
      <Navbar />
      <Element name="home">
        <LandingPage />
      </Element>
      <Element name="team">
        <TeamPage />
      </Element>
      <Element name="recruitment">
        <RecruitmentPage />
      </Element>
      <Element name="contact">
        <ContactPage />
      </Element>
    </>
  )
}

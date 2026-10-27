import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import TeamPage from './pages/TeamPage.tsx'
import RecruitmentPage from './pages/RecruitmentPage.tsx'
import AboutUsPage from './pages/AboutUsPage.tsx'
import ContactPage from '@/pages/ContactPage.tsx'

/** One-page layout: each route (/, /about, /team …) scrolls to its section. */
export function ScrollLayout() {
  const { pathname, key } = useLocation()

  useEffect(() => {
    const id = pathname.replace('/', '') || 'home'
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [pathname, key])

  return (
    <>
      <LandingPage />
      <AboutUsPage />
      <TeamPage />
      <RecruitmentPage />
      <ContactPage />
    </>
  )
}

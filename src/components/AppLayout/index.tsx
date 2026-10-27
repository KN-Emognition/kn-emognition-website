import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useReveal } from '@/hooks/useReveal'

const SECTION_ROUTES = ['/', '/about', '/team', '/recruitment', '/contact']

const AppLayout = () => {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  // keep <html lang> and the document title in sync with the UI language
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? 'pl'
    document.title = t('app.title')
  }, [i18n.resolvedLanguage, t])

  // pages outside the one-page scroll start at the top
  useEffect(() => {
    if (!SECTION_ROUTES.includes(pathname)) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  useReveal([pathname, i18n.resolvedLanguage])

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        {t('navigation.skip')}
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout

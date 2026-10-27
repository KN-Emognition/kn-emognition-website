import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoWide from '@/assets/img/logo-wide.svg'
import { projects } from '@/data/projects'

const languages = ['pl', 'en'] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const currentLang = i18n.resolvedLanguage ?? i18n.language

  // publish the real navbar height for layout / scroll offsets
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const set = () =>
      document.documentElement.style.setProperty('--navbar-height', `${nav.offsetHeight}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? ' is-active' : ''}`

  const simpleLink = (to: string, label: string) => (
    <li>
      <NavLink to={to} className={linkClass}>
        {label}
      </NavLink>
    </li>
  )

  return (
    <nav ref={navRef} id="site-navbar" className="navbar" aria-label="Main">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="KN Emognition">
          <img src={logoWide} alt="KN Emognition" />
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={t('navigation.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`pi ${open ? 'pi-times' : 'pi-bars'}`} aria-hidden="true" />
        </button>

        <ul
          id="nav-links"
          className={`navbar__links${open ? ' is-open' : ''}`}
          onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
        >
          {simpleLink('/about', t('navigation.about'))}
          {simpleLink('/team', t('navigation.team'))}
          <li className="nav-dropdown">
            <NavLink to="/projects" end className={linkClass}>
              {t('navigation.projects')}
              <i className="pi pi-chevron-down" aria-hidden="true" />
            </NavLink>
            <ul className="nav-dropdown__menu">
              {projects.map((p) => (
                <li key={p.key}>
                  <NavLink to={`/projects/${p.key}`} className={linkClass}>
                    {t(`pages.projects.${p.key}.title`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          {simpleLink('/blog', t('navigation.blog'))}
          {simpleLink('/recruitment', t('navigation.recruitment'))}
          {simpleLink('/contact', t('navigation.contact'))}
          <li>
            <div className="lang-switch" role="group" aria-label={t('navigation.language')}>
              {languages.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  lang={lng}
                  aria-pressed={currentLang.startsWith(lng)}
                  onClick={() => void i18n.changeLanguage(lng)}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

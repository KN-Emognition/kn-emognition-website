import { useRef } from 'react'
import type { PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logoSmall from '@/assets/img/logo-small.svg'

const LandingPage = () => {
  const { t } = useTranslation()
  const artRef = useRef<HTMLDivElement>(null)

  // logo and glow drift slightly towards the pointer
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const art = artRef.current
    if (!art || e.pointerType !== 'mouse') return
    const r = art.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
    const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
    art.style.setProperty('--px', String(Math.max(-1, Math.min(1, dx * 2.5))))
    art.style.setProperty('--py', String(Math.max(-1, Math.min(1, dy * 2.5))))
  }

  return (
    <section id="home" className="hero" onPointerMove={onPointerMove}>
      <div className="container hero__grid">
        <div>
          <span className="eyebrow">{t('pages.landing.eyebrow')}</span>
          <h1>
            {t('pages.landing.heading_prefix')}{' '}
            <span className="text-gradient">{t('pages.landing.heading_brand')}</span>
          </h1>
          <p className="lead">{t('pages.landing.lead')}</p>
          <div className="hero__actions">
            <Link to="/projects" className="btn btn-primary">
              {t('pages.landing.cta_projects')}
              <i className="pi pi-arrow-right" aria-hidden="true" />
            </Link>
            <Link to="/recruitment" className="btn btn-ghost">
              {t('pages.landing.cta_join')}
            </Link>
          </div>
        </div>
        <div ref={artRef} className="hero__art" aria-hidden="true">
          <div className="orb orb--glow" />
          <div className="orb" />
          <img src={logoSmall} alt="" width="256" height="256" />
        </div>
      </div>
      <Link to="/about" className="scroll-hint" aria-label={t('pages.landing.cta')}>
        <i className="pi pi-arrow-down" />
      </Link>
    </section>
  )
}

export default LandingPage

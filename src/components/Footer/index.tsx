import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoWide from '@/assets/img/logo-wide.svg'
import { projects } from '@/data/projects'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <img src={logoWide} alt="KN Emognition" />
            <p>{t('pages.landing.lead')}</p>
          </div>
          <div>
            <h4>{t('footer.explore')}</h4>
            <ul>
              <li>
                <Link to="/about">{t('navigation.about')}</Link>
              </li>
              <li>
                <Link to="/team">{t('navigation.team')}</Link>
              </li>
              <li>
                <Link to="/blog">{t('navigation.blog')}</Link>
              </li>
              <li>
                <Link to="/recruitment">{t('navigation.recruitment')}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t('navigation.projects')}</h4>
            <ul>
              {projects.map((p) => (
                <li key={p.key}>
                  <Link to={`/projects/${p.key}`}>{t(`pages.projects.${p.key}.title`)}</Link>
                </li>
              ))}
              <li>
                <a href="mailto:kn.emognition@pwr.edu.pl">kn.emognition@pwr.edu.pl</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          © {new Date().getFullYear()} KN Emognition. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}

export default Footer

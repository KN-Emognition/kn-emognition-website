import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'

const AppLayout = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language

  return (
    <div>
      <header>
        <h1>{t('app.title')}</h1>
        <div>
          <button
            type="button"
            onClick={() => void i18n.changeLanguage('en')}
            disabled={currentLanguage === 'en'}
          >
            {t('app.switchToEnglish')}
          </button>
          <button
            type="button"
            onClick={() => void i18n.changeLanguage('pl')}
            disabled={currentLanguage === 'pl'}
          >
            {t('app.switchToPolish')}
          </button>
        </div>
      </header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              {t('navigation.home')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/zespol">{t('navigation.team')}</NavLink>
          </li>
          <li>
            <NavLink to="/projekty">{t('navigation.projects')}</NavLink>
          </li>
          <li>
            <NavLink to="/rekrutacja">{t('navigation.recruitment')}</NavLink>
          </li>
          <li>
            <NavLink to="/kontakt">{t('navigation.contact')}</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout

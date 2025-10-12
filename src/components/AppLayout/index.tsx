import { useTranslation } from 'react-i18next'
import { NavLink, Route, Routes } from 'react-router-dom'
import { appRoutes, navigationRoutes } from '../../router'

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
          {navigationRoutes.map(({ path, labelKey, end }) => (
            <li key={path}>
              <NavLink to={path} end={end}>
                {t(labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default AppLayout

import { useTranslation } from 'react-i18next'
import { NavLink, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { appRoutes, navigationRoutes } from './router/routes.tsx'

function App() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language
  return (
    <div className="app-shell">
      <header className="app-header">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <div className="header-content">
          <h1 className="app-title">{t('app.title')}</h1>
          <div className="language-switch">
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
        </div>
      </header>
      <nav className="app-nav">
        {navigationRoutes.map(({ path, labelKey, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>
      <main className="app-main">
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App

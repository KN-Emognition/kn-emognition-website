import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language

  return (
    <>
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('app.title')}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t('app.countLabel', { count })}
        </button>
        <p>
          {t('app.editHint', { file: 'src/App.tsx' })}
        </p>
      </div>
      <p className="read-the-docs">
        {t('app.docsHint')}
      </p>
    </>
  )
}

export default App

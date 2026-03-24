import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './i18n'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('lang') || 'pt-BR' } catch { return 'pt-BR' }
  })
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('theme') || 'dark'
      document.documentElement.setAttribute('data-theme', saved)
      return saved
    } catch { return 'dark' }
  })
  const t = translations[lang]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function setLang(l) {
    try { localStorage.setItem('lang', l) } catch {}
    setLangState(l)
  }

  function setTheme(t) {
    try { localStorage.setItem('theme', t) } catch {}
    setThemeState(t)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, theme, setTheme }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)

import { useState } from 'react'
import { useLang } from '../LanguageContext'
import './NavBar.css'

export default function NavBar() {
  const { lang, setLang } = useLang()
  const isPt = lang === 'pt-BR'
  const [menuOpen, setMenuOpen] = useState(false)

  const links = isPt
    ? [
        { label: 'Grupo C',   href: '#grupo' },
        { label: 'Escalação', href: '#escalacao' },
        { label: 'Elenco',    href: '#elenco' },
        { label: 'Técnico',   href: '#tecnico' },
        { label: 'História',  href: '#historia' },
      ]
    : [
        { label: 'Group C', href: '#grupo' },
        { label: 'Lineup',  href: '#escalacao' },
        { label: 'Squad',   href: '#elenco' },
        { label: 'Coach',   href: '#tecnico' },
        { label: 'History', href: '#historia' },
      ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-brand" onClick={closeMenu}>
          <img src="/cbf.svg" alt="CBF" className="navbar-logo" />
          <span className="navbar-title mono">
            {isPt ? 'Seleção Brasileira' : 'Brazil 2026'}
          </span>
        </a>

        <nav className="navbar-links" aria-label="Sections">
          {links.map(l => (
            <a key={l.href} href={l.href} className="navbar-link mono">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="navbar-right">
          <button
            className="navbar-lang mono"
            onClick={() => { setLang(isPt ? 'en' : 'pt-BR'); closeMenu() }}
            aria-label={isPt ? 'Switch to English' : 'Mudar para Português'}
          >
            {isPt ? 'EN' : 'PT'}
          </button>

          <button
            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span className="hline" />
            <span className="hline" />
            <span className="hline" />
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <nav className={`navbar-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {links.map(l => (
          <a key={l.href} href={l.href} className="navbar-mobile-link mono" onClick={closeMenu}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

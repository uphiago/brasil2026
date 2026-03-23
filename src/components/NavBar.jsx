import { useLang } from '../LanguageContext'
import './NavBar.css'

export default function NavBar() {
  const { lang, setLang } = useLang()
  const isPt = lang === 'pt-BR'

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

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-brand">
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

        <button
          className="navbar-lang mono"
          onClick={() => setLang(isPt ? 'en' : 'pt-BR')}
          aria-label={isPt ? 'Switch to English' : 'Mudar para Português'}
        >
          {isPt ? 'EN' : 'PT'}
        </button>
      </div>
    </header>
  )
}

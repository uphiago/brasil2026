import { useLang } from '../LanguageContext'
import './Hero.css'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <div className="hero">
      <div className="hero-bg">
        <div className="hero-glow glow-verde" />
        <div className="hero-glow glow-amarelo" />
        <div className="hero-glow glow-azul" />
      </div>

      {/* diagonal flag stripe */}
      <div className="hero-stripe" />

      <div className="hero-content">
        <div className="hero-badge-wrap">
          <span className="hero-badge-dot" />
          <span className="hero-badge mono">{h.badge}</span>
          <span className="hero-badge-dot" />
        </div>

        <div className="hero-logo-wrap">
          <img src="/cbf.svg" alt="CBF" className="hero-logo" />
        </div>

        <h1 className="hero-title pixel">{h.title}</h1>
        <p className="hero-tagline">{h.tagline}</p>
        <p className="hero-sub">{h.sub}</p>

        <div className="hero-group-badge">
          <img className="hero-group-flag-img" src="https://flagcdn.com/br.svg" alt="Brazil" />
          <span className="hero-group-label mono">{h.group}</span>
          <div className="hero-group-flags">
            <img src="https://flagcdn.com/ma.svg" alt="Morocco" />
            <img src="https://flagcdn.com/ht.svg" alt="Haiti" />
            <img src="https://flagcdn.com/gb-sct.svg" alt="Scotland" />
          </div>
        </div>
      </div>

      <div className="hero-fade" />
      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </div>
  )
}

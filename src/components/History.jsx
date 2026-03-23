import { useLang } from '../LanguageContext'
import { selecao } from '../data/selecao'
import './History.css'

export default function History() {
  const { lang, t } = useLang()
  const h = t.history
  const { history } = selecao

  return (
    <section id="historia">
      <p className="section-label">{h.label}</p>
      <h2 className="section-title">{h.title} <span>{h.titleSpan}</span></h2>
      <p className="section-desc">{h.desc}</p>

      <div className="history-stars">
        {'★'.repeat(5).split('').map((_, i) => (
          <span key={i} className="history-star">★</span>
        ))}
      </div>

      <div className="history-timeline">
        {history.map((entry, i) => (
          <div key={i} className="history-item glass-card">
            <div className="history-year pixel">{entry.year}</div>
            <div className="history-divider" />
            <div className="history-info">
              <div className="history-location">
                <span className="history-location-label mono">{h.location}</span>
                <span className="history-location-val">
                  {lang === 'pt-BR' ? entry.locationPt : entry.locationEn}
                </span>
              </div>
              <div className="history-final">
                <span className="history-final-label mono">{h.final}</span>
                <span className="history-final-val">
                  {lang === 'pt-BR' ? entry.finalPt : entry.finalEn}
                </span>
              </div>
              <div className="history-hero">
                <span className="history-hero-label mono">{h.hero}</span>
                <span className="history-hero-val">
                  {lang === 'pt-BR' ? entry.heroPt : entry.heroEn}
                </span>
              </div>
            </div>
            <div className="history-num pixel">
              {'★'.repeat(i + 1)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

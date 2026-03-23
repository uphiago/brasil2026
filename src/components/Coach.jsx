import { useLang } from '../LanguageContext'
import { selecao } from '../data/selecao'
import './Coach.css'

export default function Coach() {
  const { lang, t } = useLang()
  const c = t.coach
  const { coach } = selecao

  const meta = [
    { label: c.nationality, val: lang === 'pt-BR' ? coach.nationalityPt : coach.nationalityEn },
    { label: c.born,        val: coach.born },
    { label: c.since,       val: coach.since },
    { label: c.formation,   val: coach.formation, highlight: true },
  ]

  return (
    <section>
      <p className="section-label">{c.label}</p>
      <h2 className="section-title">{c.title} <span>{c.titleSpan}</span></h2>
      <p className="section-desc">{c.desc}</p>

      <div className="coach-wrap">
        {/* avatar + name */}
        <div className="coach-identity glass-card">
          <div className="coach-avatar">
            <img src="/ancelotti.jpg" alt={coach.name} className="coach-avatar-img" />
          </div>
          <div>
            <p className="coach-role mono">{coach.club}</p>
            <h3 className="coach-name pixel">{coach.name}</h3>
          </div>
        </div>

        {/* meta grid */}
        <div className="coach-meta-grid">
          {meta.map((m, i) => (
            <div key={i} className="coach-meta-item glass-card">
              <span className="coach-meta-label mono">{m.label}</span>
              <span className={`coach-meta-val${m.highlight ? ' highlight' : ''}`}>{m.val}</span>
            </div>
          ))}
        </div>

        {/* style */}
        <div className="coach-style glass-card">
          <p className="coach-style-label mono">{c.style}</p>
          <p className="coach-style-text">
            {lang === 'pt-BR' ? coach.stylePt : coach.styleEn}
          </p>
        </div>

        {/* titles */}
        <div className="coach-titles glass-card">
          <p className="coach-titles-label mono">{c.titles}</p>
          <p className="coach-titles-text mono">
            {lang === 'pt-BR' ? coach.titlesPt : coach.titlesEn}
          </p>
        </div>
      </div>
    </section>
  )
}

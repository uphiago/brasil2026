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

  const stats = [
    { label: c.titles, val: coach.titles },
    { label: c.seasons, val: coach.seasons },
    { label: c.games, val: coach.games },
    { label: c.winRate, val: coach.winRate, highlight: true },
  ]

  return (
    <section id="tecnico">
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

        {/* stats */}
        <div className="coach-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="coach-stat-item glass-card">
              <span className="coach-stat-val">{s.val}</span>
              <span className="coach-stat-label mono">{s.label}</span>
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

        {/* palmares */}
        <div className="coach-titles glass-card">
          <p className="coach-titles-label mono">{c.palmares}</p>
          <p className="coach-titles-text mono">
            {coach.titlesList.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  )
}

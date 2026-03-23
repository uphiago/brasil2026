import { useState } from 'react'
import { useLang } from '../LanguageContext'
import { squad } from '../data/selecao'
import PlayerModal from './PlayerModal'
import './Squad.css'

const posGroup = pos => {
  if (pos === 'GK') return 'gk'
  if (['CB','RB','LB','SW'].includes(pos)) return 'def'
  if (['DM','CM','AM','MF','LM','RM'].includes(pos)) return 'mid'
  return 'fwd'
}

export default function Squad() {
  const { t } = useLang()
  const s = t.squad
  const [filter, setFilter] = useState('all')
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const filtered = filter === 'all' ? squad : squad.filter(p => posGroup(p.pos) === filter)
  const sorted = [...filtered].sort((a, b) => a.number - b.number)

  const filters = [
    { key: 'all', label: s.all },
    { key: 'gk',  label: s.gk },
    { key: 'def', label: s.def },
    { key: 'mid', label: s.mid },
    { key: 'fwd', label: s.fwd },
  ]

  return (
    <section>
      <p className="section-label">{s.label}</p>
      <h2 className="section-title">{s.title} <span>{s.titleSpan}</span></h2>
      <p className="section-desc">{s.desc}</p>

      <div className="squad-filters">
        {filters.map(f => (
          <button
            key={f.key}
            className={`squad-filter mono${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="squad-grid">
        {sorted.map(p => (
          <div 
            key={p.id} 
            className={`squad-card glass-card grp-${posGroup(p.pos)}`}
            onClick={() => setSelectedPlayer(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPlayer(p)}
          >
            <div className="squad-card-top">
              <span className="squad-number pixel">#{p.number}</span>
              <span className={`squad-pos mono grp-${posGroup(p.pos)}`}>
                {s.posNames[p.pos] || p.pos}
              </span>
            </div>
            <p className="squad-name">{p.name}</p>
            <div className="squad-bottom">
              <span className="squad-club mono">{p.club}</span>
              <span className="squad-age mono">{p.age} {s.age}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPlayer && (
        <PlayerModal 
          player={selectedPlayer} 
          onClose={() => setSelectedPlayer(null)} 
        />
      )}
    </section>
  )
}

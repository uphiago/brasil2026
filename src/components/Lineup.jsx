import { useLang } from '../LanguageContext'
import { selecao, squad } from '../data/selecao'
import './Lineup.css'

const roleColor = { gk: '#FFDF00', def: '#58a6ff', dm: '#009c3b', am: '#bc8cff', fwd: '#f85149' }

const getPlayerData = (id) => {
  const p = squad.find(s => s.id === id)
  return p || null
}

export default function Lineup() {
  const { t } = useLang()
  const l = t.lineup
  const { lineup } = selecao

  return (
    <section>
      <p className="section-label">{l.label}</p>
      <h2 className="section-title">{l.title} <span>{l.titleSpan}</span></h2>
      <p className="section-desc">{l.desc}</p>

      <div className="lineup-wrap">
        <div className="lineup-pitch">
          {/* pitch markings */}
          <div className="pitch-bg">
            <div className="pitch-center-line" />
            <div className="pitch-center-circle" />
            <div className="pitch-penalty-top" />
            <div className="pitch-penalty-bot" />
          </div>

          <div className="pitch-rows">
            {lineup.map((row, ri) => (
              <div key={ri} className={`pitch-row row-${row.role}`}>
                {row.players.map((p, pi) => {
                  const playerData = getPlayerData(p.id)
                  return (
                    <div key={pi} className="pitch-player">
                      <div
                        className="pitch-player-circle"
                        style={{ borderColor: roleColor[row.role], boxShadow: `0 0 12px ${roleColor[row.role]}33` }}
                      >
                        <span className="pitch-player-num" style={{ color: roleColor[row.role] }}>{p.number}</span>
                      </div>
                      <span className="pitch-player-name">{p.name}</span>
                      <span className="pitch-player-club mono">{p.club}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="pitch-formation-label mono">{selecao.coach.formation}</div>
        </div>
      </div>
    </section>
  )
}

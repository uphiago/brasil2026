import { useLang } from '../LanguageContext'
import { selecao, getPlayerImage } from '../data/selecao'
import './Lineup.css'

const roleColorDark  = { gk: '#F5C800', def: '#5BAFD4', dm: '#10B852', am: '#10B852', fwd: '#E0624E' }
const roleColorLight = { gk: '#7a5e00', def: '#2a80a8', dm: '#006e30', am: '#006e30', fwd: '#b84030' }

export default function Lineup() {
  const { t, theme } = useLang()
  const roleColor = theme === 'light' ? roleColorLight : roleColorDark
  const l = t.lineup
  const { lineup } = selecao

  return (
    <section id="escalacao">
      <p className="section-label">{l.label}</p>
      <h2 className="section-title">{l.title} <span>{l.titleSpan}</span></h2>
      <p className="section-desc">{l.desc}</p>

      <div className="lineup-wrap">
        <div className="lineup-pitch">
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
                  const imgUrl = getPlayerImage(p.id)
                  return (
                    <div key={pi} className="pitch-player">
                      <div
                        className="pitch-player-circle"
                        style={{ borderColor: roleColor[row.role], boxShadow: `0 0 12px ${roleColor[row.role]}33` }}
                      >
                        {imgUrl ? (
                          <img src={imgUrl} alt={p.name} className="pitch-player-img" />
                        ) : (
                          <span className="pitch-player-num" style={{ color: roleColor[row.role] }}>{p.number}</span>
                        )}
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

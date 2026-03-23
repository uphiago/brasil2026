import { useLang } from '../LanguageContext'
import { selecao } from '../data/selecao'
import './Group.css'

export default function Group() {
  const { lang, t } = useLang()
  const g = t.group
  const { group } = selecao
  const isPt = lang === 'pt-BR'

  return (
    <section id="grupo">
      <p className="section-label">{g.label}</p>
      <h2 className="section-title">{g.title} <span>{g.titleSpan}</span></h2>
      <p className="section-desc">{g.desc}</p>

      <div className="group-wrap">

        {/* ── left col: table + qualify note ── */}
        <div className="group-left">
          <div className="group-table glass-card">
            <div className="group-header">
              <span className="group-name-badge mono">Grupo {group.name}</span>
              <span className="group-ranking-badge mono">{g.ranking}</span>
            </div>
            <table className="group-tbl">
              <thead>
                <tr>
                  {g.tableHeader.map((h, i) => (
                    <th key={i} className={i === 0 ? 'th-team' : ''}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.teams.map((team, i) => (
                  <tr key={i} className={team.isBrasil ? 'row-brasil' : ''}>
                    <td className="td-team">
                      <img className="team-flag-img" src={team.flag} alt="" />
                      <div className="td-team-info">
                        <span className="team-name">{isPt ? team.namePt : team.nameEn}</span>
                        <span className="team-ranking mono">#{team.ranking}</span>
                      </div>
                    </td>
                    <td>—</td><td>—</td><td>—</td><td>—</td>
                    <td className="td-pts">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* qualification note */}
          <div className="group-qualify">
            <div className="qualify-row qualify-direct">
              <span className="qualify-icon">●</span>
              <span className="qualify-text mono">{g.qualify}</span>
            </div>
            <div className="qualify-row qualify-possible">
              <span className="qualify-icon">○</span>
              <span className="qualify-text mono">{g.thirdNote}</span>
            </div>
          </div>
        </div>

        {/* ── right col: matches ── */}
        <div className="group-matches">
          <p className="group-matches-title mono">{g.matchesTitle}</p>
          {group.matches.map((m, i) => (
            <div key={i} className="match-card glass-card">
              <div className="match-meta">
                <span className="match-date mono">{m.date}</span>
                <div className="match-times">
                  <span className="match-time mono">{m.time}</span>
                  <span className="match-time-brt mono">{m.timeBRT}</span>
                </div>
              </div>

              <div className="match-teams">
                <div className={`match-team${m.homeIsBrasil ? ' brasil' : ''}`}>
                  <img className="match-flag-img" src={m.homeFlag} alt="" />
                  <span className="match-tname">{isPt ? m.home : m.homeEn}</span>
                </div>
                <span className="match-vs mono">{g.vs}</span>
                <div className={`match-team right${m.awayIsBrasil ? ' brasil' : ''}`}>
                  <span className="match-tname">{isPt ? m.away : m.awayEn}</span>
                  <img className="match-flag-img" src={m.awayFlag} alt="" />
                </div>
              </div>

              <div className="match-footer">
                <span className="match-stadium mono">
                  {isPt ? m.stadiumPt : m.stadiumEn}
                </span>
                <span className="match-venue mono">
                  {isPt ? m.venuePt : m.venueEn}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

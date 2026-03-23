import { useLang } from '../LanguageContext'
import { selecao } from '../data/selecao'
import './Group.css'

export default function Group() {
  const { lang, t } = useLang()
  const g = t.group
  const { group } = selecao

  return (
    <section id="grupo">
      <p className="section-label">{g.label}</p>
      <h2 className="section-title">{g.title} <span>{g.titleSpan}</span></h2>
      <p className="section-desc">{g.desc}</p>

      <div className="group-wrap">
        {/* group table */}
        <div className="group-table glass-card">
          <div className="group-header">
            <span className="group-name-badge mono">Grupo {group.name}</span>
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
                <tr key={i} className={team.namePt === 'Brasil' ? 'row-brasil' : ''}>
                  <td className="td-team">
                    <img className="team-flag-img" src={team.flag} alt="" />
                    <span className="team-name">{lang === 'pt-BR' ? team.namePt : team.nameEn}</span>
                  </td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td className="td-pts">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* matches */}
        <div className="group-matches">
          <p className="group-matches-title mono">{g.matchesTitle}</p>
          {group.matches.map((m, i) => (
            <div key={i} className="match-card glass-card">
              <div className="match-meta">
                <span className="match-date mono">{m.date}</span>
                <span className="match-time mono">{m.time}</span>
                <span className="match-venue mono">
                  {lang === 'pt-BR' ? m.venuePt : m.venueEn}
                </span>
              </div>
              <div className="match-teams">
                <div className={`match-team ${(lang === 'pt-BR' ? m.home : m.homeEn) === 'Brasil' || (lang === 'pt-BR' ? m.home : m.homeEn) === 'Brazil' ? 'brasil' : ''}`}>
                  <img className="match-flag-img" src={m.homeFlag} alt="" />
                  <span className="match-tname">{lang === 'pt-BR' ? m.home : m.homeEn}</span>
                </div>
                <span className="match-vs mono">{g.vs}</span>
                <div className={`match-team right ${(lang === 'pt-BR' ? m.away : m.awayEn) === 'Brasil' || (lang === 'pt-BR' ? m.away : m.awayEn) === 'Brazil' ? 'brasil' : ''}`}>
                  <span className="match-tname">{lang === 'pt-BR' ? m.away : m.awayEn}</span>
                  <img className="match-flag-img" src={m.awayFlag} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

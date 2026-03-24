import { useState, useCallback } from 'react'
import { useLang } from '../LanguageContext'
import { getPlayerModalImage, lineupPlayerIds, playerDetails } from '../data/selecao'
import './PlayerModal.css'

const posGroup = pos => {
  if (pos === 'GK') return 'gk'
  if (['CB', 'RB', 'LB', 'SW'].includes(pos)) return 'def'
  if (['DM', 'CM', 'AM', 'MF', 'LM', 'RM'].includes(pos)) return 'mid'
  return 'fwd'
}

export default function PlayerModal({ player, onClose }) {
  const { lang, t } = useLang()
  const [exiting, setExiting] = useState(false)
  const s = t.squad
  const isPt = lang === 'pt-BR'

  const handleClose = useCallback(() => {
    setExiting(true)
    setTimeout(onClose, 220)
  }, [onClose])

  const posName = s.posNames[player.pos] || player.pos
  const bio = isPt ? player.bioPt : player.bioEn
  const imgSrc = getPlayerModalImage(player.id)
  const pg = posGroup(player.pos)
  const isStarter = lineupPlayerIds.has(player.id)
  const details = playerDetails[player.id]
  const isGK = player.pos === 'GK'
  const footLabel = isPt
    ? { R: 'Direito', L: 'Esquerdo', B: 'Ambos' }
    : { R: 'Right', L: 'Left', B: 'Both' }

  return (
    <div className={`modal-overlay${exiting ? ' exiting' : ''}`} onClick={handleClose} role="dialog" aria-modal="true" aria-label={player.name}>
      <div className={`modal-content glass-card grp-${pg}${exiting ? ' exiting' : ''}`} onClick={e => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label={isPt ? 'Fechar' : 'Close'}
        >
          ×
        </button>

        {/* ── side-by-side header ── */}
        <div className="modal-header">
          <div className={`modal-image-wrap grp-${pg}`}>
            <div className="modal-image-fallback" aria-hidden="true">
              <span className="modal-image-initials pixel">
                {player.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
              </span>
            </div>
            {imgSrc && (
              <img
                src={imgSrc}
                alt={player.name}
                className="modal-image"
                onError={e => { e.target.style.display = 'none' }}
              />
            )}
          </div>

          <div className="modal-identity">
            <div className="modal-badges">
              <span className={`modal-pos mono grp-${pg}`}>{posName}</span>
              {isStarter && (
                <span className="modal-starter-badge mono">{s.starter}</span>
              )}
            </div>
            <h3 className="modal-name pixel">{player.name}</h3>
            <div className="modal-club-row">
              <span className="modal-club mono">{player.club}</span>
              {details?.instagram && (
                <a
                  href={`https://instagram.com/${details.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-instagram mono"
                  aria-label="Instagram"
                >
                  @{details.instagram}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── stats + bio ── */}
        <div className="modal-body">

          {/* Brazil national team stats */}
          <div className="modal-stats">
            <div className="modal-stat">
              <span className="modal-stat-val">{player.caps}</span>
              <span className="modal-stat-label mono">Caps</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.brazilGoals}</span>
              <span className="modal-stat-label mono">{isPt ? 'Gols' : 'Goals'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.age} {s.age}</span>
              <span className="modal-stat-label mono">{isPt ? 'Idade' : 'Age'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.height}</span>
              <span className="modal-stat-label mono">{isPt ? 'Altura' : 'Height'}</span>
            </div>
          </div>

          {/* Season at club 2025-26 */}
          {details?.season && (
            <div className="modal-season">
              <span className="modal-season-club mono">2025-26 · {player.club}</span>
              <div className="modal-season-stats">
                <div className="modal-season-stat">
                  <span className="modal-season-val">{details.season.games}</span>
                  <span className="modal-season-key mono">{isPt ? 'Jogos' : 'Apps'}</span>
                </div>
                {isGK ? (
                  <div className="modal-season-stat">
                    <span className="modal-season-val">{details.season.cleanSheets}</span>
                    <span className="modal-season-key mono">{isPt ? 'S.F.J.' : 'Clean Sheets'}</span>
                  </div>
                ) : (
                  <>
                    <div className="modal-season-stat">
                      <span className="modal-season-val">{details.season.goals}</span>
                      <span className="modal-season-key mono">{isPt ? 'Gols' : 'Goals'}</span>
                    </div>
                    <div className="modal-season-stat">
                      <span className="modal-season-val">{details.season.assists}</span>
                      <span className="modal-season-key mono">{isPt ? 'Assist.' : 'Assists'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Quick details: origin, foot, market value */}
          {details && (
            <div className="modal-details-row">
              <div className="modal-detail">
                <span className="modal-detail-key mono">{isPt ? 'Origem' : 'From'}</span>
                <span className="modal-detail-val">{details.born}</span>
              </div>
              <div className="modal-detail">
                <span className="modal-detail-key mono">{isPt ? 'Pé' : 'Foot'}</span>
                <span className="modal-detail-val">{footLabel[details.foot] ?? details.foot}</span>
              </div>
              <div className="modal-detail">
                <span className="modal-detail-key mono">{isPt ? 'Valor' : 'Value'}</span>
                <span className="modal-detail-val">{details.market}</span>
              </div>
            </div>
          )}

          {/* Titles */}
          {details?.titles?.length > 0 && (
            <div className="modal-titles">
              <span className="modal-titles-label mono">{isPt ? 'Títulos' : 'Titles'}</span>
              <div className="modal-titles-list">
                {details.titles.map((title, i) => (
                  <span key={i} className="modal-title-tag mono">{title}</span>
                ))}
              </div>
            </div>
          )}

          {bio && (
            <div className="modal-bio-wrap">
              <p className="modal-bio">{bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { useLang } from '../LanguageContext'
import { getPlayerImage, lineupPlayerIds } from '../data/selecao'
import './PlayerModal.css'

const posGroup = pos => {
  if (pos === 'GK') return 'gk'
  if (['CB', 'RB', 'LB', 'SW'].includes(pos)) return 'def'
  if (['DM', 'CM', 'AM', 'MF', 'LM', 'RM'].includes(pos)) return 'mid'
  return 'fwd'
}

export default function PlayerModal({ player, onClose }) {
  const { lang, t } = useLang()
  const s = t.squad
  const isPt = lang === 'pt-BR'

  const posName = s.posNames[player.pos] || player.pos
  const bio = isPt ? player.bioPt : player.bioEn
  const imgSrc = getPlayerImage(player.id)
  const pg = posGroup(player.pos)
  const isStarter = lineupPlayerIds.has(player.id)

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={player.name}>
      <div className={`modal-content glass-card grp-${pg}`} onClick={e => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
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
            <span className="modal-number pixel" aria-hidden="true">#{player.number}</span>
          </div>

          <div className="modal-identity">
            <div className="modal-badges">
              <span className={`modal-pos mono grp-${pg}`}>{posName}</span>
              {isStarter && (
                <span className="modal-starter-badge mono">{s.starter}</span>
              )}
            </div>
            <h3 className="modal-name pixel">{player.name}</h3>
            <span className="modal-club mono">{player.club}</span>
          </div>
        </div>

        {/* ── stats + bio ── */}
        <div className="modal-body">
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

import { useLang } from '../LanguageContext'
import { getPlayerImage } from '../data/selecao'
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

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={player.name}>
      <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label={isPt ? 'Fechar' : 'Close'}
        >
          ×
        </button>

        <div className="modal-image-wrap">
          {imgSrc && (
            <img
              src={imgSrc}
              alt={player.name}
              className="modal-image"
              onError={e => { e.target.style.display = 'none' }}
            />
          )}
          <div className="modal-number pixel">#{player.number}</div>
        </div>

        <div className="modal-info">
          <span className={`modal-pos mono grp-${posGroup(player.pos)}`}>
            {posName}
          </span>
          <h3 className="modal-name pixel">{player.name}</h3>

          <div className="modal-stats">
            <div className="modal-stat">
              <span className="modal-stat-val modal-stat-club">{player.club}</span>
              <span className="modal-stat-label mono">{isPt ? 'Clube' : 'Club'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.age} {s.age}</span>
              <span className="modal-stat-label mono">{isPt ? 'Idade' : 'Age'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.height}</span>
              <span className="modal-stat-label mono">{isPt ? 'Altura' : 'Height'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.caps}</span>
              <span className="modal-stat-label mono">Caps</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.brazilGoals}</span>
              <span className="modal-stat-label mono">{isPt ? 'Gols' : 'Goals'}</span>
            </div>
          </div>

          <p className="modal-bio">{bio}</p>
        </div>
      </div>
    </div>
  )
}

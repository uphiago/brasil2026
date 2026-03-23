import { useLang } from '../LanguageContext'
import './PlayerModal.css'

export default function PlayerModal({ player, onClose }) {
  const { lang, t } = useLang()
  const s = t.squad

  const posName = s.posNames[player.pos] || player.pos
  const bio = lang === 'pt-BR' ? player.bioPt : player.bioEn

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-image-wrap">
          <img 
            src={player.image} 
            alt={player.name}
            className="modal-image"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="modal-number pixel">#{player.number}</div>
        </div>

        <div className="modal-info">
          <span className={`modal-pos mono grp-${player.pos === 'GK' ? 'gk' : player.pos === 'CB' || player.pos === 'RB' || player.pos === 'LB' ? 'def' : player.pos === 'DM' || player.pos === 'CM' || player.pos === 'AM' || player.pos === 'MF' ? 'mid' : 'fwd'}`}>
            {posName}
          </span>
          <h3 className="modal-name pixel">{player.name}</h3>
          
          <div className="modal-stats">
            <div className="modal-stat">
              <span className="modal-stat-label mono">{player.club}</span>
              <span className="modal-stat-val">{lang === 'pt-BR' ? 'Clube' : 'Club'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.age} {s.age}</span>
              <span className="modal-stat-label mono">{lang === 'pt-BR' ? 'Idade' : 'Age'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.height}</span>
              <span className="modal-stat-label mono">{lang === 'pt-BR' ? 'Altura' : 'Height'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.caps}</span>
              <span className="modal-stat-label mono">{lang === 'pt-BR' ? 'Caps' : 'Caps'}</span>
            </div>
            <div className="modal-stat">
              <span className="modal-stat-val">{player.brazilGoals}</span>
              <span className="modal-stat-label mono">{lang === 'pt-BR' ? 'Gols' : 'Goals'}</span>
            </div>
          </div>

          <p className="modal-bio">{bio}</p>
        </div>
      </div>
    </div>
  )
}

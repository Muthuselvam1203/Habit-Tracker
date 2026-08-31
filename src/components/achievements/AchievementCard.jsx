import React from 'react';
import {
  Sparkles,
  Flame,
  Award,
  Target,
  Trophy,
  Crown,
  Shield,
  Layers,
  CheckCircle2,
  Lock,
  Check
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Flame,
  Award,
  Target,
  Trophy,
  Crown,
  Shield,
  Layers,
  CheckCircle2
};

export const AchievementCard = ({ achievement }) => {
  const {
    name,
    description,
    icon,
    tier = 'Bronze',
    points = 50,
    progress = 0,
    isUnlocked = false
  } = achievement;

  const IconComp = ICON_MAP[icon] || Sparkles;

  return (
    <div className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
      <div className="achievement-card-top">
        <div className="achievement-icon-avatar">
          {isUnlocked ? <IconComp size={24} /> : <Lock size={20} />}
        </div>

        <div className="achievement-title-area" style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4>{name}</h4>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isUnlocked ? 'var(--primary-blue)' : 'var(--color-text-grey)' }}>
              +{points} pts
            </span>
          </div>
          <span className="achievement-tier-tag">{tier}</span>
        </div>
      </div>

      <p className="achievement-desc">{description}</p>

      {/* Progress Bar & Status */}
      <div className="achievement-progress-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--color-text-grey)', fontWeight: '600' }}>
            {isUnlocked ? 'Unlocked' : `${progress}% Progress`}
          </span>
          {isUnlocked && (
            <span style={{ color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Check size={13} strokeWidth={3} /> Achieved
            </span>
          )}
        </div>

        <div className="achievement-progress-bar">
          <div
            className="achievement-progress-fill"
            style={{ width: `${isUnlocked ? 100 : progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

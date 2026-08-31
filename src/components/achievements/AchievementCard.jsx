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
  Check,
  Sun,
  Droplets,
  Heart,
  BookOpen,
  Zap,
  ShieldCheck
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
  CheckCircle2,
  Sun,
  Droplets,
  Heart,
  BookOpen,
  Zap,
  ShieldCheck
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

  const tierColors = {
    Bronze: '#CD7F32',
    Silver: '#94A3B8',
    Gold: '#F59E0B',
    Diamond: '#3B82F6'
  };

  const tierColor = tierColors[tier] || '#F59E0B';

  return (
    <div className={`achievement-card anim-scale-in ${isUnlocked ? 'unlocked' : 'locked'}`} style={{ borderTop: isUnlocked ? `3px solid ${tierColor}` : undefined }}>
      <div className="achievement-card-top">
        <div
          className="achievement-icon-avatar"
          style={{
            backgroundColor: isUnlocked ? `${tierColor}20` : 'rgba(0,0,0,0.04)',
            color: isUnlocked ? tierColor : '#94A3B8'
          }}
        >
          {isUnlocked ? <IconComp size={24} /> : <Lock size={20} />}
        </div>

        <div className="achievement-title-area" style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4>{name}</h4>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isUnlocked ? tierColor : 'var(--color-text-grey)' }}>
              +{points} XP
            </span>
          </div>
          <span className="achievement-tier-tag" style={{ color: tierColor, borderColor: `${tierColor}40` }}>{tier}</span>
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
            style={{
              width: `${isUnlocked ? 100 : progress}%`,
              backgroundColor: isUnlocked ? tierColor : undefined
            }}
          />
        </div>
      </div>
    </div>
  );
};

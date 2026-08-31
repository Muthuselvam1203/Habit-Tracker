import React from 'react';
import { Sparkles, Trophy, Award, Zap, Shield, Flame } from 'lucide-react';

export const XPLevelBar = ({
  userLevel = {},
  unlockedCount = 0,
  totalCount = 0,
  streakFreezes = 2
}) => {
  const {
    level = 7,
    title = 'Routine Master',
    currentXp = 2850,
    xpInCurrentLevel = 150,
    xpForNextLevel = 300,
    nextLevelTotalXp = 3000,
    progressPercent = 50
  } = userLevel;

  return (
    <div
      className="card anim-scale-in"
      style={{
        background: 'linear-gradient(135deg, #07111F 0%, #0B1728 50%, #1E293B 100%)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '1.75rem',
        marginBottom: '1.5rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Left: Level Emblem & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(37, 99, 235, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', opacity: 0.85 }}>LVL</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '900', lineHeight: 1 }}>{level}</span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                {title}
              </h3>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#FBBF24',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Zap size={12} /> {currentXp} Total XP
              </span>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
              Earn XP by completing habits, morning/night routines, focus sprints, and journal entries.
            </p>
          </div>
        </div>

        {/* Right: Quick Stats Pills */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>Badges Unlocked</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#60A5FA', marginTop: '2px' }}>
              {unlockedCount} / {totalCount}
            </div>
          </div>

          <div
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>Streak Freezes</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#34D399', marginTop: '2px' }}>
              {streakFreezes} Available
            </div>
          </div>
        </div>
      </div>

      {/* Level XP Progress Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.45rem' }}>
          <span style={{ color: '#CBD5E1' }}>Progress to Level {level + 1}</span>
          <span style={{ color: '#60A5FA' }}>
            {xpInCurrentLevel} / {xpForNextLevel} XP ({progressPercent}%)
          </span>
        </div>

        <div
          style={{
            height: '10px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #2563EB 0%, #8B5CF6 50%, #EC4899 100%)',
              borderRadius: '999px',
              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

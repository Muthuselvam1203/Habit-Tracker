import React from 'react';
import { Flame, Check, Shield } from 'lucide-react';

const MILESTONES = [
  { days: 3, label: '3 Days' },
  { days: 7, label: '7 Days' },
  { days: 14, label: '14 Days' },
  { days: 30, label: '30 Days' },
  { days: 60, label: '60 Days' },
  { days: 100, label: '100 Days' }
];

export const StreakCard = ({
  currentStreak = 0,
  bestStreak = 0,
  totalCompletions = 0
}) => {
  return (
    <div className="milestones-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Flame size={20} color="#60A5FA" />
          <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-white)' }}>
            Streak Milestones
          </h4>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>
          Best: {bestStreak}d
        </span>
      </div>

      <p style={{ fontSize: '0.825rem', color: '#94A3B8', marginTop: '0.35rem', lineHeight: '1.4' }}>
        Consecutive consistency unlocks permanent momentum tiers.
      </p>

      <div className="milestones-timeline">
        {MILESTONES.map((m) => {
          const isAchieved = bestStreak >= m.days;
          const isCurrentTarget = currentStreak < m.days && (m.days === 3 || currentStreak >= (MILESTONES[MILESTONES.indexOf(m) - 1]?.days || 0));

          return (
            <div
              key={m.days}
              className={`milestone-step ${isAchieved ? 'achieved' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isAchieved ? '#2563EB' : 'rgba(255, 255, 255, 0.1)',
                    color: isAchieved ? '#FFFFFF' : '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: '800'
                  }}
                >
                  {isAchieved ? <Check size={13} strokeWidth={3} /> : m.days}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: isAchieved ? '#FFFFFF' : '#CBD5E1' }}>
                  {m.label} Milestone
                </span>
              </div>

              {isAchieved ? (
                <span style={{ fontSize: '0.725rem', fontWeight: '700', color: '#60A5FA', textTransform: 'uppercase' }}>
                  Unlocked
                </span>
              ) : isCurrentTarget ? (
                <span style={{ fontSize: '0.725rem', fontWeight: '700', color: '#FCD34D' }}>
                  Next Target
                </span>
              ) : (
                <span style={{ fontSize: '0.725rem', color: '#64748B' }}>
                  Locked
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

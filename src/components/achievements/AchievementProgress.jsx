import React from 'react';
import { Award, Trophy, Sparkles } from 'lucide-react';

export const AchievementProgress = ({
  unlockedCount = 0,
  totalCount = 9,
  totalPoints = 0
}) => {
  const percentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return (
    <div className="achievements-progress-banner">
      <div className="achievements-progress-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Trophy size={20} color="#60A5FA" />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Milestones & Badges
          </span>
        </div>

        <h3>
          {unlockedCount} of {totalCount} Badges Unlocked ({percentage}%)
        </h3>
        <p>
          Celebrate every milestone and unlock points by maintaining your daily habits.
        </p>

        {/* Big Progress Bar */}
        <div style={{ width: '100%', maxWidth: '400px', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-full)', marginTop: '1rem', overflow: 'hidden' }}>
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: '#2563EB',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.5s ease'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem' }}>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.5rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase' }}>Total Glory Points</div>
          <div style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--color-white)', marginTop: '0.2rem' }}>
            {totalPoints}
          </div>
        </div>
      </div>
    </div>
  );
};

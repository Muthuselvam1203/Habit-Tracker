import React from 'react';
import { AchievementProgress } from '../components/achievements/AchievementProgress';
import { AchievementGrid } from '../components/achievements/AchievementGrid';
import { evaluateAchievements } from '../utils/achievementUtils';

export const Achievements = ({
  habits = [],
  completions = {},
  unlockedAchievements = []
}) => {
  const { achievements, totalPoints, unlockedCount, totalCount } = evaluateAchievements(
    habits,
    completions,
    unlockedAchievements
  );

  return (
    <div className="achievements-container anim-fade-in">
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-black)' }}>
          Achievements
        </h2>
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Celebrate your milestones, unlock consistency badges, and collect points.
        </p>
      </div>

      <AchievementProgress
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        totalPoints={totalPoints}
      />

      <AchievementGrid achievements={achievements} />
    </div>
  );
};

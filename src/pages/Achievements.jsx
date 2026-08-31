import React from 'react';
import { XPLevelBar } from '../components/achievements/XPLevelBar';
import { AchievementGrid } from '../components/achievements/AchievementGrid';
import { evaluateAchievements } from '../utils/achievementUtils';
import { Award, Sparkles } from 'lucide-react';

export const Achievements = ({
  habits = [],
  completions = {},
  unlockedAchievements = [],
  userLevel = {},
  streakFreezes = 2
}) => {
  const { achievements, totalPoints, unlockedCount, totalCount } = evaluateAchievements(
    habits,
    completions,
    unlockedAchievements
  );

  return (
    <div className="achievements-container anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={24} color="var(--primary-blue)" /> Gamification, Levels & Badges
        </h2>
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Level up your life, unlock consistency badges, earn XP, and unlock streak protections.
        </p>
      </div>

      <XPLevelBar
        userLevel={userLevel}
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        streakFreezes={streakFreezes}
      />

      <AchievementGrid achievements={achievements} />
    </div>
  );
};

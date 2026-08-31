import React from 'react';
import { AchievementCard } from './AchievementCard';

export const AchievementGrid = ({ achievements = [] }) => {
  return (
    <div className="achievements-grid">
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
        />
      ))}
    </div>
  );
};

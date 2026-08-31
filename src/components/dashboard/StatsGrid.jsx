import React from 'react';
import { StatCard } from './StatCard';
import { Flame, Trophy, Percent, CheckCircle2 } from 'lucide-react';

export const StatsGrid = ({ stats = {} }) => {
  const {
    currentStreak = 0,
    bestStreak = 0,
    todayCompletionRate = 0,
    totalCompletions = 0,
    completedToday = 0,
    dueToday = 0
  } = stats;

  return (
    <div className="stats-grid">
      {/* 1. Current Streak */}
      <StatCard
        title="Current Streak"
        value={`${currentStreak} ${currentStreak === 1 ? 'Day' : 'Days'}`}
        subtitle="Active momentum"
        icon={Flame}
        iconBg="var(--color-light-blue)"
        iconColor="var(--primary-blue)"
      />

      {/* 2. Longest Streak */}
      <StatCard
        title="Longest Streak"
        value={`${bestStreak} ${bestStreak === 1 ? 'Day' : 'Days'}`}
        subtitle="All-time personal best"
        icon={Trophy}
        iconBg="var(--color-light-grey)"
        iconColor="var(--color-black)"
      />

      {/* 3. Completion Rate */}
      <StatCard
        title="Completion Rate"
        value={`${todayCompletionRate}%`}
        subtitle={`${completedToday} of ${dueToday} done today`}
        icon={Percent}
        iconBg="var(--color-light-blue)"
        iconColor="var(--primary-blue)"
      />

      {/* 4. Total Completed */}
      <StatCard
        title="Total Completed"
        value={totalCompletions}
        subtitle="Lifetime habit check-ins"
        icon={CheckCircle2}
        iconBg="var(--status-success-bg)"
        iconColor="var(--status-success-text)"
      />
    </div>
  );
};

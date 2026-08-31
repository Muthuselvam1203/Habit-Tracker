import React from 'react';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { TodayHabits } from '../components/dashboard/TodayHabits';
import { DailyProgress } from '../components/dashboard/DailyProgress';
import { WeeklyOverview } from '../components/dashboard/WeeklyOverview';
import { StreakCard } from '../components/dashboard/StreakCard';
import { QuickAddHabit } from '../components/dashboard/QuickAddHabit';
import { InsightsSection } from '../components/dashboard/InsightsSection';

export const Dashboard = ({
  userProfile = {},
  habits = [],
  completions = {},
  stats = {},
  onToggleCompletion,
  onOpenHabitDetails,
  onOpenNewHabit,
  onOpenEdit,
  onToggleArchive,
  onDelete,
  onAddHabit
}) => {
  return (
    <div className="dashboard-container anim-fade-in">
      {/* Welcome Banner */}
      <WelcomeHeader
        userProfile={userProfile}
        stats={stats}
        onOpenNewHabit={onOpenNewHabit}
      />

      {/* 4 KPI Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Main 2-Column Split Grid */}
      <div className="dashboard-main-grid">
        {/* Left / Primary Column */}
        <div className="dashboard-primary-col">
          <QuickAddHabit onAddHabit={onAddHabit} />

          <TodayHabits
            habits={habits}
            completions={completions}
            onToggleCompletion={onToggleCompletion}
            onOpenHabitDetails={onOpenHabitDetails}
            onOpenNewHabit={onOpenNewHabit}
            onOpenEdit={onOpenEdit}
            onToggleArchive={onToggleArchive}
            onDelete={onDelete}
          />

          <WeeklyOverview habits={habits} completions={completions} />
        </div>

        {/* Right / Secondary Column */}
        <div className="dashboard-secondary-col">
          <DailyProgress stats={stats} />
          <InsightsSection habits={habits} completions={completions} />
          <StreakCard
            currentStreak={stats.currentStreak}
            bestStreak={stats.bestStreak}
            totalCompletions={stats.totalCompletions}
          />
        </div>
      </div>
    </div>
  );
};

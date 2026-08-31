import React, { useState } from 'react';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { LifeScoreCard } from '../components/dashboard/LifeScoreCard';
import { WellnessQuickBar } from '../components/dashboard/WellnessQuickBar';
import { TimelineView } from '../components/dashboard/TimelineView';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { TodayHabits } from '../components/dashboard/TodayHabits';
import { BadHabitsSection } from '../components/dashboard/BadHabitsSection';
import { DailyProgress } from '../components/dashboard/DailyProgress';
import { WeeklyOverview } from '../components/dashboard/WeeklyOverview';
import { StreakCard } from '../components/dashboard/StreakCard';
import { QuickAddHabit } from '../components/dashboard/QuickAddHabit';
import { InsightsSection } from '../components/dashboard/InsightsSection';
import { FocusModal } from '../components/focus/FocusModal';

export const Dashboard = ({
  userProfile = {},
  habits = [],
  completions = {},
  stats = {},
  morningRoutine = [],
  nightRoutine = [],
  routineLogs = {},
  wellnessLogs = {},
  badHabits = [],
  goals = [],
  lifeScore = {},
  streakFreezes = 2,
  onToggleCompletion,
  onToggleRoutineStep,
  onOpenHabitDetails,
  onOpenNewHabit,
  onOpenEdit,
  onToggleArchive,
  onDelete,
  onAddHabit,
  onAddWater,
  onUpdateWellness,
  onResetBadHabit,
  onUseStreakFreeze,
  onLogFocus,
  onNavigate
}) => {
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [selectedFocusHabit, setSelectedFocusHabit] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'timeline'

  const handleStartTimer = (habit) => {
    setSelectedFocusHabit(habit);
    setIsFocusOpen(true);
  };

  return (
    <div className="dashboard-container anim-fade-in">
      {/* Welcome Banner with Live Clock and Quote */}
      <WelcomeHeader
        userProfile={userProfile}
        stats={stats}
        lifeScore={lifeScore}
        onOpenNewHabit={onOpenNewHabit}
        onOpenFocus={() => {
          setSelectedFocusHabit(null);
          setIsFocusOpen(true);
        }}
      />

      {/* Wellness & Daily Vitals Quick Bar */}
      <WellnessQuickBar
        wellnessLogs={wellnessLogs}
        onAddWater={onAddWater}
        onUpdateWellness={onUpdateWellness}
        onOpenFocus={() => {
          setSelectedFocusHabit(null);
          setIsFocusOpen(true);
        }}
        onNavigate={onNavigate}
      />

      {/* 4 KPI Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Main Split Grid */}
      <div className="dashboard-main-grid">
        {/* Primary / Left Column */}
        <div className="dashboard-primary-col">
          {/* Quick Toggle between Habits List and 24-Hour Timeline */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              backgroundColor: 'var(--color-white)',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-black)' }}>
              Dashboard View Mode
            </span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  backgroundColor: viewMode === 'list' ? 'var(--primary-blue)' : 'var(--color-light-grey)',
                  color: viewMode === 'list' ? '#FFFFFF' : 'var(--color-text-grey)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                📋 Habits View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  backgroundColor: viewMode === 'timeline' ? 'var(--primary-blue)' : 'var(--color-light-grey)',
                  color: viewMode === 'timeline' ? '#FFFFFF' : 'var(--color-text-grey)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                🗓️ 24h Timeline
              </button>
            </div>
          </div>

          {viewMode === 'timeline' ? (
            <TimelineView
              habits={habits}
              morningRoutine={morningRoutine}
              nightRoutine={nightRoutine}
              routineLogs={routineLogs}
              completions={completions}
              onToggleHabit={onToggleCompletion}
              onToggleRoutine={onToggleRoutineStep}
            />
          ) : (
            <>
              <QuickAddHabit onAddHabit={onAddHabit} />

              <TodayHabits
                habits={habits}
                completions={completions}
                streakFreezes={streakFreezes}
                onToggleCompletion={onToggleCompletion}
                onOpenHabitDetails={onOpenHabitDetails}
                onOpenNewHabit={onOpenNewHabit}
                onOpenEdit={onOpenEdit}
                onToggleArchive={onToggleArchive}
                onDelete={onDelete}
                onStartTimer={handleStartTimer}
                onUseStreakFreeze={onUseStreakFreeze}
              />
            </>
          )}

          {/* Bad Habits Avoidance Section */}
          <BadHabitsSection
            badHabits={badHabits}
            onResetBadHabit={onResetBadHabit}
            onNavigate={onNavigate}
          />

          <WeeklyOverview habits={habits} completions={completions} />
        </div>

        {/* Secondary / Right Column */}
        <div className="dashboard-secondary-col">
          {/* Signature Streakly Life Score Card */}
          <LifeScoreCard lifeScore={lifeScore} />

          <DailyProgress stats={stats} />

          <InsightsSection habits={habits} completions={completions} />

          <StreakCard
            currentStreak={stats.currentStreak}
            bestStreak={stats.bestStreak}
            totalCompletions={stats.totalCompletions}
          />
        </div>
      </div>

      {/* Focus Mode Pomodoro Modal */}
      <FocusModal
        isOpen={isFocusOpen}
        onClose={() => setIsFocusOpen(false)}
        habits={habits}
        initialHabit={selectedFocusHabit}
        onLogFocus={onLogFocus}
      />
    </div>
  );
};

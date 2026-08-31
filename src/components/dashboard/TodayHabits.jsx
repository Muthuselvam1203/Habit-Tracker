import React, { useState } from 'react';
import { HabitCard } from './HabitCard';
import { EmptyState } from '../common/EmptyState';
import { Plus, CheckSquare, Sun, Moon, Sparkles, Shield, Clock } from 'lucide-react';
import { getDayOfWeek, formatDateKey } from '../../utils/dateUtils';

export const TodayHabits = ({
  habits = [],
  completions = {},
  streakFreezes = 2,
  onToggleCompletion,
  onOpenHabitDetails,
  onOpenNewHabit,
  onOpenEdit,
  onToggleArchive,
  onDelete,
  onStartTimer,
  onUseStreakFreeze
}) => {
  const [timeFilter, setTimeFilter] = useState('all');
  const todayKey = formatDateKey(new Date());
  const todayDayName = getDayOfWeek(todayKey);

  // Active habits scheduled for today
  const activeHabits = habits.filter(h => !h.archived);
  const todayScheduledHabits = activeHabits.filter(h => {
    const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return targetDays.includes(todayDayName);
  });

  const filteredHabits = todayScheduledHabits.filter(h => {
    if (timeFilter === 'all') return true;
    return h.timeOfDay === timeFilter;
  });

  const completedCount = todayScheduledHabits.filter(
    h => !!completions[h.id]?.[todayKey]
  ).length;

  return (
    <div className="today-habits-section">
      <div className="today-habits-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <div className="today-habits-title-group">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-black)', margin: 0 }}>
            Today's Habits & Rituals
          </h3>
          {todayScheduledHabits.length > 0 && (
            <span className="badge-blue">
              {completedCount} of {todayScheduledHabits.length} completed ({Math.round((completedCount / todayScheduledHabits.length) * 100)}%)
            </span>
          )}
        </div>

        {/* Action Controls & Streak Freeze */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {onUseStreakFreeze && (
            <button
              type="button"
              onClick={onUseStreakFreeze}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#2563EB',
                borderColor: 'rgba(37, 99, 235, 0.3)'
              }}
              title="Protect your streak from any missed days"
            >
              <Shield size={13} color="#2563EB" />
              <span>Streak Freeze ({streakFreezes} left)</span>
            </button>
          )}

          <button
            onClick={onOpenNewHabit}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: '700' }}
          >
            <Plus size={15} /> Add Habit
          </button>
        </div>
      </div>

      {/* Time-of-day tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.35rem',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}
      >
        <button
          type="button"
          onClick={() => setTimeFilter('all')}
          style={timeTabStyle(timeFilter === 'all')}
        >
          <Sparkles size={13} /> All ({todayScheduledHabits.length})
        </button>
        <button
          type="button"
          onClick={() => setTimeFilter('morning')}
          style={timeTabStyle(timeFilter === 'morning')}
        >
          <Sun size={13} color="#F59E0B" /> Morning ({todayScheduledHabits.filter(h => h.timeOfDay === 'morning').length})
        </button>
        <button
          type="button"
          onClick={() => setTimeFilter('afternoon')}
          style={timeTabStyle(timeFilter === 'afternoon')}
        >
          <Clock size={13} color="#3B82F6" /> Afternoon ({todayScheduledHabits.filter(h => h.timeOfDay === 'afternoon').length})
        </button>
        <button
          type="button"
          onClick={() => setTimeFilter('evening')}
          style={timeTabStyle(timeFilter === 'evening')}
        >
          <Moon size={13} color="#6366F1" /> Evening ({todayScheduledHabits.filter(h => h.timeOfDay === 'evening').length})
        </button>
      </div>

      {filteredHabits.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No habits in this section"
          description="You have no scheduled habits for this time period today."
          actionLabel="Create Habit"
          onAction={onOpenNewHabit}
        />
      ) : (
        <div className="today-habits-list">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completions={completions}
              onToggleCompletion={onToggleCompletion}
              onOpenDetails={onOpenHabitDetails}
              onOpenEdit={onOpenEdit}
              onToggleArchive={onToggleArchive}
              onDelete={onDelete}
              onStartTimer={onStartTimer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const timeTabStyle = (isActive) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  padding: '0.35rem 0.75rem',
  borderRadius: '999px',
  backgroundColor: isActive ? 'var(--primary-blue)' : 'var(--color-light-grey)',
  color: isActive ? '#FFFFFF' : 'var(--color-text-grey)',
  border: 'none',
  fontSize: '0.78rem',
  fontWeight: isActive ? '700' : '600',
  cursor: 'pointer',
  transition: 'all 0.15s'
});

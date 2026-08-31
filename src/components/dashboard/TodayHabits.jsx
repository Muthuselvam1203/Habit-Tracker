import React from 'react';
import { HabitCard } from './HabitCard';
import { EmptyState } from '../common/EmptyState';
import { Plus, CheckSquare } from 'lucide-react';
import { getDayOfWeek, formatDateKey } from '../../utils/dateUtils';

export const TodayHabits = ({
  habits = [],
  completions = {},
  onToggleCompletion,
  onOpenHabitDetails,
  onOpenNewHabit,
  onOpenEdit,
  onToggleArchive,
  onDelete
}) => {
  const todayKey = formatDateKey(new Date());
  const todayDayName = getDayOfWeek(todayKey);

  // Active habits scheduled for today
  const activeHabits = habits.filter(h => !h.archived);
  const todayScheduledHabits = activeHabits.filter(h => {
    const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return targetDays.includes(todayDayName);
  });

  const completedCount = todayScheduledHabits.filter(
    h => !!completions[h.id]?.[todayKey]
  ).length;

  return (
    <div className="today-habits-section">
      <div className="today-habits-header">
        <div className="today-habits-title-group">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-black)' }}>
            Today's habits
          </h3>
          {todayScheduledHabits.length > 0 && (
            <span className="badge-blue">
              {completedCount} of {todayScheduledHabits.length} completed
            </span>
          )}
        </div>

        <button
          onClick={onOpenNewHabit}
          className="btn btn-secondary btn-sm"
          style={{ fontWeight: '600' }}
        >
          <Plus size={15} /> Add Habit
        </button>
      </div>

      {todayScheduledHabits.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No habits scheduled for today"
          description="Enjoy your rest day or create a new habit to keep building your momentum."
          actionLabel="Create Habit"
          onAction={onOpenNewHabit}
        />
      ) : (
        <div className="today-habits-list">
          {todayScheduledHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completions={completions}
              onToggleCompletion={onToggleCompletion}
              onOpenDetails={onOpenHabitDetails}
              onOpenEdit={onOpenEdit}
              onToggleArchive={onToggleArchive}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

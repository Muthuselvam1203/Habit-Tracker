import React from 'react';
import { HabitCard } from '../dashboard/HabitCard';
import { EmptyState } from '../common/EmptyState';
import { CheckSquare } from 'lucide-react';

export const HabitList = ({
  habits = [],
  completions = {},
  dateKey,
  onToggleCompletion,
  onIncrement,
  onLogNote,
  onOpenHabitDetails,
  onOpenNewHabit,
  onOpenEdit,
  onToggleArchive,
  onDelete,
  onStartTimer
}) => {
  if (habits.length === 0) {
    return (
      <EmptyState
        icon={CheckSquare}
        title="No habits match your filters"
        description="Try adjusting your search or category filter, or create a brand new habit."
        actionLabel="Add Habit"
        onAction={onOpenNewHabit}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          completions={completions}
          dateKey={dateKey}
          onToggleCompletion={onToggleCompletion}
          onIncrement={onIncrement}
          onLogNote={onLogNote}
          onOpenDetails={onOpenHabitDetails}
          onOpenEdit={onOpenEdit}
          onToggleArchive={onToggleArchive}
          onDelete={onDelete}
          onStartTimer={onStartTimer}
        />
      ))}
    </div>
  );
};

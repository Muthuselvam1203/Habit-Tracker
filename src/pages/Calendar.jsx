import React from 'react';
import { HabitCalendar } from '../components/calendar/HabitCalendar';

export const Calendar = ({
  habits = [],
  completions = {},
  onToggleCompletion
}) => {
  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-black)' }}>
          Calendar
        </h2>
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Inspect monthly completion patterns and log routines on any date.
        </p>
      </div>

      <HabitCalendar
        habits={habits}
        completions={completions}
        onToggleCompletion={onToggleCompletion}
      />
    </div>
  );
};

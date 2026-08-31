import React from 'react';
import { HabitCalendar } from '../components/calendar/HabitCalendar';
import { HeatmapCalendar } from '../components/calendar/HeatmapCalendar';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export const Calendar = ({
  habits = [],
  completions = {},
  onToggleCompletion
}) => {
  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CalendarIcon size={24} color="var(--primary-blue)" /> Calendar & Consistency Heatmap
        </h2>
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Inspect monthly completion patterns, multi-month GitHub contribution grids, and historical check-in logs.
        </p>
      </div>

      <HabitCalendar
        habits={habits}
        completions={completions}
        onToggleCompletion={onToggleCompletion}
      />

      <HeatmapCalendar
        habits={habits}
        completions={completions}
      />
    </div>
  );
};

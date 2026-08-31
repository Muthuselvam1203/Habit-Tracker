import React from 'react';
import { Check, X, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { getDayOfWeek, parseDateKey, formatDisplayDate } from '../../utils/dateUtils';

export const DayDetails = ({
  selectedDateKey,
  habits = [],
  completions = {},
  onToggleCompletion
}) => {
  if (!selectedDateKey) return null;

  const shortDayName = getDayOfWeek(selectedDateKey);
  const fullDateFormatted = formatDisplayDate(parseDateKey(selectedDateKey));

  const activeHabits = habits.filter(h => !h.archived);
  const scheduledOnThisDay = activeHabits.filter(h => {
    const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return targetDays.includes(shortDayName);
  });

  const completedHabits = scheduledOnThisDay.filter(h => !!completions[h.id]?.[selectedDateKey]);
  const missedHabits = scheduledOnThisDay.filter(h => !completions[h.id]?.[selectedDateKey]);
  const completionPercentage = scheduledOnThisDay.length > 0
    ? Math.round((completedHabits.length / scheduledOnThisDay.length) * 100)
    : 0;

  return (
    <div className="day-details-panel">
      {/* Day Details Header */}
      <div className="day-details-header">
        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-black)' }}>
            {fullDateFormatted}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
            {scheduledOnThisDay.length} habits scheduled for this day
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className={completionPercentage === 100 ? 'badge-success' : 'badge-blue'}>
            {completedHabits.length} / {scheduledOnThisDay.length} completed ({completionPercentage}%)
          </span>
        </div>
      </div>

      {scheduledOnThisDay.length === 0 ? (
        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-text-grey)', fontSize: '0.9rem' }}>
          No habits scheduled on this day of the week.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {scheduledOnThisDay.map((habit) => {
            const isDone = !!completions[habit.id]?.[selectedDateKey];

            return (
              <div
                key={habit.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isDone ? 'var(--status-success-bg)' : 'var(--color-light-grey)',
                  border: `1px solid ${isDone ? 'var(--status-success-border)' : 'var(--border-subtle)'}`,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => onToggleCompletion(habit.id, selectedDateKey)}
                    className={`habit-checkbox ${isDone ? 'checked' : ''}`}
                    aria-label={`Toggle completion for ${habit.name}`}
                  >
                    {isDone && <Check size={16} strokeWidth={3} />}
                  </button>

                  <div>
                    <div style={{ fontSize: '0.925rem', fontWeight: '700', color: 'var(--color-black)', textDecoration: isDone ? 'none' : 'none' }}>
                      {habit.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
                      {habit.category} • {habit.timeOfDay || 'morning'}
                    </div>
                  </div>
                </div>

                <div>
                  {isDone ? (
                    <span style={{ fontSize: '0.775rem', fontWeight: '700', color: 'var(--status-success-text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={15} /> Completed
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.775rem', fontWeight: '600', color: 'var(--color-text-grey)' }}>
                      Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

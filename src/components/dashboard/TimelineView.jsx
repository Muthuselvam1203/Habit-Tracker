import React from 'react';
import { Clock, CheckCircle2, Circle, Sun, Moon, Sparkles, Droplets, Dumbbell, Heart, BookOpen, Target, Coffee } from 'lucide-react';
import { formatTime, formatDateKey } from '../../utils/dateUtils';

const ICON_MAP = {
  Sun,
  Moon,
  Sparkles,
  Droplets,
  Dumbbell,
  Heart,
  BookOpen,
  Target,
  Coffee,
  Clock
};

export const TimelineView = ({
  habits = [],
  morningRoutine = [],
  nightRoutine = [],
  routineLogs = {},
  completions = {},
  onToggleHabit,
  onToggleRoutine
}) => {
  const todayKey = formatDateKey(new Date());
  const todayRoutines = routineLogs[todayKey] || { morningCompletedIds: [], nightCompletedIds: [] };

  // Generate unified timeline events
  const events = [];

  // Morning routine steps
  morningRoutine.forEach(step => {
    const isDone = todayRoutines.morningCompletedIds?.includes(step.id);
    events.push({
      id: `routine-${step.id}`,
      originalId: step.id,
      type: 'morning_routine',
      time: step.scheduledTime || '06:30',
      title: step.title,
      duration: `${step.durationMin || 10}m`,
      category: 'Morning Routine',
      icon: step.icon || 'Sun',
      color: '#F59E0B',
      isCompleted: isDone,
      notes: step.notes
    });
  });

  // Scheduled habits
  habits.filter(h => !h.archived).forEach(h => {
    const isDone = !!completions[h.id]?.[todayKey];
    events.push({
      id: `habit-${h.id}`,
      originalId: h.id,
      type: 'habit',
      time: h.reminderTime || (h.timeOfDay === 'morning' ? '07:30' : h.timeOfDay === 'afternoon' ? '14:00' : '20:30'),
      title: h.name,
      duration: h.habitType === 'timer' ? `${h.timerTargetMinutes}m` : '15m',
      category: h.category || 'Habit',
      icon: h.icon || 'Sparkles',
      color: h.color || '#2563EB',
      isCompleted: isDone,
      notes: h.description
    });
  });

  // Night routine steps
  nightRoutine.forEach(step => {
    const isDone = todayRoutines.nightCompletedIds?.includes(step.id);
    events.push({
      id: `routine-${step.id}`,
      originalId: step.id,
      type: 'night_routine',
      time: step.scheduledTime || '21:30',
      title: step.title,
      duration: `${step.durationMin || 15}m`,
      category: 'Night Routine',
      icon: step.icon || 'Moon',
      color: '#6366F1',
      isCompleted: isDone,
      notes: step.notes
    });
  });

  // Sort events chronologically by time string HH:MM
  events.sort((a, b) => a.time.localeCompare(b.time));

  // Current time for the "NOW" indicator
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const nowTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;

  return (
    <div
      className="card"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--border-subtle)',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Clock size={18} color="var(--primary-blue)" /> 24-Hour Daily Life Timeline
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-grey)', margin: '0.2rem 0 0 0' }}>
            Chronological roadmap of your morning rituals, high-impact habits, focus sessions, and evening wind-down.
          </p>
        </div>

        <div
          style={{
            padding: '0.3rem 0.65rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            color: 'var(--primary-blue)',
            fontSize: '0.75rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'inline-block' }} />
          Current Time: {nowTimeStr}
        </div>
      </div>

      {/* Timeline track container */}
      <div style={{ position: 'relative', paddingLeft: '1.75rem' }}>
        {/* Continuous vertical timeline backbone */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            bottom: '8px',
            left: '11px',
            width: '2px',
            backgroundColor: 'var(--color-border-grey)',
            zIndex: 1
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {events.map((event, index) => {
            const IconComponent = ICON_MAP[event.icon] || Clock;
            const isPast = event.time < nowTimeStr;

            return (
              <div
                key={event.id}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  opacity: event.isCompleted ? 0.75 : isPast ? 0.9 : 1,
                  transition: 'all 0.2s'
                }}
              >
                {/* Node circle on timeline */}
                <div
                  onClick={() => {
                    if (event.type === 'habit') {
                      onToggleHabit(event.originalId);
                    } else if (event.type === 'morning_routine') {
                      onToggleRoutine('morning', event.originalId);
                    } else {
                      onToggleRoutine('night', event.originalId);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: '-1.75rem',
                    top: '2px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: event.isCompleted ? event.color : '#FFFFFF',
                    border: `2px solid ${event.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                    boxShadow: event.isCompleted ? `0 0 10px ${event.color}60` : '0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s'
                  }}
                >
                  {event.isCompleted ? (
                    <CheckCircle2 size={14} color="#FFFFFF" />
                  ) : (
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: event.color }} />
                  )}
                </div>

                {/* Event Card Content */}
                <div
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: event.isCompleted ? 'var(--color-light-grey)' : '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderLeft: `4px solid ${event.color}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    transition: 'all 0.15s'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          color: event.color,
                          backgroundColor: `${event.color}15`,
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                          fontVariantNumeric: 'tabular-nums'
                        }}
                      >
                        {formatTime(event.time)}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-grey)', fontWeight: '600' }}>
                        ({event.duration})
                      </span>
                      <span
                        style={{
                          fontSize: '0.675rem',
                          fontWeight: '700',
                          color: 'var(--color-text-grey)',
                          textTransform: 'uppercase'
                        }}
                      >
                        • {event.category}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-black)', textDecoration: event.isCompleted ? 'line-through' : 'none' }}>
                      {event.title}
                    </div>

                    {event.notes && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', marginTop: '0.15rem' }}>
                        {event.notes}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (event.type === 'habit') {
                        onToggleHabit(event.originalId);
                      } else if (event.type === 'morning_routine') {
                        onToggleRoutine('morning', event.originalId);
                      } else {
                        onToggleRoutine('night', event.originalId);
                      }
                    }}
                    className={`btn btn-sm ${event.isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.65rem',
                      fontWeight: '700'
                    }}
                  >
                    {event.isCompleted ? 'Done ✓' : 'Mark Done'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

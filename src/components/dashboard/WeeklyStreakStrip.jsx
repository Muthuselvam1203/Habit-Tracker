import React from 'react';
import { Plus } from 'lucide-react';
import { formatDateKey } from '../../utils/dateUtils';

export const WeeklyStreakStrip = ({
  currentDate = new Date(),
  selectedDate = new Date(),
  onSelectDate,
  onOpenNewHabit,
  completions = {},
  habits = []
}) => {
  // Generate 7 days centered on the selected / current week
  const getWeekDays = () => {
    const days = [];
    const base = new Date(selectedDate || currentDate);
    const dayOfWeek = base.getDay(); // 0 = Sun
    // Start 5 days back and 1 day forward to match the view in Screenshot 3 (Tue Wed Thu Fri Sat Sun Mon)
    const startDate = new Date(base);
    startDate.setDate(base.getDate() - 5);

    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateKey = formatDateKey(d);

      // Check if day was completed (at least 1 habit checked or majority checked)
      const dayCompletions = habits.filter(h => !h.archived && completions[h.id]?.[dateKey]);
      const isCompleted = dayCompletions.length > 0;

      days.push({
        date: d,
        dateKey,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        dayNum: d.getDate(),
        isToday: dateKey === formatDateKey(currentDate),
        isSelected: dateKey === formatDateKey(selectedDate || currentDate),
        isCompleted
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  // Find contiguous completed segments for the horizontal streak line
  // Example: days at index 2, 3, 4, 5 connected together
  const segments = [];
  let currentSegment = null;

  weekDays.forEach((day, index) => {
    if (day.isCompleted) {
      if (!currentSegment) {
        currentSegment = { start: index, end: index };
      } else {
        currentSegment.end = index;
      }
    } else {
      if (currentSegment) {
        if (currentSegment.end > currentSegment.start) {
          segments.push({ ...currentSegment });
        }
        currentSegment = null;
      }
    }
  });
  if (currentSegment && currentSegment.end > currentSegment.start) {
    segments.push({ ...currentSegment });
  }

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="tickit-weekly-strip-container anim-scale-in">
      {/* Top Header Row with TODAY + Big Blue Plus Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
            TODAY
          </h2>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#9CA3AF', marginTop: '0.35rem' }}>
            {todayFormatted}
          </div>
        </div>

        {onOpenNewHabit && (
          <button
            type="button"
            onClick={onOpenNewHabit}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.45)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            title="Create new habit"
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* 7-Day Connected Streak Strip */}
      <div className="tickit-streak-chain-bar">
        {/* Render Connected Horizontal Blue Lines Behind Completed Segments */}
        {segments.map((seg, idx) => {
          const leftPercent = (seg.start / 7) * 100 + 7.14 / 2;
          const widthPercent = ((seg.end - seg.start) / 7) * 100;
          return (
            <div
              key={idx}
              className="tickit-streak-connector"
              style={{
                left: `calc(${leftPercent}% + 8px)`,
                width: `calc(${widthPercent}% + 20px)`
              }}
            />
          );
        })}

        {/* 7 Columns */}
        {weekDays.map((day, idx) => (
          <div
            key={day.dateKey}
            className="tickit-day-col"
            onClick={() => onSelectDate && onSelectDate(day.date)}
            style={{ cursor: 'pointer' }}
          >
            <span
              className="tickit-day-label"
              style={{
                color: day.isSelected ? '#FFFFFF' : '#6B7280',
                fontWeight: day.isSelected ? '900' : '700'
              }}
            >
              {day.dayName}
            </span>

            <div
              className={`tickit-day-circle ${day.isCompleted ? 'completed' : ''} ${day.isSelected ? 'active-today' : ''}`}
            >
              {day.dayNum}
            </div>

            {/* Selected Blue Underline indicator */}
            {day.isSelected && (
              <div
                style={{
                  width: '18px',
                  height: '3px',
                  backgroundColor: '#2563EB',
                  borderRadius: '2px',
                  marginTop: '-0.3rem'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

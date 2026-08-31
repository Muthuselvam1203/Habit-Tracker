import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { DayDetails } from './DayDetails';
import { getMonthMatrix, formatDateKey, DAY_NAMES, getDayOfWeek } from '../../utils/dateUtils';
import { getHabitColor } from '../../data/habitOptions';

export const HabitCalendar = ({
  habits = [],
  completions = {},
  onToggleCompletion
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDateKey, setSelectedDateKey] = useState(formatDateKey(today));

  const matrix = getMonthMatrix(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDateKey(formatDateKey(today));
  };

  const activeHabits = habits.filter(h => !h.archived);

  return (
    <div className="calendar-container">
      <div className="calendar-card">
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />

        {/* Weekday Labels Header */}
        <div className="calendar-weekdays-row">
          {DAY_NAMES.map((day) => (
            <div key={day}>
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="calendar-days-grid">
          {matrix.flat().map((dayCell, index) => {
            const isSelected = selectedDateKey === dayCell.dateKey;
            const shortDayName = getDayOfWeek(dayCell.dateKey);

            // Compute scheduled and completed habits for this cell date
            const scheduledOnThisDay = activeHabits.filter(h => {
              const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              return targetDays.includes(shortDayName);
            });

            const completedHabits = scheduledOnThisDay.filter(h => !!completions[h.id]?.[dayCell.dateKey]);
            const isPerfect = scheduledOnThisDay.length > 0 && completedHabits.length >= scheduledOnThisDay.length;
            const isPartial = completedHabits.length > 0 && completedHabits.length < scheduledOnThisDay.length;
            const isMissed = scheduledOnThisDay.length > 0 && completedHabits.length === 0;

            return (
              <div
                key={`${dayCell.dateKey}-${index}`}
                className={`calendar-day-cell ${!dayCell.isCurrentMonth ? 'other-month' : ''} ${dayCell.isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDateKey(dayCell.dateKey)}
                role="button"
                tabIndex={0}
              >
                <div className="day-cell-header">
                  <span className="day-number">{dayCell.dayNumber}</span>
                  {scheduledOnThisDay.length > 0 && (
                    <span
                      className={`day-completion-tag ${
                        isPerfect ? 'perfect' : isPartial ? 'partial' : isMissed ? 'missed' : ''
                      }`}
                    >
                      {completedHabits.length}/{scheduledOnThisDay.length}
                    </span>
                  )}
                </div>

                {/* Habit Indicator Dots */}
                <div className="day-dots-row">
                  {completedHabits.slice(0, 5).map((h) => {
                    const dotColor = getHabitColor(h);
                    return (
                      <div
                        key={h.id}
                        className="day-dot"
                        style={{
                          backgroundColor: dotColor,
                          boxShadow: `0 1px 3px ${dotColor}60`
                        }}
                        title={h.name}
                      />
                    );
                  })}
                  {completedHabits.length > 5 && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-grey)' }}>
                      +{completedHabits.length - 5}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Inspector Panel */}
      <DayDetails
        selectedDateKey={selectedDateKey}
        habits={habits}
        completions={completions}
        onToggleCompletion={onToggleCompletion}
      />
    </div>
  );
};

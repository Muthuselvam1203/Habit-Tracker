import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { MONTH_NAMES } from '../../utils/dateUtils';

export const CalendarHeader = ({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
  onToday
}) => {
  return (
    <div className="calendar-header-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-light-blue)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CalendarIcon size={20} />
        </div>
        <h3 className="calendar-month-title">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h3>
      </div>

      <div className="calendar-nav-controls">
        <button
          onClick={onToday}
          className="btn btn-secondary btn-sm"
        >
          Today
        </button>

        <button
          onClick={onPrevMonth}
          className="btn btn-secondary btn-icon btn-sm"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={onNextMonth}
          className="btn btn-secondary btn-icon btn-sm"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

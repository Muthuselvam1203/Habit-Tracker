import React from 'react';
import { Plus, Flame, Sparkles, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { getGreeting, formatDisplayDate } from '../../utils/dateUtils';

export const WelcomeHeader = ({
  userProfile = {},
  stats = {},
  onOpenNewHabit
}) => {
  const greeting = getGreeting();
  const userName = userProfile.name || 'Friend';
  const currentDate = formatDisplayDate();
  const { currentStreak = 0, dueToday = 0, completedToday = 0 } = stats;

  return (
    <div className="dashboard-header-banner">
      <div className="dashboard-header-content">
        <h1>
          {greeting}, {userName} 👋
        </h1>
        <p>
          Small steps every day. Big changes over time.
        </p>

        <div className="dashboard-header-meta">
          <span className="dashboard-date-badge">
            <Calendar size={13} /> {currentDate}
          </span>

          <span className="badge-blue">
            <Flame size={14} /> {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'} Active Streak
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Button variant="primary" onClick={onOpenNewHabit} icon={Plus}>
          Add Habit
        </Button>
      </div>
    </div>
  );
};

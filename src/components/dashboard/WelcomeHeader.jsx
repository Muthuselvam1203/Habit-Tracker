import React, { useState, useEffect } from 'react';
import { Plus, Flame, Clock, Calendar, Sparkles, Play, Shield } from 'lucide-react';
import { Button } from '../common/Button';
import { getGreeting, formatDisplayDate } from '../../utils/dateUtils';

const QUOTES = [
  "“Let’s make today count.”",
  "“We are what we repeatedly do. Excellence is a habit.”",
  "“Consistency is the superpower of high achievers.”",
  "“Win the morning, win the day.”",
  "“Focus on the process, and the results will take care of themselves.”"
];

export const WelcomeHeader = ({
  userProfile = {},
  stats = {},
  lifeScore = {},
  onOpenNewHabit,
  onOpenFocus
}) => {
  const greeting = getGreeting();
  const userName = userProfile.name || 'Muthuselvam';
  const currentDate = formatDisplayDate();
  const { currentStreak = 0 } = stats;

  const [timeStr, setTimeStr] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-header-banner anim-scale-in">
      <div className="dashboard-header-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: '900', letterSpacing: '-0.03em', margin: 0 }}>
            {greeting}, {userName} 👋
          </h1>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              padding: '0.2rem 0.65rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              color: 'var(--primary-blue)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Sparkles size={13} /> Level {userProfile?.level || 7}
          </span>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-grey)', marginTop: '0.35rem', fontStyle: 'italic', fontWeight: '500' }}>
          {QUOTES[quoteIndex]}
        </p>

        <div className="dashboard-header-meta" style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <span className="dashboard-date-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600' }}>
            <Calendar size={13} /> {currentDate}
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--color-light-grey)',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              fontWeight: '700',
              color: 'var(--color-navy)',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            <Clock size={13} color="var(--primary-blue)" /> {timeStr}
          </span>

          <span className="badge-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}>
            <Flame size={14} color="#F97316" fill="#F97316" /> {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'} Streak
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#059669',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              fontWeight: '800'
            }}
          >
            ⚡ Life Score: {lifeScore?.totalLifeScore ?? 87}/100
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {onOpenFocus && (
          <button
            type="button"
            onClick={onOpenFocus}
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontWeight: '700',
              padding: '0.65rem 1rem'
            }}
          >
            <Play size={16} color="var(--primary-blue)" fill="var(--primary-blue)" />
            <span>Focus Mode</span>
          </button>
        )}
        <Button variant="primary" onClick={onOpenNewHabit} icon={Plus}>
          Add Habit
        </Button>
      </div>
    </div>
  );
};

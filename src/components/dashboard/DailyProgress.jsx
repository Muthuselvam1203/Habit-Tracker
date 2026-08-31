import React from 'react';
import { ProgressRing } from '../common/ProgressRing';
import { Target, CheckCircle2 } from 'lucide-react';

export const DailyProgress = ({ stats = {} }) => {
  const {
    todayCompletionRate = 0,
    dueToday = 0,
    completedToday = 0
  } = stats;

  return (
    <div className="daily-score-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-black)', fontSize: '0.95rem', fontWeight: '700' }}>
        <Target size={17} color="var(--primary-blue)" />
        <span>Today's Score</span>
      </div>

      <div className="daily-score-ring-wrap">
        <ProgressRing
          radius={52}
          stroke={7}
          progress={todayCompletionRate}
          strokeColor="var(--primary-blue)"
          trackColor="#E7EBF0"
        >
          <div className="daily-score-text">
            {todayCompletionRate}
          </div>
          <div className="daily-score-max">
            / 100
          </div>
        </ProgressRing>
      </div>

      <div style={{ fontSize: '0.825rem', color: 'var(--color-text-grey)', fontWeight: '500' }}>
        {dueToday === 0 ? (
          'No habits scheduled today'
        ) : todayCompletionRate === 100 ? (
          <span style={{ color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            <CheckCircle2 size={15} /> All routines completed!
          </span>
        ) : (
          `${completedToday} of ${dueToday} habits checked off`
        )}
      </div>
    </div>
  );
};

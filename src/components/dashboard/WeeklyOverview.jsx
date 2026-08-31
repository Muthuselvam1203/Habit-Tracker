import React, { useState } from 'react';
import { getWeeklyTrends } from '../../utils/analyticsUtils';
import { WeeklyReviewModal } from '../common/WeeklyReviewModal';
import { Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export const WeeklyOverview = ({ habits = [], completions = {} }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const weeklyTrends = getWeeklyTrends(habits, completions);

  const totalDue = weeklyTrends.reduce((acc, curr) => acc + curr.due, 0);
  const totalCompleted = weeklyTrends.reduce((acc, curr) => acc + curr.completed, 0);
  const weeklyRate = totalDue > 0 ? Math.round((totalCompleted / totalDue) * 100) : 0;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h4 className="card-title">
            <Calendar size={18} color="var(--primary-blue)" /> 7-Day Consistency Snapshot
          </h4>
          <p className="card-subtitle">
            {totalCompleted} of {totalDue} scheduled habits accomplished this week ({weeklyRate}%)
          </p>
        </div>

        <button
          onClick={() => setIsReviewOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{ fontWeight: '600' }}
        >
          View weekly review <ChevronRight size={14} />
        </button>
      </div>

      {/* 7-Day Bar Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '0.5rem' }}>
        {weeklyTrends.map((d) => {
          const isPerfect = d.due > 0 && d.completed >= d.due;

          return (
            <div
              key={d.dateKey}
              style={{
                backgroundColor: isPerfect ? 'var(--status-success-bg)' : d.rate > 0 ? 'var(--color-light-blue)' : 'var(--color-light-grey)',
                border: `1px solid ${isPerfect ? 'var(--status-success-border)' : d.isToday ? 'var(--primary-blue)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 0.5rem',
                textAlign: 'center',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-grey)' }}>
                {d.dayName}
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  color: isPerfect ? 'var(--status-success-text)' : d.rate > 0 ? 'var(--color-blue)' : 'var(--color-black)',
                  marginTop: '4px'
                }}
              >
                {d.rate}%
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
                {d.completed}/{d.due}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Review Modal */}
      <WeeklyReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        habits={habits}
        completions={completions}
      />
    </div>
  );
};

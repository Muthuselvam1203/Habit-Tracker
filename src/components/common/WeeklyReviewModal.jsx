import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { getAnalyticsSummary } from '../../utils/analyticsUtils';
import { CheckCircle2, TrendingUp, Flame, AlertCircle, Award } from 'lucide-react';

export const WeeklyReviewModal = ({
  isOpen,
  onClose,
  habits = [],
  completions = {}
}) => {
  const summary = getAnalyticsSummary(habits, completions);
  const { bestHabit, mostMissedHabit, weeklyRate, weeklyTrends } = summary;

  const totalDue = weeklyTrends.reduce((acc, curr) => acc + curr.due, 0);
  const totalCompleted = weeklyTrends.reduce((acc, curr) => acc + curr.completed, 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Weekly Performance Review"
      subtitle="Your 7-day consistency breakdown and performance metrics"
      maxWidth="560px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem 0' }}>
        {/* KPI Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'var(--color-light-grey)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-grey)', textTransform: 'uppercase' }}>Completed</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-black)', marginTop: '0.2rem' }}>
              {totalCompleted} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', fontWeight: '500' }}>/ {totalDue}</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-light-grey)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-grey)', textTransform: 'uppercase' }}>Completion Rate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-blue)', marginTop: '0.2rem' }}>
              {weeklyRate}%
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-light-grey)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-grey)', textTransform: 'uppercase' }}>Best Day</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-black)', marginTop: '0.2rem' }}>
              {summary.bestDay}
            </div>
          </div>
        </div>

        {/* 7-Day Consistency Day Bar */}
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-black)', marginBottom: '0.5rem' }}>
            Daily Consistency Breakdown
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {weeklyTrends.map((d) => (
              <div
                key={d.dateKey}
                style={{
                  backgroundColor: d.rate === 100 ? 'var(--status-success-bg)' : d.rate > 0 ? 'var(--color-light-blue)' : 'var(--color-light-grey)',
                  border: `1px solid ${d.rate === 100 ? 'var(--status-success-border)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem 0.35rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-grey)' }}>{d.dayName}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: d.rate === 100 ? 'var(--status-success-text)' : d.rate > 0 ? 'var(--color-blue)' : 'var(--color-black)', marginTop: '2px' }}>
                  {d.rate}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best & Most Missed Habit Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {bestHabit && (
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.9rem 1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.775rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                <Award size={14} /> TOP PERFORMER
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-black)' }}>{bestHabit.name}</div>
              <div style={{ fontSize: '0.775rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
                {bestHabit.currentStreak} day streak ({bestHabit.rate30}% rate)
              </div>
            </div>
          )}

          {mostMissedHabit && (
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.9rem 1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B91C1C', fontSize: '0.775rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                <AlertCircle size={14} /> NEEDS ATTENTION
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-black)' }}>{mostMissedHabit.name}</div>
              <div style={{ fontSize: '0.775rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
                {mostMissedHabit.rate30}% 30-day completion
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button variant="primary" onClick={onClose}>
            Close Review
          </Button>
        </div>
      </div>
    </Modal>
  );
};

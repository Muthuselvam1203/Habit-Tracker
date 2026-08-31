import React from 'react';
import { ShieldCheck, ShieldAlert, RotateCcw, Plus, Trash2, PhoneOff, Shield, Zap } from 'lucide-react';
import { calculateBadHabitCleanDays } from '../../utils/streakUtils';

const ICON_MAP = {
  PhoneOff,
  Shield,
  Zap,
  ShieldCheck
};

export const BadHabitsSection = ({
  badHabits = [],
  onResetBadHabit,
  onAddBadHabit,
  onDeleteBadHabit,
  onNavigate
}) => {
  return (
    <div
      className="card"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--border-subtle)',
        padding: '1.25rem',
        marginBottom: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <ShieldCheck size={18} color="#10B981" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-black)', margin: 0 }}>
            Bad Habits Avoided & Clean Streaks
          </h4>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-grey)' }}>
          Abstinence & Discipline
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
        {badHabits.map((bh) => {
          const { currentCleanDays, bestCleanDays } = calculateBadHabitCleanDays(bh);
          const IconComp = ICON_MAP[bh.icon] || ShieldCheck;

          return (
            <div
              key={bh.id}
              style={{
                padding: '0.9rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={18} />
                </div>

                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--color-black)' }}>
                    {bh.name}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
                    Record: {bestCleanDays} days • {bh.reason || 'Self-mastery'}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '900',
                    color: '#059669',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  🔥 {currentCleanDays} {currentCleanDays === 1 ? 'day' : 'days'}
                </div>

                <button
                  type="button"
                  onClick={() => onResetBadHabit(bh.id)}
                  title="Log a relapse and restart clean streak"
                  style={{
                    fontSize: '0.675rem',
                    fontWeight: '700',
                    color: 'var(--color-text-grey)',
                    background: 'none',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '0.15rem 0.4rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#EF4444';
                    e.currentTarget.style.borderColor = '#FCA5A5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-grey)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <RotateCcw size={10} /> Reset
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

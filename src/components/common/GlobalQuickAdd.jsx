import React, { useState } from 'react';
import {
  Plus,
  X,
  CheckSquare,
  Target,
  Zap,
  Droplets,
  BookOpen,
  Smile,
  Sparkles
} from 'lucide-react';

export const GlobalQuickAdd = ({
  onOpenNewHabit,
  onOpenNewTask,
  onOpenNewGoal,
  onAddWater,
  onOpenFocus,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (callback) => {
    setIsOpen(false);
    if (callback) callback();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Quick Add Menu"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '54px',
          height: '54px',
          borderRadius: '999px',
          backgroundColor: 'var(--primary-blue)',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 850,
          border: 'none',
          cursor: 'pointer',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>

      {/* Quick Add Popover Modal */}
      {isOpen && (
        <div
          className="anim-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 17, 31, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 840,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5.5rem 1.5rem 1.5rem 1.5rem'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="anim-scale-in"
            style={{
              width: '100%',
              maxWidth: '340px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              padding: '1.25rem',
              marginBottom: '3.5rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              ⚡ Quick Action Launch
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleAction(onOpenNewHabit)}
                style={quickItemStyle('#2563EB')}
              >
                <CheckSquare size={18} color="#2563EB" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>New Habit</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(onOpenNewTask)}
                style={quickItemStyle('#10B981')}
              >
                <CheckSquare size={18} color="#10B981" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>New Task</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(onOpenNewGoal)}
                style={quickItemStyle('#8B5CF6')}
              >
                <Target size={18} color="#8B5CF6" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>New Goal</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(onOpenFocus)}
                style={quickItemStyle('#F59E0B')}
              >
                <Zap size={18} color="#F59E0B" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Start Focus</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(() => onAddWater(250))}
                style={quickItemStyle('#0891B2')}
              >
                <Droplets size={18} color="#0891B2" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>+250ml Water</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(() => onNavigate('journal'))}
                style={quickItemStyle('#EC4899')}
              >
                <BookOpen size={18} color="#EC4899" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Write Journal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const quickItemStyle = (accentColor) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.35rem',
  padding: '0.85rem 0.5rem',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--bg-surface)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  transition: 'all 0.15s',
  textAlign: 'center'
});

import React, { useState } from 'react';
import {
  Sun,
  Moon,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Sparkles,
  ArrowRight,
  Edit3,
  Trash2,
  Flame,
  Zap,
  Droplets,
  Dumbbell,
  Heart,
  BookOpen,
  Coffee,
  CheckSquare,
  PhoneOff,
  Wind
} from 'lucide-react';
import { formatDateKey, formatTime } from '../utils/dateUtils';
import { Button } from '../components/common/Button';

const ICON_MAP = {
  Sun,
  Moon,
  Sparkles,
  Droplets,
  Dumbbell,
  Heart,
  BookOpen,
  Coffee,
  CheckSquare,
  PhoneOff,
  Wind,
  Clock
};

export const Routines = ({
  morningRoutine = [],
  nightRoutine = [],
  routineLogs = {},
  onToggleRoutineStep,
  onSetMorningRoutine,
  onSetNightRoutine
}) => {
  const [activeTab, setActiveTab] = useState('morning'); // 'morning' | 'night'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepTime, setNewStepTime] = useState('07:00');
  const [newStepDuration, setNewStepDuration] = useState(15);
  const [newStepNotes, setNewStepNotes] = useState('');

  const todayKey = formatDateKey(new Date());
  const todayLogs = routineLogs[todayKey] || { morningCompletedIds: [], nightCompletedIds: [] };

  const currentRoutine = activeTab === 'morning' ? morningRoutine : nightRoutine;
  const completedIds = activeTab === 'morning' ? (todayLogs.morningCompletedIds || []) : (todayLogs.nightCompletedIds || []);
  const completedCount = currentRoutine.filter(item => completedIds.includes(item.id)).length;
  const totalCount = currentRoutine.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Calculate ahead/behind routine schedule
  const aheadMinutes = Math.max(0, completedCount * 4);

  const handleAddStep = (e) => {
    e.preventDefault();
    if (!newStepTitle.trim()) return;

    const newStep = {
      id: `${activeTab === 'morning' ? 'mr' : 'nr'}-${Date.now()}`,
      title: newStepTitle.trim(),
      scheduledTime: newStepTime,
      durationMin: Number(newStepDuration) || 10,
      icon: activeTab === 'morning' ? 'Sun' : 'Moon',
      notes: newStepNotes.trim()
    };

    if (activeTab === 'morning') {
      onSetMorningRoutine([...morningRoutine, newStep]);
    } else {
      onSetNightRoutine([...nightRoutine, newStep]);
    }

    setNewStepTitle('');
    setNewStepNotes('');
    setIsAddModalOpen(false);
  };

  const handleDeleteStep = (id) => {
    if (activeTab === 'morning') {
      onSetMorningRoutine(morningRoutine.filter(s => s.id !== id));
    } else {
      onSetNightRoutine(nightRoutine.filter(s => s.id !== id));
    }
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={24} color="var(--primary-blue)" /> Daily Routine Operating System
          </h2>
          <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Design your ideal morning ramp-up and evening wind-down rituals to eliminate decision fatigue.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
          style={{ fontWeight: '700' }}
        >
          <Plus size={16} /> Add Routine Step
        </button>
      </div>

      {/* Routine Tabs (Morning / Night) */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: 'var(--color-white)',
          padding: '0.4rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          width: 'fit-content'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('morning')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: '800',
            backgroundColor: activeTab === 'morning' ? '#F59E0B' : 'transparent',
            color: activeTab === 'morning' ? '#FFFFFF' : 'var(--color-text-grey)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'morning' ? '0 2px 10px rgba(245, 158, 11, 0.35)' : 'none'
          }}
        >
          <Sun size={18} />
          <span>Morning Ritual ({morningRoutine.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('night')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: '800',
            backgroundColor: activeTab === 'night' ? '#6366F1' : 'transparent',
            color: activeTab === 'night' ? '#FFFFFF' : 'var(--color-text-grey)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'night' ? '0 2px 10px rgba(99, 102, 241, 0.35)' : 'none'
          }}
        >
          <Moon size={18} />
          <span>Night Wind-Down ({nightRoutine.length})</span>
        </button>
      </div>

      {/* Routine Progress Hero Card */}
      <div
        className="card"
        style={{
          background: activeTab === 'morning'
            ? 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
            : 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
          border: `1px solid ${activeTab === 'morning' ? '#FDE68A' : '#C7D2FE'}`,
          padding: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: activeTab === 'morning' ? '#B45309' : '#4338CA', letterSpacing: '0.05em' }}>
              {activeTab === 'morning' ? '🌅 Morning Focus' : '🌙 Evening Mastery'}
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-black)', margin: '0.2rem 0' }}>
              {completedCount} of {totalCount} Steps Completed ({progressPercent}%)
            </h3>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: activeTab === 'morning' ? '#D97706' : '#4F46E5', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={15} /> You are {aheadMinutes} min ahead of your routine tempo ⚡
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: activeTab === 'morning' ? '#D97706' : '#4F46E5' }}>
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: '10px',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: activeTab === 'morning' ? '#F59E0B' : '#6366F1',
              borderRadius: '999px',
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>
      </div>

      {/* Routine Steps List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {currentRoutine.map((step, index) => {
          const isDone = completedIds.includes(step.id);
          const IconComp = ICON_MAP[step.icon] || (activeTab === 'morning' ? Sun : Moon);
          const themeColor = activeTab === 'morning' ? '#F59E0B' : '#6366F1';

          return (
            <div
              key={step.id}
              className="anim-scale-in"
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `5px solid ${isDone ? '#10B981' : themeColor}`,
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                opacity: isDone ? 0.8 : 1,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => onToggleRoutineStep(activeTab, step.id)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? '#10B981' : 'transparent',
                    border: `2px solid ${isDone ? '#10B981' : 'var(--border-medium)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    flexShrink: 0,
                    transition: 'all 0.15s'
                  }}
                >
                  {isDone && <CheckCircle2 size={18} />}
                </button>

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: `${themeColor}15`,
                    color: themeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={18} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.725rem',
                        fontWeight: '800',
                        backgroundColor: 'var(--color-light-grey)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        color: 'var(--color-black)',
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      {formatTime(step.scheduledTime)}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '600' }}>
                      ({step.durationMin} mins)
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.975rem',
                      fontWeight: '800',
                      color: 'var(--color-black)',
                      textDecoration: isDone ? 'line-through' : 'none',
                      marginTop: '0.2rem'
                    }}
                  >
                    {step.title}
                  </div>

                  {step.notes && (
                    <div style={{ fontSize: '0.775rem', color: 'var(--color-text-grey)', marginTop: '0.15rem' }}>
                      {step.notes}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => onToggleRoutineStep(activeTab, step.id)}
                  className={`btn btn-sm ${isDone ? 'btn-secondary' : 'btn-primary'}`}
                  style={{
                    backgroundColor: isDone ? undefined : themeColor,
                    borderColor: isDone ? undefined : themeColor,
                    fontWeight: '700'
                  }}
                >
                  {isDone ? 'Done ✓' : 'Mark Done'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteStep(step.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  style={{ color: '#991B1B' }}
                  title="Remove step"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Step Modal */}
      {isAddModalOpen && (
        <div
          className="anim-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            className="card anim-scale-in"
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem' }}>
              Add {activeTab === 'morning' ? 'Morning' : 'Night'} Routine Step
            </h3>

            <form onSubmit={handleAddStep} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Step Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 10m Box Breathing"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Scheduled Time</label>
                  <input
                    type="time"
                    className="form-input"
                    value={newStepTime}
                    onChange={(e) => setNewStepTime(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    className="form-input"
                    value={newStepDuration}
                    onChange={(e) => setNewStepDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes / Instructions</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Use 4-7-8 calming rhythm"
                  value={newStepNotes}
                  onChange={(e) => setNewStepNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Button variant="secondary" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Step
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

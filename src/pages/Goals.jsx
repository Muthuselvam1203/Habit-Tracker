import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Flame, ArrowRight, Trash2, Edit3, Sparkles, Layers, Dumbbell, Heart, BookOpen, Zap } from 'lucide-react';
import { Button } from '../components/common/Button';
import { calculateHabitStreak } from '../utils/streakUtils';

const ICON_MAP = {
  Target,
  Dumbbell,
  Heart,
  BookOpen,
  Zap,
  Sparkles
};

export const Goals = ({
  goals = [],
  habits = [],
  completions = {},
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onOpenHabitDetails
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('health');
  const [color, setColor] = useState('#10B981');
  const [selectedHabitIds, setSelectedHabitIds] = useState([]);

  const activeHabits = habits.filter(h => !h.archived);

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddGoal({
      title: title.trim(),
      description: description.trim(),
      category,
      color,
      habitIds: selectedHabitIds
    });

    setTitle('');
    setDescription('');
    setSelectedHabitIds([]);
    setIsAddModalOpen(false);
  };

  const toggleHabitSelection = (id) => {
    setSelectedHabitIds(prev => 
      prev.includes(id) ? prev.filter(hId => hId !== id) : [...prev, id]
    );
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={24} color="var(--primary-blue)" /> Goals → Habits Architecture
          </h2>
          <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Connect high-level life aspirations to daily measurable habits and automated execution pipelines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
          style={{ fontWeight: '700' }}
        >
          <Plus size={16} /> Create Life Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {goals.map(goal => {
          const linkedHabits = activeHabits.filter(h => 
            (goal.habitIds || []).includes(h.id) || h.goalId === goal.id
          );

          let totalStreak = 0;
          let completedTodayCount = 0;

          linkedHabits.forEach(h => {
            const { currentStreak, isCompletedToday } = calculateHabitStreak(h, completions);
            totalStreak += currentStreak;
            if (isCompletedToday) completedTodayCount++;
          });

          const progressPercent = linkedHabits.length > 0
            ? Math.round((completedTodayCount / linkedHabits.length) * 100)
            : 75;

          const IconComp = ICON_MAP[goal.icon] || Target;
          const goalColor = goal.color || '#10B981';

          return (
            <div
              key={goal.id}
              className="card anim-scale-in"
              style={{
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--border-subtle)',
                borderTop: `4px solid ${goalColor}`,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: `${goalColor}18`,
                        color: goalColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconComp size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-black)', margin: 0 }}>
                        {goal.title}
                      </h3>
                      <span style={{ fontSize: '0.725rem', fontWeight: '700', textTransform: 'capitalize', color: goalColor }}>
                        {goal.category}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteGoal(goal.id)}
                    className="btn btn-ghost btn-icon btn-sm"
                    style={{ color: '#991B1B' }}
                    title="Delete goal"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-grey)', margin: '0 0 1rem 0' }}>
                  {goal.description || 'Continuous daily progression towards mastery.'}
                </p>

                {/* Progress bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--color-black)' }}>Goal Daily Follow-Through</span>
                    <span style={{ color: goalColor }}>{progressPercent}%</span>
                  </div>
                  <div
                    style={{
                      height: '6px',
                      width: '100%',
                      backgroundColor: 'var(--color-light-grey)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${progressPercent}%`,
                        backgroundColor: goalColor,
                        borderRadius: '999px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Linked Habits Sub-list */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-text-grey)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                    Linked Daily Habits ({linkedHabits.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {linkedHabits.map(h => {
                      const { currentStreak, isCompletedToday } = calculateHabitStreak(h, completions);
                      return (
                        <div
                          key={h.id}
                          onClick={() => onOpenHabitDetails && onOpenHabitDetails(h)}
                          style={{
                            padding: '0.45rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--color-light-grey)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-black)' }}>
                            {isCompletedToday ? '✓ ' : '○ '} {h.name}
                          </span>
                          <span style={{ fontSize: '0.725rem', fontWeight: '700', color: '#F97316' }}>
                            🔥 {currentStreak}d
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
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
              maxWidth: '480px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem' }}>
              Create High-Level Goal
            </h3>

            <form onSubmit={handleCreateGoal} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Goal Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Master Full-Stack Architecture"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Vision</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Why is this meaningful to your life?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="health">Health & Body</option>
                    <option value="mind">Mind & Calm</option>
                    <option value="learning">Learning & Skills</option>
                    <option value="productivity">Productivity</option>
                    <option value="social">Social & Family</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Color Accent</label>
                  <input
                    type="color"
                    className="form-input"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ height: '42px', padding: '2px' }}
                  />
                </div>
              </div>

              {/* Link Habits Checkbox List */}
              <div className="form-group">
                <label className="form-label">Link Habits to this Goal</label>
                <div style={{ maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.5rem' }}>
                  {activeHabits.map(h => (
                    <label key={h.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedHabitIds.includes(h.id)}
                        onChange={() => toggleHabitSelection(h.id)}
                      />
                      <span>{h.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Button variant="secondary" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Establish Goal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

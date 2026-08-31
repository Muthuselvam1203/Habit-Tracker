import React, { useState } from 'react';
import { PenTool, Sparkles, CheckCircle2, Calendar, BookOpen, Heart, Award, Save } from 'lucide-react';
import { formatDateKey, formatDisplayDate } from '../utils/dateUtils';
import { Button } from '../components/common/Button';

export const DailyJournal = ({
  wellnessLogs = {},
  onUpdateWellness
}) => {
  const [selectedDateKey, setSelectedDateKey] = useState(formatDateKey(new Date()));
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const dayData = wellnessLogs[selectedDateKey] || {};
  const currentJournal = dayData.journal || {
    wentWell: '',
    learned: '',
    improveTomorrow: '',
    gratitude: '',
    wins: '',
    thoughts: ''
  };

  const [formState, setFormState] = useState(currentJournal);

  // Sync form state when selected date changes
  const handleDateChange = (newDateKey) => {
    setSelectedDateKey(newDateKey);
    const newDayData = wellnessLogs[newDateKey] || {};
    setFormState(newDayData.journal || {
      wentWell: '',
      learned: '',
      improveTomorrow: '',
      gratitude: '',
      wins: '',
      thoughts: ''
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateWellness({ journal: formState }, selectedDateKey);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2500);
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PenTool size={24} color="var(--primary-blue)" /> Daily Reflection & Wins Journal
          </h2>
          <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Transform daily experience into wisdom. Reflect on wins, mental models learned, and continuous self-correction.
          </p>
        </div>

        {/* Date Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-grey)' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> Date:
          </span>
          <input
            type="date"
            className="form-input"
            value={selectedDateKey}
            onChange={(e) => handleDateChange(e.target.value)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', width: 'auto' }}
          />
        </div>
      </div>

      {isSavedAlert && (
        <div
          className="anim-scale-in"
          style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#059669',
            fontSize: '0.875rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <CheckCircle2 size={18} /> Daily reflection entry saved securely to your local Life OS!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* 3 Core Daily Prompts Card */}
        <div className="card" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Sparkles size={18} color="var(--primary-blue)" /> The 3 Essential Daily Prompts
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '0.9rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={16} /> 1. What went well today? (Daily Wins)
              </label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="List your accomplishments, disciplined choices, and micro-victories..."
                value={formState.wentWell || ''}
                onChange={(e) => setFormState({ ...formState, wentWell: e.target.value })}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '0.9rem', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} /> 2. What did I learn today? (Key Insights)
              </label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="What mental model, coding concept, book highlight, or life lesson clicked?"
                value={formState.learned || ''}
                onChange={(e) => setFormState({ ...formState, learned: e.target.value })}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '0.9rem', color: '#D97706', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} /> 3. What can I improve tomorrow? (Actionable Adjustment)
              </label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="What 1% friction can be eliminated or executed better tomorrow?"
                value={formState.improveTomorrow || ''}
                onChange={(e) => setFormState({ ...formState, improveTomorrow: e.target.value })}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* Gratitude & Free Thoughts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#E11D48' }}>
              <Heart size={16} /> Daily Gratitude
            </h4>
            <textarea
              className="form-input"
              rows={4}
              placeholder="3 things you are genuinely grateful for right now..."
              value={formState.gratitude || ''}
              onChange={(e) => setFormState({ ...formState, gratitude: e.target.value })}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="card" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-black)' }}>
              <PenTool size={16} /> Free Reflections & Stream of Thought
            </h4>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Unload mental clutter, ideas, plans, and stream of consciousness..."
              value={formState.thoughts || ''}
              onChange={(e) => setFormState({ ...formState, thoughts: e.target.value })}
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Save CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button variant="primary" size="lg" type="submit" icon={Save}>
            Save Daily Journal Entry
          </Button>
        </div>
      </form>
    </div>
  );
};

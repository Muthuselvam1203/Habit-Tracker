import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { getHabitColor } from '../../data/habitOptions';

export const QuickAddHabit = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    const trimmedName = habitName.trim();
    const habitColor = getHabitColor({ name: trimmedName });

    onAddHabit({
      name: trimmedName,
      category: 'health',
      icon: 'Sparkles',
      color: habitColor,
      timeOfDay: 'morning',
      targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      reminderTime: '08:00',
      description: ''
    });

    setHabitName('');
  };

  return (
    <form onSubmit={handleSubmit} className="quick-add-card">
      <Plus size={18} color="var(--primary-blue)" />
      <input
        type="text"
        className="quick-add-input"
        placeholder="Quick add a new daily habit (e.g. Read 15 pages, Drink 2L water)..."
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <Button
        variant="primary"
        size="sm"
        type="submit"
        disabled={!habitName.trim()}
      >
        Add Habit
      </Button>
    </form>
  );
};

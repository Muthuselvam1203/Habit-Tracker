import React, { useState, useEffect } from 'react';
import { HabitExplorerModal } from './HabitExplorerModal';
import { HabitCustomizerModal } from './HabitCustomizerModal';

export const HabitModal = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [view, setView] = useState('explorer'); // 'explorer' | 'customizer'
  const [selectedHabitData, setSelectedHabitData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setSelectedHabitData(initialData);
      setView('customizer');
    } else {
      setSelectedHabitData(null);
      setView('explorer');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  if (view === 'explorer' && !initialData) {
    return (
      <HabitExplorerModal
        onSelectHabit={(preset) => {
          onSave(preset);
          onClose();
        }}
        onOpenCustomizer={() => {
          setSelectedHabitData(null);
          setView('customizer');
        }}
        onClose={onClose}
      />
    );
  }

  return (
    <HabitCustomizerModal
      initialHabit={selectedHabitData || initialData}
      onSave={(data) => {
        onSave(data);
        onClose();
      }}
      onClose={onClose}
    />
  );
};

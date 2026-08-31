import React from 'react';
import { Modal } from '../common/Modal';
import { HabitForm } from './HabitForm';

export const HabitModal = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Habit' : 'Create New Habit'}
      subtitle={initialData ? 'Modify routine details and reminders.' : 'Set up a consistent daily routine.'}
      maxWidth="540px"
    >
      <HabitForm
        initialData={initialData}
        onSave={(data) => {
          onSave(data);
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
};

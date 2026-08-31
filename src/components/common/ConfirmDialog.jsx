import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="440px">
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', margin: '0.5rem 0 1.5rem 0' }}>
        {isDanger && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <AlertCircle size={20} />
          </div>
        )}
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {message}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          variant={isDanger ? 'danger' : 'primary'}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

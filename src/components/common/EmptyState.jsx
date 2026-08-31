import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No habits yet',
  description = 'Start with one small habit. Small steps every day create big changes over time.',
  actionLabel,
  onAction
}) => {
  return (
    <div
      className="anim-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        gap: '1rem',
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border-medium)',
        margin: '1rem 0'
      }}
    >
      {Icon && (
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-light-blue)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.25rem'
          }}
        >
          <Icon size={26} />
        </div>
      )}

      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-black)' }}>
          {title}
        </h3>
        <p style={{ maxWidth: '360px', fontSize: '0.875rem', color: 'var(--color-text-grey)', marginTop: '0.35rem' }}>
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} style={{ marginTop: '0.5rem' }}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

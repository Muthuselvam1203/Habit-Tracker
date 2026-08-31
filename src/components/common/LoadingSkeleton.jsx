import React from 'react';

export const LoadingSkeleton = ({
  height = '20px',
  width = '100%',
  borderRadius = 'var(--radius-sm)',
  className = '',
  count = 1
}) => {
  const skeletons = Array.from({ length: count });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
      {skeletons.map((_, i) => (
        <div
          key={i}
          className={className}
          style={{
            height,
            width,
            borderRadius,
            backgroundColor: 'var(--bg-surface-elevated)',
            backgroundImage: 'linear-gradient(90deg, var(--bg-surface-elevated) 0%, rgba(255,255,255,0.06) 50%, var(--bg-surface-elevated) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s infinite linear'
          }}
        />
      ))}
    </div>
  );
};

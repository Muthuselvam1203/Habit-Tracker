import React from 'react';

export const ProgressRing = ({
  radius = 45,
  stroke = 6,
  progress = 0,
  strokeColor = '#2563EB',
  trackColor = '#E7EBF0',
  children
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: radius * 2, height: radius * 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        height={radius * 2}
        width={radius * 2}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Dynamic Progress Fill */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {children && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

import React from 'react';

export const AnalyticsCard = ({
  title,
  subtitle,
  icon: Icon,
  children
}) => {
  return (
    <div className="analytics-chart-card">
      <div className="analytics-chart-header">
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-black)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {Icon && <Icon size={18} color="var(--primary-blue)" />}
            <span>{title}</span>
          </h4>
          {subtitle && (
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: '220px' }}>
        {children}
      </div>
    </div>
  );
};

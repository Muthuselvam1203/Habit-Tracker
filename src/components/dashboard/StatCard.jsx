import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = 'var(--color-light-blue)',
  iconColor = 'var(--primary-blue)'
}) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon-box"
        style={{
          backgroundColor: iconBg,
          color: iconColor
        }}
      >
        <Icon size={22} />
      </div>

      <div className="stat-card-info">
        <span className="stat-card-label">{title}</span>
        <span className="stat-card-value">{value}</span>
        {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
};

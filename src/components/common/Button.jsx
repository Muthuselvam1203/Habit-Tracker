import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = `btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${className}`.trim();

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
          {children}
          {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        </>
      )}
    </button>
  );
};

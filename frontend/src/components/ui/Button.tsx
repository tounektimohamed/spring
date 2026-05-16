import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary: 'bg-primary text-background hover:bg-primaryDark shadow-glow',
  secondary: 'bg-surfaceHigh text-textPrimary border border-border hover:bg-surface',
  ghost: 'text-textMuted hover:text-textPrimary hover:bg-surfaceHigh',
  danger: 'bg-danger text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-card font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

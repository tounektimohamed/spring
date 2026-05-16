import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-textMuted mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-surface border rounded-card px-4 py-3 text-textPrimary placeholder-textMuted outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${error ? 'border-danger' : 'border-border'} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-surfaceHigh text-textMuted',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  danger: 'bg-danger/20 text-danger',
  primary: 'bg-primary/20 text-primary',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function BadgeUi({ text, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span className={`rounded-pill font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {text}
    </span>
  );
}

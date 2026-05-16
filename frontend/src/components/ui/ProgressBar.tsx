interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, color = 'bg-primary', size = 'md', showLabel = false }: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className="w-full">
      <div className={`w-full bg-surfaceHigh rounded-pill overflow-hidden ${heights[size]}`}>
        <div
          className={`h-full rounded-pill transition-all duration-700 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-textMuted mt-1">{pct.toFixed(0)}%</p>
      )}
    </div>
  );
}

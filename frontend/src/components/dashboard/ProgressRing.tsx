interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
}

export function ProgressRing({
  progress, size = 100, strokeWidth = 8, color, title, completedLessons, totalLessons,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#1E293B" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
          className="font-display font-bold" fill="currentColor" fontSize={size * 0.22}>
          {Math.round(progress)}%
        </text>
      </svg>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-textMuted">{completedLessons}/{totalLessons}</p>
    </div>
  );
}

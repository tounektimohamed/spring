import { ProgressBar } from '../ui/ProgressBar';

interface LessonProgressProps {
  current: number;
  total: number;
}

export function LessonProgress({ current, total }: LessonProgressProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-textMuted">{current}/{total}</span>
      <div className="flex-1">
        <ProgressBar value={current} max={total} size="sm" />
      </div>
    </div>
  );
}

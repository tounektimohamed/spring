import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface ContinueCardProps {
  nextLessonId: number | null;
  phaseTitle: string;
}

export function ContinueCard({ nextLessonId, phaseTitle }: ContinueCardProps) {
  if (!nextLessonId) {
    return (
      <div className="bg-surface border border-border rounded-card p-6">
        <p className="text-textMuted text-sm">🎉 أحسنت! أكملت جميع الدروس المتاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-primary/30 rounded-card p-6 shadow-glow">
      <p className="text-sm text-textMuted mb-1">استكمل التعلم</p>
      <p className="font-medium mb-3">{phaseTitle}</p>
      <Link to={`/lessons/${nextLessonId}`}>
        <Button size="md">→ استكمل الدرس التالي</Button>
      </Link>
    </div>
  );
}

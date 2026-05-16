import type { RecentLesson } from '../../types/progress';

interface RecentActivityProps {
  recent: RecentLesson[];
}

export function RecentActivity({ recent }: RecentActivityProps) {
  if (recent.length === 0) {
    return <p className="text-textMuted text-sm">لا يوجد نشاط حديث</p>;
  }

  return (
    <div className="space-y-3">
      {recent.map((r, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-surfaceHigh/50 rounded-card">
          <div className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{r.lessonTitle}</p>
            <p className="text-xs text-textMuted">{r.courseTitle} → {r.moduleTitle}</p>
          </div>
          <div className="text-xs text-textMuted text-right">
            <p>{r.completedAt ? new Date(r.completedAt).toLocaleDateString('ar-EG') : ''}</p>
            {r.quizScore != null && <p className="text-success">{r.quizScore}%</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

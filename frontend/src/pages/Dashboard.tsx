import { useDashboard } from '../hooks/useProgress';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { StreakCard } from '../components/dashboard/StreakCard';
import { ProgressRing } from '../components/dashboard/ProgressRing';
import { BadgeShelf } from '../components/dashboard/BadgeShelf';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ContinueCard } from '../components/dashboard/ContinueCard';
import { Spinner } from '../components/ui/Spinner';

export default function Dashboard() {
  const { data: dash, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (!dash) return null;

  const firstIncomplete = dash.phases.find(p => p.nextLessonId);

  return (
    <AppShell>
      <TopBar title="لوحة التحكم" subtitle={`${dash.completedLessons}/${dash.totalLessons} درس مكتمل`} />
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Row 1: Streak + Continue */}
        <div className="grid md:grid-cols-2 gap-4">
          <StreakCard currentStreak={dash.currentStreak} />
          <ContinueCard
            nextLessonId={firstIncomplete?.nextLessonId ?? null}
            phaseTitle={firstIncomplete?.title ?? 'جميع الدروس مكتملة'}
          />
        </div>

        {/* Row 2: Progress Rings */}
        <div>
          <h2 className="text-lg font-display font-semibold mb-4">تقدمك حسب المراحل</h2>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {dash.phases.map((phase) => (
              <ProgressRing
                key={phase.courseId}
                progress={phase.progress}
                color={phase.color}
                title={phase.title.split(':')[0]}
                completedLessons={phase.completedLessons}
                totalLessons={phase.totalLessons}
              />
            ))}
          </div>
        </div>

        {/* Row 3: Badges */}
        <div>
          <h2 className="text-lg font-display font-semibold mb-4">الشارات</h2>
          <BadgeShelf badges={dash.badges} />
        </div>

        {/* Row 4: Recent Activity */}
        <div>
          <h2 className="text-lg font-display font-semibold mb-4">آخر نشاط</h2>
          <RecentActivity recent={dash.recentLessons} />
        </div>
      </div>
    </AppShell>
  );
}

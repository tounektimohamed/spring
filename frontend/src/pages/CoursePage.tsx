import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourse } from '../hooks/useCourse';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Spinner } from '../components/ui/Spinner';
import type { LessonResponse } from '../types/course';

const lessonIcons: Record<string, string> = {
  THEORY: '📖', CODE: '💻', PRACTICE: '🧪', PROJECT: '🎯',
};

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: course, isLoading } = useCourse(slug || 'phase-1-foundation');

  if (isLoading) return <AppShell><div className="flex items-center justify-center min-h-screen"><Spinner size="lg" /></div></AppShell>;
  if (!course) return null;

  return (
    <AppShell>
      <TopBar title={course.title} subtitle={`${course.modules.length} وحدات`} />
      <div className="p-6 max-w-3xl mx-auto">
        {/* Phase header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">{course.icon}</span>
          <h1 className="text-3xl font-display font-bold mb-2">{course.title}</h1>
          <p className="text-textMuted">{course.description}</p>
        </div>

        {/* Vertical path */}
        <div className="relative">
          {course.modules.map((mod, modIdx) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: modIdx * 0.1 }}
              className="mb-8"
            >
              {/* Module header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                  {modIdx + 1}
                </div>
                <div>
                  <h3 className="font-display font-semibold">{mod.title}</h3>
                  <p className="text-xs text-textMuted">{mod.lessons.length} دروس</p>
                </div>
              </div>

              {/* Lesson nodes */}
              <div className="mr-5 space-y-0">
                {mod.lessons.map((lesson: LessonResponse, lIdx: number) => {
                  const isCompleted = lesson.completed;
                  const isLocked = !isCompleted && lIdx > 0 && !mod.lessons[lIdx - 1].completed;
                  const isCurrent = !isCompleted && !isLocked;

                  return (
                    <div key={lesson.id} className="flex items-start gap-3 relative">
                      {/* Vertical line */}
                      {lIdx < mod.lessons.length - 1 && (
                        <div className="absolute right-[11px] top-8 w-0.5 h-full bg-border" />
                      )}

                      {/* Node */}
                      {isLocked ? (
                        <div className="w-6 h-6 rounded-full bg-surfaceHigh border border-border flex items-center justify-center flex-shrink-0 mt-1 z-10">
                          <span className="text-xs text-textMuted">🔒</span>
                        </div>
                      ) : isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-1 z-10">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      ) : (
                        <Link to={`/lessons/${lesson.id}`}>
                          <motion.div
                            animate={isCurrent ? { boxShadow: ['0 0 0 0 rgba(34,211,238,0.4)', '0 0 0 8px rgba(34,211,238,0)', '0 0 0 0 rgba(34,211,238,0.4)'] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1 z-10 cursor-pointer"
                          >
                            <span className="text-xs">{lessonIcons[lesson.type] || '📖'}</span>
                          </motion.div>
                        </Link>
                      )}

                      {/* Lesson info */}
                      <div className={`flex-1 pb-6 ${isLocked ? 'opacity-50' : ''}`}>
                        {isLocked ? (
                          <p className="font-medium text-sm text-textMuted">{lesson.title}</p>
                        ) : (
                          <Link to={`/lessons/${lesson.id}`} className="font-medium text-sm hover:text-primary transition-colors">
                            {lesson.title}
                          </Link>
                        )}
                        <div className="flex gap-3 mt-1 text-xs text-textMuted">
                          <span>{lessonIcons[lesson.type]} {lesson.type === 'THEORY' ? 'نظري' : lesson.type === 'CODE' ? 'برمجة' : lesson.type === 'PRACTICE' ? 'تطبيقي' : 'مشروع'}</span>
                          {lesson.durationMinutes && <span>⏱ {lesson.durationMinutes} دقيقة</span>}
                          <span>⭐ {lesson.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

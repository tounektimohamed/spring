import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Spinner } from '../components/ui/Spinner';
import { ProgressBar } from '../components/ui/ProgressBar';
import { BadgeShelf } from '../components/dashboard/BadgeShelf';
import { useAuth } from '../hooks/useAuth';
import { useDashboard, useStreak } from '../hooks/useProgress';
import apiClient from '../api/client';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { data: dash, isLoading } = useDashboard();
  const { data: streak } = useStreak();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const handleSave = async () => {
    try {
      await apiClient.put('/users/me', { displayName });
      setEditing(false);
      window.location.reload();
    } catch {}
  };

  if (isLoading) {
    return <AppShell><div className="flex items-center justify-center min-h-screen"><Spinner size="lg" /></div></AppShell>;
  }

  return (
    <AppShell>
      <TopBar title="الملف الشخصي" />
      <div className="p-6 max-w-2xl mx-auto space-y-8">
        {/* Avatar + info */}
        <div className="bg-surface border border-border rounded-card p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold">
            {user?.displayName?.charAt(0) || '?'}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex gap-3 items-end">
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="الاسم"
                />
                <Button size="sm" onClick={handleSave}>حفظ</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>إلغاء</Button>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-display font-bold">{user?.displayName}</h1>
                <p className="text-textMuted text-sm">{user?.email}</p>
                <button onClick={() => setEditing(true)} className="text-xs text-primary mt-1 hover:underline">
                  تعديل الاسم
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        {dash && (
          <div className="bg-surface border border-border rounded-card p-6">
            <h2 className="font-display font-semibold mb-4">الإحصائيات</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surfaceHigh rounded-card p-4 text-center">
                <p className="text-2xl font-display font-bold text-primary">{dash.totalXp}</p>
                <p className="text-xs text-textMuted mt-1">إجمالي XP</p>
              </div>
              <div className="bg-surfaceHigh rounded-card p-4 text-center">
                <p className="text-2xl font-display font-bold text-success">{dash.completedLessons}</p>
                <p className="text-xs text-textMuted mt-1">درس مكتمل</p>
              </div>
              <div className="bg-surfaceHigh rounded-card p-4 text-center">
                <p className="text-2xl font-display font-bold text-warning">{dash.currentStreak} 🔥</p>
                <p className="text-xs text-textMuted mt-1">السجل الحالي</p>
              </div>
              <div className="bg-surfaceHigh rounded-card p-4 text-center">
                <p className="text-2xl font-display font-bold text-secondary">{streak?.lastActivity || '-'}</p>
                <p className="text-xs text-textMuted mt-1">آخر نشاط</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress by phase */}
        {dash && (
          <div className="bg-surface border border-border rounded-card p-6">
            <h2 className="font-display font-semibold mb-4">التقدم حسب المراحل</h2>
            <div className="space-y-4">
              {dash.phases.map((phase) => (
                <div key={phase.courseId}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{phase.title}</span>
                    <span className="text-textMuted">{phase.completedLessons}/{phase.totalLessons}</span>
                  </div>
                  <ProgressBar value={phase.progress} color="bg-primary" size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        {dash && (
          <div className="bg-surface border border-border rounded-card p-6">
            <h2 className="font-display font-semibold mb-4">الشارات</h2>
            <BadgeShelf badges={dash.badges} />
          </div>
        )}

        {/* Danger zone */}
        <div className="bg-surface border border-danger/30 rounded-card p-6">
          <h2 className="font-display font-semibold text-danger mb-2">منطقة الخطر</h2>
          <p className="text-sm text-textMuted mb-4">تسجيل الخروج من الحساب</p>
          <Button variant="danger" onClick={logout}>تسجيل الخروج 🚪</Button>
        </div>
      </div>
    </AppShell>
  );
}

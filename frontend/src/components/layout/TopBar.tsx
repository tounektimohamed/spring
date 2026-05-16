import { useAuth } from '../../hooks/useAuth';

export function TopBar({ title, subtitle }: { title?: string; subtitle?: string }) {
  const { user } = useAuth();
  return (
    <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        {title && <h1 className="text-lg font-display font-semibold">{title}</h1>}
        {subtitle && <p className="text-xs text-textMuted">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 text-sm text-textMuted">
        <span>{user?.displayName}</span>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
          {user?.displayName?.charAt(0) || '?'}
        </div>
      </div>
    </header>
  );
}

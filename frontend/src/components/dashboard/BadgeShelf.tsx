import type { BadgeResponse } from '../../types/progress';
import { Tooltip } from '../ui/Tooltip';

interface BadgeShelfProps {
  badges: BadgeResponse[];
}

const badgeIcons: Record<string, string> = {
  JAVA_STARTER: '☕', SPRING_EXPLORER: '🌱', REST_DESIGNER: '🔗',
  DATA_WIZARD: '💾', SECURITY_GUARDIAN: '🛡️', PROJECT_BUILDER: '🏗️',
  SPEED_CODER: '⚡', COMPLETIONIST: '👑',
};

export function BadgeShelf({ badges }: BadgeShelfProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {badges.map((badge) => (
        <Tooltip key={badge.badgeType} content={badge.earned ? `حصلت عليها في ${badge.earnedAt}` : 'لم تحصل عليها بعد'}>
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 transition-all ${
              badge.earned
                ? 'border-primary bg-primary/10 shadow-glow'
                : 'border-surfaceHigh bg-surfaceHigh/50 opacity-40 grayscale'
            }`}
          >
            {badgeIcons[badge.badgeType] || '🏆'}
          </div>
        </Tooltip>
      ))}
    </div>
  );
}

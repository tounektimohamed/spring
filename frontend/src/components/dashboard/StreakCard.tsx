import { motion } from 'framer-motion';

interface StreakCardProps {
  currentStreak: number;
}

export function StreakCard({ currentStreak }: StreakCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface border border-border rounded-card p-6 flex items-center gap-5"
    >
      <div className="text-5xl">🔥</div>
      <div>
        <p className="text-sm text-textMuted">السجل المتواصل</p>
        <p className="text-3xl font-display font-bold">
          {currentStreak} <span className="text-lg text-textMuted">يوم</span>
        </p>
      </div>
    </motion.div>
  );
}

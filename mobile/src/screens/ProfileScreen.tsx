import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { progressApi } from '../api/progress';
import type { DashboardResponse } from '../types';

const COLORS = { bg: '#0A0F1E', surface: '#111827', border: '#1E293B', primary: '#22D3EE', success: '#10B981', warning: '#F59E0B', danger: '#EF4444', text: '#F1F5F9', muted: '#64748B' };

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [dash, setDash] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const { data } = await progressApi.getDashboard();
      if (data.success) setDash(data.data);
    } catch {} finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} tintColor={COLORS.primary} />}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{user?.displayName?.charAt(0) || '?'}</Text></View>
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statValue}>{dash?.totalXp || 0}</Text><Text style={styles.statLabel}>Total XP</Text></View>
        <View style={styles.statBox}><Text style={styles.statValue}>{dash?.currentStreak || 0} 🔥</Text><Text style={styles.statLabel}>Streak</Text></View>
        <View style={styles.statBox}><Text style={styles.statValue}>{dash?.completedLessons || 0}</Text><Text style={styles.statLabel}>Completed</Text></View>
      </View>

      {dash?.phases && dash.phases.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress by Phase</Text>
          {dash.phases.map(phase => (
            <View key={phase.courseId} style={styles.phaseRow}>
              <Text style={styles.phaseTitle}>{phase.title}</Text>
              <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${phase.progress}%`, backgroundColor: phase.color }]} /></View>
              <Text style={styles.phaseMeta}>{phase.completedLessons}/{phase.totalLessons} lessons</Text>
            </View>
          ))}
        </View>
      )}

      {dash?.recentLessons && dash.recentLessons.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {dash.recentLessons.slice(0, 5).map((r, i) => (
            <View key={i} style={styles.recentRow}>
              <View style={styles.recentDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.recentTitle}>{r.lessonTitle}</Text>
                <Text style={styles.recentMeta}>{r.courseTitle} → {r.moduleTitle}</Text>
              </View>
              {r.quizScore != null && <Text style={styles.recentScore}>{r.quizScore}%</Text>}
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' },
  profileHeader: { alignItems: 'center', padding: 24, paddingTop: 60, borderBottomWidth: 1, borderColor: COLORS.border },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary + '20', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: COLORS.primary, fontSize: 24, fontWeight: '800' },
  name: { color: COLORS.text, fontSize: 20, fontWeight: '700' },
  email: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  statsRow: { flexDirection: 'row', padding: 16, gap: 10 },
  statBox: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 10, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
  statLabel: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  section: { padding: 16 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  phaseRow: { marginBottom: 14 },
  phaseTitle: { color: COLORS.text, fontSize: 14, fontWeight: '600', marginBottom: 6 },
  progressBarBg: { height: 6, backgroundColor: COLORS.border, borderRadius: 3 },
  progressBarFill: { height: 6, borderRadius: 3 },
  phaseMeta: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  recentRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  recentDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },
  recentTitle: { color: COLORS.text, fontSize: 13, fontWeight: '500' },
  recentMeta: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  recentScore: { color: COLORS.success, fontSize: 12, fontWeight: '600' },
  logoutButton: { margin: 16, marginTop: 20, backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.danger + '30' },
  logoutText: { color: COLORS.danger, fontSize: 15, fontWeight: '600' },
});

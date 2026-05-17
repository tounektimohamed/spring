import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { progressApi } from '../api/progress';
import { coursesApi } from '../api/courses';
import type { DashboardResponse, CourseResponse } from '../types';

const COLORS = { bg: '#0A0F1E', surface: '#111827', border: '#1E293B', primary: '#22D3EE', secondary: '#818CF8', success: '#10B981', warning: '#F59E0B', text: '#F1F5F9', muted: '#64748B' };

export default function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [dash, setDash] = useState<DashboardResponse | null>(null);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [dRes, cRes] = await Promise.all([progressApi.getDashboard(), coursesApi.getAll()]);
      if (dRes.data.success) setDash(dRes.data.data);
      if (cRes.data.success) setCourses(cRes.data.data);
    } catch {} finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} tintColor={COLORS.primary} />}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.displayName || 'Learner'}</Text>
          <Text style={styles.streak}>🔥 {dash?.currentStreak || 0} day streak</Text>
        </View>
        <TouchableOpacity onPress={logout}><Text style={styles.logout}>Logout</Text></TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{dash?.totalXp || 0}</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{dash?.completedLessons || 0}/{dash?.totalLessons || 0}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{dash?.overallProgress?.toFixed(0) || 0}%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Continue Learning</Text>
      {dash?.phases?.filter(p => p.nextLessonId).slice(0, 1).map(phase => (
        <TouchableOpacity key={phase.courseId} style={styles.continueCard} onPress={() => navigation.navigate('Course', { slug: phase.slug })}>
          <Text style={styles.continueTitle}>{phase.title}</Text>
          <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${phase.progress}%` }]} /></View>
          <Text style={styles.continueSub}>{phase.completedLessons}/{phase.totalLessons} lessons · Next lesson →</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Phases</Text>
      {courses.map(course => (
        <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => navigation.navigate('Course', { slug: course.slug })}>
          <Text style={styles.courseIcon}>{course.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseMeta}>{course.moduleCount} modules · {course.lessonCount} lessons</Text>
          </View>
        </TouchableOpacity>
      ))}

      {dash?.badges && dash.badges.some(b => b.earned) && (
        <>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgeRow}>
            {dash.badges.filter(b => b.earned).map(b => (
              <View key={b.badgeType} style={styles.badge}><Text style={styles.badgeText}>🏆</Text></View>
            ))}
          </View>
        </>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  greeting: { color: COLORS.text, fontSize: 22, fontWeight: '700' },
  streak: { color: COLORS.warning, fontSize: 14, marginTop: 4 },
  logout: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  statLabel: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', paddingHorizontal: 20, marginBottom: 12, marginTop: 8 },
  continueCard: { backgroundColor: COLORS.surface, marginHorizontal: 20, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.primary + '30', marginBottom: 12 },
  continueTitle: { color: COLORS.primary, fontSize: 16, fontWeight: '700' },
  continueSub: { color: COLORS.muted, fontSize: 12, marginTop: 8 },
  progressBarBg: { height: 4, backgroundColor: COLORS.border, borderRadius: 2, marginTop: 8 },
  progressBarFill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
  courseCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, marginHorizontal: 20, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border, marginBottom: 8, gap: 12 },
  courseIcon: { fontSize: 28 },
  courseTitle: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  courseMeta: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10 },
  badge: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  badgeText: { fontSize: 20 },
});

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { coursesApi } from '../api/courses';
import type { CourseDetailResponse, LessonResponse } from '../types';

const COLORS = { bg: '#0A0F1E', surface: '#111827', border: '#1E293B', primary: '#22D3EE', success: '#10B981', text: '#F1F5F9', muted: '#64748B' };

const lessonIcons: Record<string, string> = { THEORY: '📖', CODE: '💻', PRACTICE: '🧪', PROJECT: '🎯' };
const typeLabels: Record<string, string> = { THEORY: 'Theory', CODE: 'Coding', PRACTICE: 'Practice', PROJECT: 'Project' };

export default function CourseScreen({ route, navigation }: any) {
  const { slug } = route.params;
  const [course, setCourse] = useState<CourseDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await coursesApi.getBySlug(slug);
        if (data.success) setCourse(data.data);
      } catch {} finally { setLoading(false); }
    })();
  }, [slug]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  if (!course) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.icon}>{course.icon}</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.desc}>{course.description}</Text>
      </View>

      {course.modules.map((mod, mi) => (
        <View key={mod.id} style={styles.moduleSection}>
          <View style={styles.moduleHeader}>
            <View style={styles.moduleBadge}><Text style={styles.moduleBadgeText}>{mi + 1}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.moduleTitle}>{mod.title}</Text>
              <Text style={styles.moduleMeta}>{mod.lessons.length} lessons</Text>
            </View>
          </View>

          {mod.lessons.map((lesson: LessonResponse, li: number) => {
            const isCompleted = lesson.completed;
            const isLocked = !isCompleted && li > 0 && !mod.lessons[li - 1].completed;

            return (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonRow, isLocked && { opacity: 0.4 }]}
                disabled={isLocked}
                onPress={() => navigation.navigate('Lesson', { lessonId: lesson.id, title: lesson.title })}
              >
                <View style={[styles.lessonDot, isCompleted && styles.lessonDotDone, !isCompleted && !isLocked && styles.lessonDotCurrent]}>
                  <Text style={styles.lessonDotIcon}>{isCompleted ? '✓' : isLocked ? '🔒' : lessonIcons[lesson.type]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.lessonTitle, isCompleted && { color: COLORS.success }]}>{lesson.title}</Text>
                  <Text style={styles.lessonMeta}>{typeLabels[lesson.type]} · {lesson.xpReward} XP</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' },
  hero: { padding: 20, paddingTop: 40, alignItems: 'center', borderBottomWidth: 1, borderColor: COLORS.border },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { color: COLORS.text, fontSize: 22, fontWeight: '800', textAlign: 'center' },
  desc: { color: COLORS.muted, fontSize: 13, textAlign: 'center', marginTop: 4 },
  moduleSection: { paddingHorizontal: 16, marginTop: 20 },
  moduleHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  moduleBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary + '20', justifyContent: 'center', alignItems: 'center' },
  moduleBadgeText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  moduleTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  moduleMeta: { color: COLORS.muted, fontSize: 12 },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingLeft: 20, borderLeftWidth: 1, borderColor: COLORS.border, marginLeft: 13 },
  lessonDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  lessonDotDone: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  lessonDotCurrent: { backgroundColor: COLORS.primary + '20', borderColor: COLORS.primary },
  lessonDotIcon: { fontSize: 11, color: COLORS.text },
  lessonTitle: { color: COLORS.text, fontSize: 14, fontWeight: '500' },
  lessonMeta: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
});

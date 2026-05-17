import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { lessonsApi } from '../api/lessons';
import { quizApi } from '../api/quiz';
import { progressApi } from '../api/progress';
import { codeRunApi } from '../api/codeRun';
import type { LessonDetailResponse, QuizQuestion, QuizResultResponse } from '../types';

const COLORS = { bg: '#0A0F1E', surface: '#111827', border: '#1E293B', primary: '#22D3EE', success: '#10B981', warning: '#F59E0B', danger: '#EF4444', text: '#F1F5F9', muted: '#64748B', code: '#0D1117' };

function parseOptions(opts: string | null): string[] {
  if (!opts) return [];
  try { const p = JSON.parse(opts); if (Array.isArray(p)) return p; if (typeof p === 'string') { const r = JSON.parse(p); return Array.isArray(r) ? r : []; } return []; } catch { return []; }
}

const typeLabels: Record<string, string> = { THEORY: 'Theory', CODE: 'Coding', PRACTICE: 'Practice', PROJECT: 'Project' };

export default function LessonScreen({ route, navigation }: any) {
  const { lessonId } = route.params;
  const [lesson, setLesson] = useState<LessonDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizResult, setQuizResult] = useState<QuizResultResponse | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [lRes, qRes] = await Promise.all([
          lessonsApi.getById(lessonId),
          quizApi.getQuestions(lessonId),
        ]);
        if (lRes.data.success) {
          setLesson(lRes.data.data);
          setCode(lRes.data.data.codeExample || '');
        }
        if (qRes.data.success) setQuizQuestions(qRes.data.data);
      } catch {} finally { setLoading(false); }
    })();
  }, [lessonId]);

  const handleRun = async () => {
    setRunning(true); setOutput('');
    try {
      const { data } = await codeRunApi.run(code);
      setOutput(data.success ? data.output || 'No output' : data.error || 'Error');
    } catch { setOutput('Failed to run code'); }
    finally { setRunning(false); }
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    try {
      const arr = Object.entries(answers).map(([qId, sel]) => ({ questionId: Number(qId), selectedAnswer: sel }));
      const { data } = await quizApi.submit({ lessonId, answers: arr });
      if (data.success) setQuizResult(data.data);
    } catch { Alert.alert('Error', 'Quiz submission failed'); }
    finally { setSubmitting(false); }
  };

  const handleComplete = async () => {
    try {
      await progressApi.completeLesson(lessonId, quizResult?.score);
      Alert.alert('✅', `Lesson completed! +${lesson?.xpReward || 10} XP`);
      navigation.goBack();
    } catch { Alert.alert('Error', 'Failed to complete lesson'); }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  if (!lesson) return null;

  const q = quizQuestions[currentQuestion];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.type}>{typeLabels[lesson.type]}</Text>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.meta}>{lesson.moduleTitle} · {lesson.orderIndex}/{lesson.totalLessonsInModule} · ⭐{lesson.xpReward} XP</Text>
        <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${(lesson.orderIndex / lesson.totalLessonsInModule) * 100}%` }]} /></View>
      </View>

      <View style={styles.content}>
        <View style={styles.markdown}>
          {lesson.contentMarkdown.split('\n').map((line, i) => {
            if (line.startsWith('##')) return <Text key={i} style={styles.h2}>{line.replace('##', '').trim()}</Text>;
            if (line.startsWith('```java')) return <View key={i} style={styles.codeBlock}><Text style={styles.codeText}>{line.replace('```java', '')}</Text></View>;
            if (line.startsWith('```')) return null;
            if (line.startsWith('- ')) return <Text key={i} style={styles.li}>  • {line.substring(2)}</Text>;
            if (line.trim()) return <Text key={i} style={styles.p}>{line}</Text>;
            return <View key={i} style={{ height: 8 }} />;
          })}
        </View>

        {lesson.codeExample ? (
          <View style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>🧪 Try it yourself</Text>
            <View style={styles.codeBlock}>
              <TextInput style={styles.codeInput} value={code} onChangeText={setCode} multiline textAlignVertical="top" autoCapitalize="none" autoCorrect={false} spellCheck={false} />
            </View>
            <TouchableOpacity style={[styles.runButton, running && { opacity: 0.5 }]} onPress={handleRun} disabled={running}>
              <Text style={styles.runButtonText}>{running ? 'Running...' : '▶ Run Code'}</Text>
            </TouchableOpacity>
            {output ? <View style={styles.terminal}><Text style={styles.terminalText}>{output}</Text></View> : null}
          </View>
        ) : null}

        {!lesson.completed && (
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>✓ Mark as Complete</Text>
          </TouchableOpacity>
        )}
        {lesson.completed && (
          <View style={styles.completedBadge}><Text style={styles.completedText}>✅ Lesson Completed!</Text></View>
        )}
      </View>

      {quizQuestions.length > 0 && !quizResult && (
        <View style={styles.quizSection}>
          <Text style={styles.sectionTitle}>🧪 Quick Check</Text>
          <View style={styles.questionNav}>
            {quizQuestions.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setCurrentQuestion(i)} style={[styles.qNavBtn, i === currentQuestion && styles.qNavBtnActive]}>
                <Text style={[styles.qNavText, i === currentQuestion && styles.qNavTextActive]}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {q && (
            <View>
              <Text style={styles.questionText}>{currentQuestion + 1}. {q.question}</Text>
              {q.type === 'MCQ' && parseOptions(q.options).map((opt, oi) => {
                const sel = answers[q.id] === opt;
                return (
                  <TouchableOpacity key={oi} onPress={() => setAnswers({ ...answers, [q.id]: opt })} style={[styles.optionBtn, sel && styles.optionBtnSel]}>
                    <Text style={[styles.optionText, sel && styles.optionTextSel]}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
              {q.type === 'TRUE_FALSE' && ['true', 'false'].map(val => {
                const sel = answers[q.id] === val;
                return (
                  <TouchableOpacity key={val} onPress={() => setAnswers({ ...answers, [q.id]: val })} style={[styles.optionBtn, sel && styles.optionBtnSel]}>
                    <Text style={[styles.optionText, sel && styles.optionTextSel]}>{val === 'true' ? '✅ True' : '❌ False'}</Text>
                  </TouchableOpacity>
                );
              })}
              {q.type === 'CODE_OUTPUT' && (
                <TextInput style={styles.textInput} value={answers[q.id] || ''} onChangeText={t => setAnswers({ ...answers, [q.id]: t })} placeholder="Type expected output..." placeholderTextColor={COLORS.muted} />
              )}
              <View style={styles.quizNav}>
                <TouchableOpacity onPress={() => setCurrentQuestion(p => Math.max(0, p - 1))} disabled={currentQuestion === 0}><Text style={{ color: currentQuestion === 0 ? COLORS.muted : COLORS.primary }}>← Previous</Text></TouchableOpacity>
                {currentQuestion < quizQuestions.length - 1 ? (
                  <TouchableOpacity onPress={() => setCurrentQuestion(p => Math.min(quizQuestions.length - 1, p + 1))}><Text style={{ color: COLORS.primary }}>Next →</Text></TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handleSubmitQuiz} disabled={Object.keys(answers).length < quizQuestions.length || submitting}>
                    <Text style={{ color: COLORS.primary, fontWeight: '700' }}>{submitting ? 'Submitting...' : 'Submit ✓'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      )}

      {quizResult && (
        <View style={styles.quizResult}>
          <Text style={styles.resultScore}>{quizResult.score}%</Text>
          <Text style={styles.resultDetail}>{quizResult.correctAnswers}/{quizResult.totalQuestions} correct</Text>
          <Text style={{ color: quizResult.passed ? COLORS.success : COLORS.warning, textAlign: 'center' }}>{quizResult.passed ? '🎉 Passed!' : 'Try again'}</Text>
          <TouchableOpacity onPress={() => { setQuizResult(null); setAnswers({}); }} style={styles.retryBtn}><Text style={styles.retryText}>Retry Quiz</Text></TouchableOpacity>
        </View>
      )}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, paddingTop: 50, borderBottomWidth: 1, borderColor: COLORS.border },
  type: { color: COLORS.primary, fontSize: 12, fontWeight: '700', marginBottom: 4 },
  title: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  meta: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  progressBarBg: { height: 3, backgroundColor: COLORS.border, borderRadius: 2, marginTop: 10 },
  progressBarFill: { height: 3, backgroundColor: COLORS.primary, borderRadius: 2 },
  content: { padding: 20 },
  markdown: { marginBottom: 8 },
  h2: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  p: { color: COLORS.text, fontSize: 15, lineHeight: 24, marginBottom: 4 },
  li: { color: COLORS.text, fontSize: 15, lineHeight: 22, marginBottom: 2 },
  codeBlock: { backgroundColor: COLORS.code, borderRadius: 8, padding: 12, marginVertical: 8, borderWidth: 1, borderColor: COLORS.border },
  codeText: { color: '#ED8936', fontFamily: 'monospace', fontSize: 13 },
  codeInput: { color: '#ED8936', fontFamily: 'monospace', fontSize: 13, minHeight: 100 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  runButton: { backgroundColor: COLORS.primary, borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 8 },
  runButtonText: { color: COLORS.bg, fontWeight: '700', fontSize: 14 },
  terminal: { backgroundColor: COLORS.code, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: COLORS.border },
  terminalText: { color: '#10B981', fontFamily: 'monospace', fontSize: 13 },
  completeButton: { backgroundColor: COLORS.success, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 20 },
  completeButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  completedBadge: { backgroundColor: COLORS.success + '15', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 20, borderWidth: 1, borderColor: COLORS.success + '40' },
  completedText: { color: COLORS.success, fontWeight: '700', fontSize: 16 },
  quizSection: { padding: 20, borderTopWidth: 1, borderColor: COLORS.border },
  questionNav: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  qNavBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  qNavBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  qNavText: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  qNavTextActive: { color: COLORS.bg },
  questionText: { color: COLORS.text, fontSize: 15, fontWeight: '500', marginBottom: 12 },
  optionBtn: { backgroundColor: COLORS.surface, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: COLORS.border, marginBottom: 8 },
  optionBtnSel: { borderColor: COLORS.primary, backgroundColor: COLORS.primary + '10' },
  optionText: { color: COLORS.text, fontSize: 14 },
  optionTextSel: { color: COLORS.primary },
  textInput: { backgroundColor: COLORS.surface, borderRadius: 10, padding: 14, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border, fontFamily: 'monospace', fontSize: 14 },
  quizNav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  quizResult: { margin: 20, backgroundColor: COLORS.surface, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  resultScore: { color: COLORS.text, fontSize: 36, fontWeight: '800' },
  resultDetail: { color: COLORS.muted, fontSize: 14, marginTop: 4, marginBottom: 8 },
  retryBtn: { marginTop: 12, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  retryText: { color: COLORS.text, fontSize: 14 },
});

import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useLesson } from '../hooks/useLesson';
import { useCompleteLesson } from '../hooks/useProgress';
import { quizApi } from '../api/quiz';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CodeEditor } from '../components/lesson/CodeEditor';
import { OutputTerminal } from '../components/lesson/OutputTerminal';
import { BadgeUi } from '../components/ui/Badge';
import { Toast } from '../components/ui/Toast';
import type { QuizQuestion, QuizResultResponse } from '../types/quiz';
import { motion, AnimatePresence } from 'framer-motion';

function parseOptions(opts: string | null): string[] {
  if (!opts) return [];
  try {
    const p = JSON.parse(opts);
    if (Array.isArray(p)) return p;
    if (typeof p === 'string') {
      const r = JSON.parse(p);
      return Array.isArray(r) ? r : [];
    }
    return [];
  } catch {
    return [];
  }
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lessonId = Number(id);
  const { data: lesson, isLoading } = useLesson(lessonId);
  const completeLesson = useCompleteLesson();
  const queryClient = useQueryClient();

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizResult, setQuizResult] = useState<QuizResultResponse | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (lesson) {
      setCode(lesson.codeExample || '');
      quizApi.getQuestions(lessonId).then(({ data }) => {
        if (data.success) setQuizQuestions(data.data);
      }).catch(() => {});
    }
  }, [lesson, lessonId]);

  const handleRunCode = async () => {
    setRunning(true); setOutput('');
    try {
      const resp = await fetch('/api/code-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        body: JSON.stringify({ code }),
      });
      const d = await resp.json();
      const r = d.data;
      setOutput(r.success ? r.output : r.error || 'Execution failed');
    } catch { setOutput('Failed to execute code'); }
    finally { setRunning(false); }
  };

  const handleAnswer = (qId: number, answer: string) => setAnswers(p => ({ ...p, [qId]: answer }));

  const handleSubmitQuiz = async () => {
    try {
      const arr = Object.entries(answers).map(([qId, sel]) => ({ questionId: Number(qId), selectedAnswer: sel }));
      const { data } = await quizApi.submit({ lessonId, answers: arr });
      if (data.success) setQuizResult(data.data);
    } catch { setToast('فشل تقييم الاختبار'); }
  };

  const handleComplete = async () => {
    try {
      await completeLesson.mutateAsync({ lessonId, quizScore: quizResult?.score, timeSpentSeconds: 0 });
      setToast('✅ تم إكمال الدرس! +' + (lesson?.xpReward || 10) + ' XP');
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
    } catch { setToast('فشل تسجيل الإكمال'); }
  };

  if (isLoading) return <AppShell sidebar={false}><div className="flex items-center justify-center min-h-screen"><Spinner size="lg" /></div></AppShell>;
  if (!lesson) return null;

  const typeColors: Record<string, 'primary' | 'success' | 'warning' | 'default'> = { THEORY: 'primary', CODE: 'success', PRACTICE: 'warning', PROJECT: 'default' };
  const typeLabels: Record<string, string> = { THEORY: 'نظري', CODE: 'برمجة', PRACTICE: 'تطبيقي', PROJECT: 'مشروع' };

  const renderMarkdown = (md: string) => {
    return md
      .replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-display font-bold mt-8 mb-3 text-textPrimary">$1</h2>')
      .replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2 text-textPrimary">$1</h3>')
      .replace(/```java\n?([\s\S]*?)```/g, '<pre class="bg-surfaceHigh border border-border rounded-card p-4 my-4 overflow-x-auto"><code class="text-java font-mono text-sm">$1</code></pre>')
      .replace(/```bash\n?([\s\S]*?)```/g, '<pre class="bg-surfaceHigh border border-border rounded-card p-4 my-4 overflow-x-auto"><code class="text-primary font-mono text-sm">$1</code></pre>')
      .replace(/```\n?([\s\S]*?)```/g, '<pre class="bg-surfaceHigh border border-border rounded-card p-4 my-4 overflow-x-auto"><code class="font-mono text-sm">$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-surfaceHigh text-primary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/^- (.+)$/gm, '<li class="text-textPrimary ml-4 mb-1">$1</li>')
      .replace(/\n\n/g, '<br/><br/>');
  };

  return (
    <AppShell sidebar={false}>
      {toast && <Toast message={toast} type="success" onClose={() => setToast('')} />}
      <TopBar title={lesson.title} subtitle={`${typeLabels[lesson.type]} • ${lesson.orderIndex}/${lesson.totalLessonsInModule}`} />
      <div className="px-6 py-2 border-b border-border bg-surface/30">
        <ProgressBar value={lesson.orderIndex} max={lesson.totalLessonsInModule} size="sm" color="bg-primary" />
      </div>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        {/* LEFT PANEL */}
        <div className="flex-1 lg:w-[60%] p-6 lg:p-8 overflow-y-auto">
          <div className="mb-4 flex items-center gap-2">
            <BadgeUi text={typeLabels[lesson.type]} variant={typeColors[lesson.type]} size="md" />
            {lesson.xpReward > 0 && <span className="text-sm text-textMuted">⭐ {lesson.xpReward} XP</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-6">{lesson.title}</h1>
          <div className="prose prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.contentMarkdown) }} />

          {lesson.codeExample && (
            <div className="mt-8 space-y-4">
              <h3 className="font-display font-semibold text-lg">🧪 جرّب بنفسك</h3>
              <CodeEditor code={code} onChange={setCode} />
              <div className="flex gap-3">
                <Button onClick={handleRunCode} disabled={running}>{running ? '⏳ جاري التنفيذ...' : '▶ تنفيذ الكود'}</Button>
              </div>
              {output && <OutputTerminal output={output} />}
            </div>
          )}

          {!lesson.completed && (
            <div className="mt-10 pt-6 border-t border-border">
              <Button size="lg" onClick={handleComplete} disabled={completeLesson.isPending} className="w-full">
                {completeLesson.isPending ? 'جاري...' : '✓ أكملت الدرس'}
              </Button>
            </div>
          )}
          {lesson.completed && (
            <div className="mt-10 pt-6 border-t border-border">
              <div className="bg-success/10 border border-success/30 rounded-card p-4 text-center">
                <p className="text-success font-medium">✅ لقد أكملت هذا الدرس — أحسنت!</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-[40%] border-t lg:border-t-0 lg:border-r border-border bg-surface/30 p-6 lg:p-8 overflow-y-auto">
          <h3 className="font-display font-semibold text-lg mb-6">🧪 اختبار سريع</h3>
          {quizResult ? (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="text-center p-6 bg-surface rounded-card border border-border">
                  <div className={`text-5xl mb-3 ${quizResult.passed ? '' : 'grayscale'}`}>{quizResult.passed ? '🎉' : '📚'}</div>
                  <p className="text-3xl font-display font-bold">{quizResult.score}%</p>
                  <p className="text-sm text-textMuted mt-1">{quizResult.correctAnswers}/{quizResult.totalQuestions} إجابات صحيحة</p>
                  <p className={`text-sm mt-2 ${quizResult.passed ? 'text-success' : 'text-warning'}`}>{quizResult.passed ? 'أحسنت!' : 'حاول مرة أخرى'}</p>
                </div>
                <div className="space-y-3">
                  {quizResult.results.map((r, i) => (
                    <div key={i} className={`p-3 rounded-card border ${r.isCorrect ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'}`}>
                      <p className="text-sm font-medium mb-1">{r.question}</p>
                      <p className="text-xs text-textMuted">
                        إجابتك: <span className={r.isCorrect ? 'text-success' : 'text-danger'}>{r.yourAnswer}</span>
                        {!r.isCorrect && <span> | الصحيح: <span className="text-success">{r.correctAnswer}</span></span>}
                      </p>
                      {r.explanation && <p className="text-xs text-textMuted mt-1">{r.explanation}</p>}
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="w-full" onClick={() => { setQuizResult(null); setAnswers({}); }}>إعادة الاختبار</Button>
              </motion.div>
            </AnimatePresence>
          ) : quizQuestions.length > 0 ? (
            <div>
              <div className="flex gap-1 mb-6 flex-wrap">
                {quizQuestions.map((_, i) => (
                  <button key={i} onClick={() => setCurrentQuestion(i)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                      i === currentQuestion ? 'bg-primary text-background'
                      : answers[quizQuestions[i].id] ? 'bg-success/20 text-success border border-success/30'
                      : 'bg-surfaceHigh text-textMuted border border-border'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
              {quizQuestions[currentQuestion] && (
                <motion.div key={currentQuestion} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <p className="font-medium text-sm">{currentQuestion + 1}. {quizQuestions[currentQuestion].question}</p>

                  {quizQuestions[currentQuestion].type === 'MCQ' && (() => {
                    const opts = parseOptions(quizQuestions[currentQuestion].options);
                    return (
                      <div className="space-y-2">
                        {opts.map((opt, oi) => {
                          const isSelected = answers[quizQuestions[currentQuestion].id] === opt;
                          return (
                            <button key={oi} onClick={() => handleAnswer(quizQuestions[currentQuestion].id, opt)}
                              className={`w-full text-right p-3 rounded-card border text-sm transition-all ${
                                isSelected ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surfaceHigh hover:border-primary/50 text-textPrimary'}`}>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {quizQuestions[currentQuestion].type === 'TRUE_FALSE' && (
                    <div className="flex gap-3">
                      {['true', 'false'].map(val => {
                        const isSelected = answers[quizQuestions[currentQuestion].id] === val;
                        return (
                          <button key={val} onClick={() => handleAnswer(quizQuestions[currentQuestion].id, val)}
                            className={`flex-1 p-4 rounded-card border text-center font-medium text-lg transition-all ${
                              isSelected ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surfaceHigh hover:border-primary/50 text-textPrimary'}`}>
                            {val === 'true' ? '✅ صحيح' : '❌ خطأ'}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {quizQuestions[currentQuestion].type === 'CODE_OUTPUT' && (
                    <input type="text" value={answers[quizQuestions[currentQuestion].id] || ''}
                      onChange={e => handleAnswer(quizQuestions[currentQuestion].id, e.target.value)}
                      placeholder="اكتب الناتج المتوقع..." className="w-full bg-surfaceHigh border border-border rounded-card px-4 py-3 text-textPrimary font-mono text-sm outline-none focus:border-primary" />
                  )}
                </motion.div>
              )}
              <div className="flex justify-between mt-6">
                <button onClick={() => setCurrentQuestion(p => Math.max(0, p - 1))} disabled={currentQuestion === 0}
                  className="text-sm text-textMuted hover:text-textPrimary disabled:opacity-30">← السابق</button>
                {currentQuestion < quizQuestions.length - 1 ? (
                  <button onClick={() => setCurrentQuestion(p => Math.min(quizQuestions.length - 1, p + 1))}
                    className="text-sm text-primary hover:text-primaryDark">التالي →</button>
                ) : (
                  <Button size="sm" onClick={handleSubmitQuiz} disabled={Object.keys(answers).length < quizQuestions.length}>تقديم الإجابات ✓</Button>
                )}
              </div>
            </div>
          ) : <p className="text-textMuted text-sm">لا يوجد اختبار لهذا الدرس</p>}
        </div>
      </div>
    </AppShell>
  );
}

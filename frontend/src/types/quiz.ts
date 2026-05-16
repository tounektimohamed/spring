export interface QuizQuestion {
  id: number;
  question: string;
  type: string;
  options: string | null;
  correctAnswer: string;
  explanation: string | null;
  orderIndex: number;
}

export interface QuizSubmitRequest {
  lessonId: number;
  answers: { questionId: number; selectedAnswer: string }[];
}

export interface QuestionResult {
  questionId: number;
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string | null;
}

export interface QuizResultResponse {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  results: QuestionResult[];
}

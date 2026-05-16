export * from './auth';
export * from './course';
export * from './lesson';
export * from './quiz';
export * from './progress';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface CodeRunResponse {
  output: string;
  error: string;
  executionMs: number;
  success: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  email: string;
  displayName: string;
  role: string;
}

export interface AuthState {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

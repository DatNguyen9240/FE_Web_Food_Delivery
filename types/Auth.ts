export interface User {
  id: string;
  phone: string;
  email: string;
  displayName: string;
  dateOfBirth: string;
  gender: number;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  phone: string;
  password: string;
  displayName: string;
  email: string;
  dateOfBirth: string;
  gender: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  registerSuccess: boolean | null;
  loading: boolean;
  error: string | null;
}

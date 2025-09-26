import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {
  AuthState,
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../../../types/Auth";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  registerSuccess: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Action creators for saga
export const loginRequest = createAction<LoginRequest>("auth/loginRequest");
export const loginSuccess = createAction<AuthResponse>("auth/loginSuccess");
export const loginFailure = createAction<string>("auth/loginFailure");

export const registerRequest = createAction<RegisterRequest>(
  "auth/registerRequest"
);
export const registerSuccess = createAction<AuthState>("auth/registerSuccess");
export const registerFailure = createAction<string>("auth/registerFailure");

export const logoutRequest = createAction("auth/logoutRequest");
export const logoutSuccess = createAction("auth/logoutSuccess");
export const logoutFailure = createAction<string>("auth/logoutFailure");

export const refreshTokenRequest = createAction("auth/refreshTokenRequest");
export const refreshTokenSuccess = createAction<AuthResponse>(
  "auth/refreshTokenSuccess"
);
export const refreshTokenFailure = createAction<string>(
  "auth/refreshTokenFailure"
);

export const getCurrentUserRequest = createAction("auth/getCurrentUserRequest");
export const getCurrentUserSuccess = createAction<User>(
  "auth/getCurrentUserSuccess"
);
export const getCurrentUserFailure = createAction<string>(
  "auth/getCurrentUserFailure"
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        // Lưu vào cookie
        document.cookie = `accessToken=${action.payload.accessToken}; path=/; max-age=2592000`;
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(action.payload.user)
        )}; path=/; max-age=2592000`;
        if (action.payload.refreshToken) {
          document.cookie = `refreshToken=${action.payload.refreshToken}; path=/; max-age=2592000`;
        }
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        // Xóa cookie khi logout
        document.cookie = "accessToken=; path=/; max-age=0";
        document.cookie = "refreshToken=; path=/; max-age=0";
        document.cookie = "user=; path=/; max-age=0";
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSuccess, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        const accessToken = action.payload.accessToken;
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.error = null;
        if (typeof window !== "undefined") {
          // Lưu vào cookie
          document.cookie = `accessToken=${accessToken}; path=/; max-age=2592000`;
          document.cookie = `user=${encodeURIComponent(
            JSON.stringify(action.payload.user)
          )}; path=/; max-age=2592000`;
          if (action.payload.refreshToken) {
            document.cookie = `refreshToken=${action.payload.refreshToken}; path=/; max-age=2592000`;
          }
        }
      })
      .addCase(loginFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSuccess, (state) => {
        state.loading = false;
        state.registerSuccess = true;
        state.error = null;
      })
      .addCase(registerFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.registerSuccess = false;
      })
      // Logout
      .addCase(logoutRequest, (state) => {
        state.loading = true;
      })
      .addCase(logoutSuccess, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = null;
        if (typeof window !== "undefined") {
          // Xóa cookie khi logout
          document.cookie = "accessToken=; path=/; max-age=0";
          document.cookie = "refreshToken=; path=/; max-age=0";
          document.cookie = "user=; path=/; max-age=0";
        }
      })
      .addCase(logoutFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })
      // Refresh token
      .addCase(refreshTokenRequest, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokenSuccess, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
        if (typeof window !== "undefined") {
          document.cookie = `accessToken=${action.payload.accessToken}; path=/; max-age=2592000`;
          document.cookie = `user=${encodeURIComponent(
            JSON.stringify(action.payload.user)
          )}; path=/; max-age=2592000`;
          if (action.payload.refreshToken) {
            document.cookie = `refreshToken=${action.payload.refreshToken}; path=/; max-age=2592000`;
          }
        }
      })
      .addCase(refreshTokenFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload || "accessToken refresh failed";
        state.isAuthenticated = false;
        if (typeof window !== "undefined") {
          document.cookie = "accessToken=; path=/; max-age=0";
          document.cookie = "refreshToken=; path=/; max-age=0";
          document.cookie = "user=; path=/; max-age=0";
        }
      })
      // Get current user
      .addCase(getCurrentUserRequest, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserSuccess, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(getCurrentUserFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get user info";
      });
  },
});

export const { clearError, setCredentials, clearCredentials, setLoading } =
  authSlice.actions;
export default authSlice.reducer;

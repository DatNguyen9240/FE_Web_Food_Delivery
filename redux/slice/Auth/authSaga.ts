import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../lib/axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
} from "./AuthSlice";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../../../types/Auth";

function* loginSaga(action: PayloadAction<LoginRequest>): Generator {
  try {
    const response: { data: AuthResponse } = yield call(
      api.post,
      "/Auth/login",
      action.payload
    );
    yield put(loginSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(loginFailure(error.message || "Login failed"));
    } else {
      yield put(loginFailure("Login failed"));
    }
  }
}

function* registerSaga(action: PayloadAction<RegisterRequest>): Generator {
  try {
    const response = yield call(
      api.post,
      "/Auth/register-by-username",
      action.payload
    );
    yield put(registerSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(registerFailure(error.message || "Registration failed"));
    } else {
      yield put(registerFailure("Registration failed"));
    }
  }
}

function* logoutSaga(): Generator {
  try {
    yield call(api.post, "/Auth/logout");
    yield put(logoutSuccess());
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(logoutFailure(error.message || "Logout failed"));
    } else {
      yield put(logoutFailure("Logout failed"));
    }
  }
}

// Helper: get cookie by name
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function* refreshTokenSaga(): Generator {
  try {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    const response: { data: AuthResponse } = yield call(
      api.post,
      "/auth/refresh",
      {
        accessToken,
        refreshToken,
      }
    );
    yield put(refreshTokenSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(refreshTokenFailure(error.message || "Token refresh failed"));
    } else {
      yield put(refreshTokenFailure("Token refresh failed"));
    }
  }
}

function* getCurrentUserSaga(): Generator {
  try {
    const response = yield call(api.get, "/auth/me");
    yield put(getCurrentUserSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        getCurrentUserFailure(error.message || "Failed to get user info")
      );
    } else {
      yield put(getCurrentUserFailure("Failed to get user info"));
    }
  }
}

export default function* authSaga(): Generator {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(refreshTokenRequest.type, refreshTokenSaga);
  yield takeLatest(getCurrentUserRequest.type, getCurrentUserSaga);
}

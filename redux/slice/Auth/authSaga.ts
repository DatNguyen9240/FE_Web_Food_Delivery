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
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} from "./AuthSlice";
function* updateUserSaga(action: PayloadAction<unknown>): Generator {
  try {
    // Gửi PUT /User với dữ liệu user mới
    const response = yield call(api.put, "/User", action.payload);
    yield put(updateUserSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        updateUserFailure(error.message || "Failed to update user info")
      );
    } else {
      yield put(updateUserFailure("Failed to update user info"));
    }
  }
}
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../../../types/Auth";

function* loginSaga(action: PayloadAction<LoginRequest>): Generator {
  try {
    // Gọi API login lấy accessToken, refreshToken
    const response: { data: { accessToken: string; refreshToken: string } } =
      yield call(api.post, "/Auth/login", action.payload);
    const { accessToken, refreshToken } = response.data;

    // Tạo object AuthResponse đúng type
    const authResponse: AuthResponse = {
      accessToken,
      refreshToken,
    };
    yield put(loginSuccess(authResponse));
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

function* getCurrentUserSaga(): Generator {
  try {
    const response = yield call(api.get, "/User");
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
  yield takeLatest(getCurrentUserRequest.type, getCurrentUserSaga);
  yield takeLatest(updateUserRequest.type, updateUserSaga);
}

import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../lib/axios";
import {
  paymentCheckoutRequest,
  paymentCheckoutSuccess,
  paymentCheckoutFailure,
} from "./PaymentSlice";
import type { PaymentCheckoutResponse } from "./PaymentSlice";

import type { CartResponse } from "../Cart/cartSlice";

function* paymentCheckoutSaga(action: { payload: { merchantId: string; payload: CartResponse } }): Generator {
  try {
    const { merchantId, payload } = action.payload;
    const response = (yield call(api.post, `/payments/checkout/${merchantId}`, payload)) as { data: PaymentCheckoutResponse };
    yield put(paymentCheckoutSuccess(response.data));
  } catch (error: unknown) {
    yield put(paymentCheckoutFailure((error as Error).message || "Lỗi khi thanh toán"));
  }
}

export default function* PaymentSaga() {
  yield takeLatest(paymentCheckoutRequest, paymentCheckoutSaga);
}

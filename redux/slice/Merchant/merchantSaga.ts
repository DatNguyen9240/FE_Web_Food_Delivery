import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../lib/axios";
import {
  fetchMerchantsRequest,
  fetchMerchantsSuccess,
  fetchMerchantsFailure,
} from "./merchantSlice";

// Saga worker
function* fetchMerchantsSaga(): Generator {
  try {
    // Gọi API mock Next.js
    const response = yield call(api.get, "/Merchant");
    yield put(fetchMerchantsSuccess(response.data));
  } catch (error: unknown) {
    yield put(
      fetchMerchantsFailure(
        (error as Error).message || "Lỗi lấy danh sách merchant"
      )
    );
  }
}

// Saga watcher
export default function* merchantSaga() {
  yield takeLatest(fetchMerchantsRequest.type, fetchMerchantsSaga);
}

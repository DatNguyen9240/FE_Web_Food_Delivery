import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../lib/axios";
import {
  fetchMerchantCategoriesRequest,
  fetchMerchantCategoriesSuccess,
  fetchMerchantCategoriesFailure,
} from "./merchantCategorySlice";

function* fetchMerchantCategoriesSaga(): Generator {
  try {
    const response = yield call(api.get, "/MerchantCategory");
    // @ts-ignore
    yield put(fetchMerchantCategoriesSuccess(response.data));
  } catch (error: unknown) {
    // @ts-ignore
    yield put(
      fetchMerchantCategoriesFailure(
        (error as Error).message || "Lỗi lấy danh sách MerchantCategory"
      )
    );
  }
}

export default function* merchantCategorySaga() {
  yield takeLatest(fetchMerchantCategoriesRequest.type, fetchMerchantCategoriesSaga);
}

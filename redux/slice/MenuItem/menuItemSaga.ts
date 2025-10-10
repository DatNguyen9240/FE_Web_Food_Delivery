import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../lib/axios";
import {
  fetchMenuItemsRequest,
  fetchMenuItemsSuccess,
  fetchMenuItemsFailure,
  fetchMenuItemByIdRequest,
  fetchMenuItemByIdSuccess,
  fetchMenuItemByIdFailure,
} from "./menuItemSlice";

function* fetchMenuItemsSaga(): Generator {
  try {
    const response = yield call(api.get, "/MenuItem");
    // @ts-ignore
    yield put(fetchMenuItemsSuccess(response.data));
  } catch (error: unknown) {
    // @ts-ignore
    yield put(
      fetchMenuItemsFailure((error as Error).message || "Lỗi lấy danh sách MenuItem")
    );
  }
}

function* fetchMenuItemByIdSaga(action: any): Generator {
  try {
    const id: string = action.payload;
    const response = yield call(api.get, `/MenuItem/${id}`);
    // @ts-ignore
    yield put(fetchMenuItemByIdSuccess(response.data));
  } catch (error: unknown) {
    // @ts-ignore
    yield put(
      fetchMenuItemByIdFailure((error as Error).message || "Lỗi lấy MenuItem theo id")
    );
  }
}

export default function* menuItemSaga() {
  yield takeLatest(fetchMenuItemsRequest.type, fetchMenuItemsSaga);
  yield takeLatest(fetchMenuItemByIdRequest.type, fetchMenuItemByIdSaga);
}

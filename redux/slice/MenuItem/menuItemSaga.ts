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
import type { MenuItem } from "./menuItemSlice";

function* fetchMenuItemsSaga(): Generator {
  try {
  const response = (yield call(api.get, "/MenuItem")) as { data: MenuItem[] };
  yield put(fetchMenuItemsSuccess(response.data));
  } catch (error: unknown) {
    yield put(
      fetchMenuItemsFailure((error as Error).message || "Lỗi lấy danh sách MenuItem")
    );
  }
}

function* fetchMenuItemByIdSaga(action: { payload: string }): Generator {
  try {
    const id: string = action.payload;
    const response = (yield call(api.get, `/MenuItem/${id}`)) as { data: MenuItem };
    yield put(fetchMenuItemByIdSuccess(response.data));
  } catch (error: unknown) {
    yield put(
      fetchMenuItemByIdFailure((error as Error).message || "Lỗi lấy MenuItem theo id")
    );
  }
}

export default function* menuItemSaga() {
  yield takeLatest(fetchMenuItemsRequest, fetchMenuItemsSaga);
  yield takeLatest(fetchMenuItemByIdRequest, fetchMenuItemByIdSaga);
}

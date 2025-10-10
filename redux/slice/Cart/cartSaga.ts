import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../lib/axios";
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  updateCartItemQuantityRequest,
  updateCartItemQuantitySuccess,
  updateCartItemQuantityFailure,
  deleteCartItemRequest,
  deleteCartItemSuccess,
  deleteCartItemFailure,
} from "./cartSlice";
import type { CartRequestPayload, CartResponse } from "./cartSlice";

function* addToCartSaga(action: { payload: CartRequestPayload }): Generator {
  try {
    const payload = action.payload;
    const response = (yield call(api.post, "/Cart/items", payload)) as { data: unknown };
    yield put(addToCartSuccess(response.data));
  } catch (error: unknown) {
    yield put(addToCartFailure((error as Error).message || "Lỗi khi thêm vào giỏ"));
  }
}

function* fetchCartSaga(): Generator {
  try {
    const response = (yield call(api.get, "/Cart")) as { data: CartResponse[] };
    yield put(fetchCartSuccess(response.data));
  } catch (error: unknown) {
    yield put(fetchCartFailure((error as Error).message || "Lỗi khi lấy giỏ hàng"));
  }
}

type UpdateQtyPayload = { merchantId?: string; cartItemId: string; quantity: number };

function* updateCartItemQuantitySaga(action: { payload: UpdateQtyPayload }): Generator {
  try {
    const { cartItemId, quantity, merchantId } = action.payload;
    // backend endpoint expects merchantId in path
    const path = merchantId
      ? `/Cart/${merchantId}/items/${cartItemId}/quantity`
      : `/Cart/items/${cartItemId}/quantity`;
  // API expects the body to be a raw number representing the new quantity
  const response = (yield call(api.put, path, quantity)) as { data: unknown };
    yield put(updateCartItemQuantitySuccess(response.data));
    // refresh cart
    yield put(fetchCartRequest());
  } catch (error: unknown) {
    yield put(updateCartItemQuantityFailure((error as Error).message || "Lỗi khi cập nhật số lượng"));
  }
}
function* deleteCartItemSaga(action: { payload: { merchantId?: string; cartItemId: string } }): Generator {
  try {
    const { cartItemId, merchantId } = action.payload;
    const path = merchantId
      ? `/Cart/${merchantId}/items/${cartItemId}`
      : `/Cart/items/${cartItemId}`;
    const response = (yield call(api.delete, path)) as { data: unknown };
    yield put(deleteCartItemSuccess(response.data));
    // refresh cart
    yield put(fetchCartRequest());
  } catch (error: unknown) {
    yield put(deleteCartItemFailure((error as Error).message || "Lỗi khi xóa mục trong giỏ"));
  }
}

export default function* cartSaga() {
  yield takeLatest(addToCartRequest, addToCartSaga);
  yield takeLatest(fetchCartRequest, fetchCartSaga);
  yield takeLatest(updateCartItemQuantityRequest, updateCartItemQuantitySaga);
  yield takeLatest(deleteCartItemRequest, deleteCartItemSaga);
}

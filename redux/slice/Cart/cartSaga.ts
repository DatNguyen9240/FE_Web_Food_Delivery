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

function* addToCartSaga(action: any): Generator {
  try {
    const payload = action.payload;
    const response = yield call(api.post, "/Cart/items", payload);
    // @ts-ignore
    yield put(addToCartSuccess(response.data));
  } catch (error: unknown) {
    // @ts-ignore
    yield put(addToCartFailure((error as Error).message || "Lỗi khi thêm vào giỏ"));
  }
}

function* fetchCartSaga(): Generator {
  try {
    const response = yield call(api.get, "/Cart");
    // @ts-ignore
    yield put(fetchCartSuccess(response.data));
  } catch (error: unknown) {
    // @ts-ignore
    yield put(fetchCartFailure((error as Error).message || "Lỗi khi lấy giỏ hàng"));
  }
}

function* updateCartItemQuantitySaga(action: any): Generator {
  try {
    const { cartItemId, quantity, merchantId } = action.payload;
    // backend endpoint expects merchantId in path
    const path = merchantId
      ? `/Cart/${merchantId}/items/${cartItemId}/quantity`
      : `/Cart/items/${cartItemId}/quantity`;
  // API expects the body to be a raw number representing the new quantity
  const response = yield call(api.put, path, quantity);
    // @ts-ignore
    yield put(updateCartItemQuantitySuccess(response.data));
    // refresh cart
    yield put(fetchCartRequest());
  } catch (error: unknown) {
    // @ts-ignore
    yield put(updateCartItemQuantityFailure((error as Error).message || "Lỗi khi cập nhật số lượng"));
  }
}

export default function* cartSaga() {
  yield takeLatest(addToCartRequest.type, addToCartSaga);
  yield takeLatest(fetchCartRequest.type, fetchCartSaga);
  yield takeLatest(updateCartItemQuantityRequest.type, updateCartItemQuantitySaga);
  yield takeLatest(deleteCartItemRequest.type, function* deleteCartItemSaga(action: any): Generator {
    try {
      const { cartItemId, merchantId } = action.payload;
      const path = merchantId
        ? `/Cart/items/${merchantId}/${cartItemId}`
        : `/Cart/items/${cartItemId}`;
      const response = yield call(api.delete, path);
      // @ts-ignore
      yield put(deleteCartItemSuccess(response.data));
      // refresh cart
      yield put(fetchCartRequest());
    } catch (error: unknown) {
      // @ts-ignore
      yield put(deleteCartItemFailure((error as Error).message || "Lỗi khi xóa mục trong giỏ"));
    }
  });
}

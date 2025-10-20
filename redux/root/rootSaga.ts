import { all } from "redux-saga/effects";
import authSaga from "../slice/Auth/authSaga";
import merchantSaga from "../slice/Merchant/merchantSaga";
import merchantCategorySaga from "../slice/MerchantCategory/merchantCategorySaga";
import menuItemSaga from "../slice/MenuItem/menuItemSaga";
import cartSaga from "../slice/Cart/cartSaga";
import PaymentSaga from "../slice/Payment/PaymentSaga";

export default function* rootSaga(): Generator {
  yield all([authSaga(), merchantSaga(), merchantCategorySaga(), menuItemSaga(), cartSaga(), PaymentSaga()]);
}

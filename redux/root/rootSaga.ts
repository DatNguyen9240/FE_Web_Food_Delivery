import { all } from "redux-saga/effects";
import authSaga from "../slice/Auth/authSaga";
import merchantSaga from "../slice/Merchant/merchantSaga";

export default function* rootSaga(): Generator {
  yield all([authSaga(), merchantSaga()]);
}

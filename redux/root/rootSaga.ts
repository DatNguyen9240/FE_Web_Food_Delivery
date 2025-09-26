import { all } from "redux-saga/effects";
import authSaga from "../slice/Auth/authSaga";

export default function* rootSaga(): Generator {
  yield all([authSaga()]);
}

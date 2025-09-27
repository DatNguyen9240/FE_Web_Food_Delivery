import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slice/Auth/AuthSlice";
import merchantReducer from "../slice/Merchant/merchantSlice";
// import các reducer khác nếu có

const rootReducer = combineReducers({
  auth: authReducer,
  merchant: merchantReducer,
  // Thêm các reducer khác ở đây
});

export default rootReducer;

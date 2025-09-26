import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slice/Auth/AuthSlice";
// import các reducer khác nếu có

const rootReducer = combineReducers({
  auth: authReducer,
  // Thêm các reducer khác ở đây
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slice/Auth/AuthSlice";
import merchantReducer from "../slice/Merchant/merchantSlice";
import merchantCategoryReducer from "../slice/MerchantCategory/merchantCategorySlice";
import menuItemReducer from "../slice/MenuItem/menuItemSlice";
import cartReducer from "../slice/Cart/cartSlice";
import PaymentSaga from "../slice/Payment/PaymentSlice";
// import các reducer khác nếu có

const rootReducer = combineReducers({
  auth: authReducer,
  merchant: merchantReducer,
  merchantCategory: merchantCategoryReducer,
  menuItem: menuItemReducer,
  cart: cartReducer,
  Payment: PaymentSaga,
  // Thêm các reducer khác ở đây
});

export default rootReducer;

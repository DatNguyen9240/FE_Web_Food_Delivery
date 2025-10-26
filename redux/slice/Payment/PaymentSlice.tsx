
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartResponse } from "../Cart/cartSlice";

export interface PaymentCheckoutResponse {
  provider: string;
  providerReference: string;
  paymentUrl: string;
  qrImage?: string | null;
  amount: number;
  orderRef: string;
  orderId: string;
}

export interface PaymentState {
  loading: boolean;
  error: string | null;
  result?: PaymentCheckoutResponse | undefined;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  result: undefined,
};

export const paymentCheckoutRequest = createAction<{ merchantId: string; payload: CartResponse }>("payment/checkoutRequest");
export const paymentCheckoutSuccess = createAction<PaymentCheckoutResponse>("payment/checkoutSuccess");
export const paymentCheckoutFailure = createAction<string>("payment/checkoutFailure");

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentCheckoutRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentCheckoutSuccess, (state, action: PayloadAction<PaymentCheckoutResponse>) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(paymentCheckoutFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;

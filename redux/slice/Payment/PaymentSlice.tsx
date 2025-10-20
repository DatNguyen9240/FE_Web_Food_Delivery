import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
  loading: boolean;
  error: string | null;
  result?: unknown;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  result: undefined,
};

export const paymentCheckoutRequest = createAction<{ merchantId: string; payload: any }>("payment/checkoutRequest");
export const paymentCheckoutSuccess = createAction<unknown>("payment/checkoutSuccess");
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
      .addCase(paymentCheckoutSuccess, (state, action: PayloadAction<unknown>) => {
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

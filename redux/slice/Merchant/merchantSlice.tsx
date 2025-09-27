import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

export interface Merchant {
  merchantId: string;
  ownerUserId: string;
  name: string;
  imgUrl: string | null;
  description: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
  commissionRate: number;
  address: any;
  setting: any;
}

export interface MerchantState {
  merchants: Merchant[];
  loading: boolean;
  error: string | null;
}

const initialState: MerchantState = {
  merchants: [],
  loading: false,
  error: null,
};

export const fetchMerchantsRequest = createAction(
  "merchant/fetchMerchantsRequest"
);
export const fetchMerchantsSuccess = createAction<Merchant[]>(
  "merchant/fetchMerchantsSuccess"
);
export const fetchMerchantsFailure = createAction<string>(
  "merchant/fetchMerchantsFailure"
);

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMerchantsRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMerchantsSuccess,
        (state, action: PayloadAction<Merchant[]>) => {
          state.loading = false;
          state.merchants = action.payload;
          state.error = null;
        }
      )
      .addCase(
        fetchMerchantsFailure,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default merchantSlice.reducer;

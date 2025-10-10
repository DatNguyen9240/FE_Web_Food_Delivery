import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MerchantCategory {
  merchantCategoryId: number;
  name: string;
  description: string;
  isActive: boolean;
  imageUrl: string | null;
}

export interface MerchantCategoryState {
  categories: MerchantCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: MerchantCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchMerchantCategoriesRequest = createAction(
  "merchantCategory/fetchMerchantCategoriesRequest"
);
export const fetchMerchantCategoriesSuccess = createAction<MerchantCategory[]>(
  "merchantCategory/fetchMerchantCategoriesSuccess"
);
export const fetchMerchantCategoriesFailure = createAction<string>(
  "merchantCategory/fetchMerchantCategoriesFailure"
);

const merchantCategorySlice = createSlice({
  name: "merchantCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMerchantCategoriesRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMerchantCategoriesSuccess,
        (state, action: PayloadAction<MerchantCategory[]>) => {
          state.loading = false;
          state.categories = action.payload;
          state.error = null;
        }
      )
      .addCase(
        fetchMerchantCategoriesFailure,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default merchantCategorySlice.reducer;

import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemOption {
  optionId: string;
  selectedValueIds: string[];
}

export interface CartItem {
  menuItemId: string;
  quantity: number;
  options?: CartItemOption[];
}

// Responses from API
export interface CartItemResponse {
  cartItemId: string;
  menuItemId: string;
  menuItemName: string;
  priceAtAdd: number;
  quantity: number;
}

export interface CartResponse {
  cartId: string;
  merchantId?: string;
  merchant?: { merchantId?: string; merchantName?: string };
  items: CartItemResponse[];
  subTotal?: number;
}

export interface CartRequestPayload {
  merchantId: string;
  deliveryFee?: number;
  serviceFee?: number;
  discount?: number;
  items: CartItem[];
}

export interface CartState {
  loading: boolean;
  error: string | null;
  lastOrderResponse?: unknown;
  carts?: CartResponse[];
}

const initialState: CartState = {
  loading: false,
  error: null,
  lastOrderResponse: undefined,
};

// Actions used by saga
export const addToCartRequest = createAction<CartRequestPayload>("cart/addToCartRequest");
export const addToCartSuccess = createAction<unknown>("cart/addToCartSuccess");
export const addToCartFailure = createAction<string>("cart/addToCartFailure");
export const fetchCartRequest = createAction("cart/fetchCartRequest");
export const fetchCartSuccess = createAction<CartResponse[]>("cart/fetchCartSuccess");
export const fetchCartFailure = createAction<string>("cart/fetchCartFailure");
export const updateCartItemQuantityRequest = createAction<{ merchantId?: string; cartItemId: string; quantity: number }>(
  "cart/updateCartItemQuantityRequest"
);
export const updateCartItemQuantitySuccess = createAction<unknown>("cart/updateCartItemQuantitySuccess");
export const updateCartItemQuantityFailure = createAction<string>("cart/updateCartItemQuantityFailure");
export const deleteCartItemRequest = createAction<{ merchantId?: string; cartItemId: string }>(
  "cart/deleteCartItemRequest"
);
export const deleteCartItemSuccess = createAction<unknown>("cart/deleteCartItemSuccess");
export const deleteCartItemFailure = createAction<string>("cart/deleteCartItemFailure");

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartSuccess, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.lastOrderResponse = action.payload;
      })
      .addCase(addToCartFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchCartRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartSuccess, (state, action: PayloadAction<CartResponse[]>) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCartFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;

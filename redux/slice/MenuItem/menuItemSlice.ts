import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";



  export interface MenuItemOptionValue {
    optionValueId: string;
    optionId: string;
    valueName: string;
    priceDelta: number;
    isActive?: boolean;
  }

  export interface MenuItemOption {
    optionId: string;
    menuItemId?: string;
    optionName: string;
    isMultipleChoice: boolean;
    required: boolean;
    isActive?: boolean;
    values: MenuItemOptionValue[];
  }


export interface MenuItem {
  menuItemId: string;
  merchantId: string;
  categoryId: string;
  name: string;
  imgUrl: string | null;
  description: string | null;
  price: number;
  prepTimeMinutes: number;
  supportsScheduling: boolean;
  availableFrom: string | null;
  availableTo: string | null;
  isAvailable: boolean;
  isSpecial: boolean;
  isActive: boolean;
  createdAt: string;
  options: MenuItemOption[];
}

export interface MenuItemState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  selectedItem?: MenuItem | null;
}

const initialState: MenuItemState = {
  items: [],
  loading: false,
  error: null,
  selectedItem: null,
};

// Keep action creators that the saga currently imports and uses
export const fetchMenuItemsRequest = createAction("menuItem/fetchMenuItemsRequest");
export const fetchMenuItemsSuccess = createAction<MenuItem[]>("menuItem/fetchMenuItemsSuccess");
export const fetchMenuItemsFailure = createAction<string>("menuItem/fetchMenuItemsFailure");
export const fetchMenuItemByIdRequest = createAction<string>("menuItem/fetchMenuItemByIdRequest");
export const fetchMenuItemByIdSuccess = createAction<MenuItem>("menuItem/fetchMenuItemByIdSuccess");
export const fetchMenuItemByIdFailure = createAction<string>("menuItem/fetchMenuItemByIdFailure");

const slice = createSlice({
  name: "menuItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItemsRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemsSuccess, (state, action: PayloadAction<MenuItem[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchMenuItemByIdSuccess, (state, action: PayloadAction<MenuItem>) => {
        state.selectedItem = action.payload;
      })
      .addCase(fetchMenuItemsFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;

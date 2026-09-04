import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./productSlices";
export const productStore = configureStore({
  reducer: {
    cart: productSlice.reducer,
  },
});

export type ProductStore = typeof productStore;
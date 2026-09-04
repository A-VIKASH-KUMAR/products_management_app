import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "cart",
  initialState: {
    products: [] as any[],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.products.find(
        (p) => p.id === action.payload.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.products.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, clearCart } = productSlice.actions;

export default productSlice.reducer;

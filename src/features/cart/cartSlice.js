import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      updateCart: (state, action) => {
        state.cartItems = action.payload;
        
        if (state.cartItems.length === 0) {
          state.amount = 0;
          state.total = 0;
          return;
        }

        state.amount = state.cartItems.reduce((acc, item) => acc + item.amount, 0);
        state.total = state.cartItems.reduce((acc, item) => acc + item.amount * item.price, 0);
      }
    }
})
export const { updateCart} = cartSlice.actions;

export default cartSlice.reducer;

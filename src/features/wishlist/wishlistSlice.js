import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishItems: [],
  isLoading: true,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishItems = [];
    },
    updateWishlist: (state, action) => {
      state.wishItems = action.payload;
    },
  },
});

export const {
  clearWishlist,
  updateWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

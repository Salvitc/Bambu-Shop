import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: true,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    }
  }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;

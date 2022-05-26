import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  productList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductsList: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const {getProductsList} = productSlice.actions;

export default productSlice.reducer;

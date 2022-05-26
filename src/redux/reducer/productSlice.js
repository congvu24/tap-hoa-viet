import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getProductFromFirestore} from '../../services/getProduct';

const initialState = {
  productList: [],
};

export const fetchProductList = createAsyncThunk(
  'product/fetchProductList',
  async (_, thunkApi) => {
    try {
      const productList = await getProductFromFirestore();
      console.log(productList);
      thunkApi.dispatch(getProductsList(productList));
    } catch (err) {
      getProductsList([]);
    }
  },
);

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

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getOrdersFromFirestore} from '../../services/getOrders';

const initialState = {
  list: [],
};

export const fetchOrderList = createAsyncThunk(
  'orderList/fetchOrderList',
  async (_, thunkApi) => {
    try {
      const orderList = await getOrdersFromFirestore();
      thunkApi.dispatch(getOrderList(orderList));
    } catch (err) {
      getOrderList([]);
    }
  },
);

const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    getOrderList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {getOrderList} = orderListSlice.actions;

export default orderListSlice.reducer;

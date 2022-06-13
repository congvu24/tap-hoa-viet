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
      console.log('-------data-----', orderList);
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
    clearOrderList: (state, action) => {
      return initialState;
    },
  },
});

export const {getOrderList, clearOrderList} = orderListSlice.actions;

export default orderListSlice.reducer;

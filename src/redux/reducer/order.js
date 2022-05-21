import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createOrderToFirestore} from '../../services/order';

const initialState = {
  products: {},
  discount: 0,
  amount: 0,
  buyerName: '',
  buyerPhone: '',
  note: '',
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (payload, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const order = {...state.order, createAt: Date.now()};

      const listProduct = Object.keys(order.products).map(key => {
        order.amount =
          order.amount +
          order.products[key].sellPrice * order.products[key].number;

        return {
          id: key,
          ...order.products[key],
        };
      });

      order.products = listProduct;

      await createOrderToFirestore(order);
      thunkApi.dispatch(clearOrder());
      payload.onSuccess?.();
    } catch (err) {
      console.log(err);
      payload.onFailed?.();
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    addProduct(state, {payload}) {
      const productCode = payload.productId;
      const number = payload.number;
      state.products = {
        ...state.products,
        [productCode]: {
          ...payload,
          number: (state.products[productCode]?.number ?? 0) + number,
          productName: payload.productName,
        },
      };
    },
    removeProduct(state, {payload}) {
      const productCode = payload.productId;
      state.products = {
        ...state.products,
        [productCode]: {
          ...payload,
          number: state.products[productCode].number - 1,
        },
      };
      if (state.products[productCode].number === 0) {
        delete state.products[productCode];
      }
    },
    updateInfo(state, {payload}) {
      console.log(payload);
      return {...state, ...payload};
    },
    clearOrder(state, payload) {
      console.log('clear ');
      return initialState;
    },
  },
});

export const {addProduct, updateInfo, removeProduct, clearOrder} =
  orderSlice.actions;
export default orderSlice.reducer;

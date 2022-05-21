import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: {},
  discount: 0,
  amount: 0,
  buyerName: '',
  buyerPhone: '',
};

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
          number: state.products[productCode].number - 1,
        },
      };
      if (state.products[productCode].number === 0) {
        delete state.products[productCode];
      }
    },
    updateInfo(state, payload) {
      state = {...state, ...payload};
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

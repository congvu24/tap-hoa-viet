import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {createOrderToFirestore} from '../../services/order';
import {fetchOrderList} from './orderList';
import {updateProduct} from './productSlice';

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
      const order2 = {...order};

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

      // check with current productList

      await createOrderToFirestore(order);

      Object.keys(order2.products).map(key => {
        thunkApi.dispatch(
          updateProduct({
            id: key,
            data: {
              numberOfProducts:
                order2.products[key].numberOfProducts -
                  order2.products[key].number >
                0
                  ? order2.products[key].numberOfProducts -
                    order2.products[key].number
                  : 0,
            },
          }),
        );
      });

      thunkApi.dispatch(clearOrder());
      setTimeout(() => {
        thunkApi.dispatch(fetchOrderList());
      }, 500);
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
      const currentNumber = state.products[productCode]?.number ?? 0;

      if (currentNumber + number > payload.numberOfProducts) {
        Alert.alert(
          'Thông báo',
          'Số lượng sản phẩm thêm lớn hơn số lượng trong kho. số lượng trong kho sẽ giảm về 0.',
          [
            {
              text: 'Tiếp tục',
              onPress: () => {
                console.log('hehe');
              },
            },
          ],
        );
      }
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

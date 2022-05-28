import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './app';
import orderSlice from './order';
import userSlice from './userSlice';
import productSlice from './productSlice';
import categorySlice from './category';

//root reducer
const rootReducer = combineReducers({
  app: appReducer,
  user: userSlice.reducer,
  order: orderSlice,
  product: productSlice,
  category: categorySlice,
});

export default rootReducer;

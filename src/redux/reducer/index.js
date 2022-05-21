import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './app';
import orderSlice from './order';
import userSlice from './userSlice';

//root reducer
const rootReducer = combineReducers({
  app: appReducer,
  user: userSlice.reducer,
  order: orderSlice,
});

export default rootReducer;

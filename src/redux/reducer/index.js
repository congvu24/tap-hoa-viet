import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './app';
import userSlice from './userSlice';

//root reducer
const rootReducer = combineReducers({
  app: appReducer,
  user: userSlice.reducer,
});

export default rootReducer;

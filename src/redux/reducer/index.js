import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './app';
import todoReducer from './todo';

//root reducer
const rootReducer = combineReducers({
  app: appReducer,
  todo: todoReducer,
});

export default rootReducer;

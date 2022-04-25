import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './app';

//root reducer
const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;

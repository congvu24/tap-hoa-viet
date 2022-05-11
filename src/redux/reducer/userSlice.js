import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserInfo: (state, action) => {
      state = action.payload;
      console.log('add successfully' + action.payload);
    },
  },
});
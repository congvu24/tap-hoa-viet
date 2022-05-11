import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
  name: 'user',
  initialState: {
    uid: '',
  },
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action);
      state.uid = action.payload;
      console.log('add successfully' + action.payload);
    },
  },
});

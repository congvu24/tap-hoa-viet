import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
  name: 'user',
  initialState: {
    uid: '',
    name: '',
    phone: '',
    email: '',
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
  },
});

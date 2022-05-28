import {createSlice} from '@reduxjs/toolkit';
import {Animated} from 'react-native';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    offset: new Animated.Value(0),
  },
  reducers: {
    onLoading(state) {
      state.loading = true;
    },
    offLoading(state) {
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setOffset(state, action) {
      state.offset = action.payload;
    },
    resetOffset(state, action) {
      state.offset = new Animated.Value(0);
    },
  },
});

export const {offLoading, setLoading, onLoading, setOffset, resetOffset} =
  appSlice.actions;
export default appSlice.reducer;

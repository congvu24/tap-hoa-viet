import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    data: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeTask: (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index > -1) {
        state.data = [...state.data.splice(index, 1)];
      }
    },
    updateTask: (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index > -1) {
        let newData = state.data;
        newData[index] = action.payload;
        state.data = newData;
      }
    },
  },
});

export const {updateTask, addTask, removeTask} = todoSlice.actions;
export default todoSlice.reducer;

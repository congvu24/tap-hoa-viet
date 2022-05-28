import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCategoryFromFirestore} from '../../services/category';

const initialState = {
  categoryList: [],
};

export const fetchCategoryList = createAsyncThunk(
  'category/fetchCategoryList',
  async (_, thunkApi) => {
    try {
      const categoryList = await getCategoryFromFirestore();
      thunkApi.dispatch(getCategoryList(categoryList));
    } catch (err) {
      getCategoryList([]);
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const {getCategoryList} = categorySlice.actions;

export default categorySlice.reducer;

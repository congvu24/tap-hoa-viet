import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {getProfileFromFirestore} from '../../services/user';

const initialState = {
  isLogin: false,
  uid: '',
  name: '',
  phone: '',
  email: '',
  inputProductNumber: false,
};

export const getCurrentProfile = createAsyncThunk(
  'user/getCurrentProfile',
  async (payload, thunkApi) => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const profile = await getProfileFromFirestore();
        console.log(profile);

        thunkApi.dispatch(setUserInfo(profile));
        payload.onSuccess?.();
      }
    } catch (err) {
      payload.onFailed?.();
      // handle login failed here
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.isLogin = true;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },

    setInputProductNumber: (state, action) => {
      state.inputProductNumber = action.payload;
    },

    signOut: (state, action) => {
      return initialState;
    },
  },
});

export const {setInputProductNumber, setUserInfo, signOut} = userSlice.actions;

export default userSlice;

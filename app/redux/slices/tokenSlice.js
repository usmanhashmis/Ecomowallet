import {createSlice} from '@reduxjs/toolkit';

const initialState = {token: ''};

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;

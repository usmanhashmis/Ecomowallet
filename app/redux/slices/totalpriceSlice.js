import {createSlice} from '@reduxjs/toolkit';

const initialState = {totalPrice: 0};

const totalPriceSlice = createSlice({
  name: 'totalPriceSlice',
  initialState,
  reducers: {
    getTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const {getTotalPrice} = totalPriceSlice.actions;

export default totalPriceSlice.reducer;

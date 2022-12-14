import {createSlice} from '@reduxjs/toolkit';

const initialState = {selectedCoin: 'Tether', cryptoRate: 1, coinSymbol: '$'};

const selectedCoinSlice = createSlice({
  name: 'selectedCoinSlice',
  initialState,
  reducers: {
    changeCoin(state, action) {
      state.selectedCoin = action.payload;
    },
    getRate(state, action) {
      state.cryptoRate = action.payload;
    },
    getSymbol(state, action) {
      state.coinSymbol = action.payload;
    },
  },
});

export const {changeCoin, getRate, getSymbol} = selectedCoinSlice.actions;

export default selectedCoinSlice.reducer;

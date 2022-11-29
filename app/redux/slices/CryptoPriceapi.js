import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const datapara = {
  currency: 'USD',
  sort: 'rank',
  order: 'ascending',
  offset: 0,
  limit: 30,
  meta: true,
};

export const getCryptoPrice = createAsyncThunk(
  'cryptoPriceSlice/getCryptoPrice',
  async () => {
    let tem;
    await axios
      .post('https://api.livecoinwatch.com/coins/list', datapara, {
        headers: {
          'content-Type': 'application/json',
          'x-api-key': '75d4be43-8ea5-459d-9ddf-0e7ac0d9bec9',
        },
      })
      .then(res => (tem = res.data))
      .catch(err => {
        console.log(err, 'error in crypto api');
      });
    return tem;
  },
);

const cryptoPriceSlice = createSlice({
  name: 'cryptoPriceSlice',
  initialState: {cryptoPrices: [], isLoading: false},

  extraReducers: builder => {
    builder
      .addCase(getCryptoPrice.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getCryptoPrice.fulfilled, (state, action) => {
        state.cryptoPrices = action.payload;
      });
  },
});

export default cryptoPriceSlice.reducer;

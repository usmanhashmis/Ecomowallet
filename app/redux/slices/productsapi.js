import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../Constants';

export const getproducts = createAsyncThunk(
  'productSlice/getproducts',
  async () => {
    return await fetch(`${BASE_URL}/categories/getproduct`)
      .then(res => res.json())
      .catch(e => console.log(e.message));
  },
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {products: [], isLoading: false},

  extraReducers: builder => {
    builder
      .addCase(getproducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export default productSlice.reducer;

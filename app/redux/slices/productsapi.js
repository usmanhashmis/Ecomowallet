import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getproducts = createAsyncThunk(
  'productSlice/getproducts',
  async () => {
    return await fetch(
      'https://drab-cyan-fossa-kilt.cyclic.app/categories/getproduct',
    ).then(res => res.json());
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

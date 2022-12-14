import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getproducts = createAsyncThunk(
  'productSlice/getproducts',
  async () => {
    return await fetch('http://192.168.0.110:420/categories/getproduct')
      .then(res => res.json())
      .catch(err => console.log(err.message));
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

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        item => item._id === action.payload._id,
      );

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItems.push({...action.payload, quantity: 1});
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      item.quantity++;
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    removeFromCart(state, action) {
      const removeItem = state.cartItems.filter(
        item => item._id !== action.payload,
      );
      state.cartItems = removeItem;
    },
  },
});

export const {addToCart, incrementQuantity, decrementQuantity, removeFromCart} =
  cartSlice.actions;

export default cartSlice.reducer;

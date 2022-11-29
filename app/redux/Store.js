import {configureStore} from '@reduxjs/toolkit';
import productReducer from './slices/productsapi';
import cartReducer from '../redux/slices/CartSlice';
import cryptoReducer from '../redux/slices/CryptoPriceapi';
import selectCoinReducer from '../redux/slices/selectedCoinSlice';

const Store = configureStore({
  reducer: {
    productReducer,
    cart: cartReducer,
    crypto: cryptoReducer,
    coin: selectCoinReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default Store;

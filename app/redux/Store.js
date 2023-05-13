import {configureStore} from '@reduxjs/toolkit';
import productReducer from './slices/productsapi';
import cartReducer from '../redux/slices/CartSlice';
import cryptoReducer from '../redux/slices/CryptoPriceapi';
import selectCoinReducer from '../redux/slices/selectedCoinSlice';
import totalPriceReducer from '../redux/slices/totalpriceSlice';
import tokenReducer from '../redux/slices/tokenSlice';

const Store = configureStore({
  reducer: {
    productReducer,
    cart: cartReducer,
    crypto: cryptoReducer,
    coin: selectCoinReducer,
    totalPrice: totalPriceReducer,
    token: tokenReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default Store;

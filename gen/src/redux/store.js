import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import cartSyncMiddlewareRR from './cartSync';
import productReducer from '../AdminPanel/ReduxAdmin/productSlice'

export const storee = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddlewareRR),
});
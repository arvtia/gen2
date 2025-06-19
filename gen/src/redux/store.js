import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import cartSyncMiddlewareRR from './cartSync';


export const storee = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddlewareRR),
});
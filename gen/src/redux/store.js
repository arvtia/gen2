import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import cartSyncMiddlewareRR from './cartSync';
import productReducer from '../AdminPanel/ReduxAdmin/productSlice'
import sliderImageReducer from '../AdminPanel/ReduxAdmin/sliderSlice'
import navLinksReducer from '../AdminPanel/ReduxAdmin/navSlice'
export const storee = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    sliderImage: sliderImageReducer,
    navLinks: navLinksReducer,
    // sliderImage: sliderImageReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddlewareRR),
});
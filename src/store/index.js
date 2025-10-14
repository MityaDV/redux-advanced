import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './main-slice';
import cartSlice from './cart-slice';

const store = configureStore({
  reducer: {
    main: mainSlice,
    cart: cartSlice
  }
});

export default store;

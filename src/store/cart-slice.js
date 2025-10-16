import { createSlice } from '@reduxjs/toolkit';
import { mainActions } from './main-slice';

const initialState = {
  items: [],
  itemsQuantity: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((i) => i.id === newItem.id);
      state.itemsQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);
      state.itemsQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    }
    // updateCart: (state, action) => {
    //   state.items = action.payload.items;
    //   state.itemsQuantity = action.payload.itemsQuantity;
    // }
  }
});

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      mainActions.showStatusMessage({
        status: 'pending',
        title: 'Sending Data',
        message: 'Sending Data Cart...'
      })
    );

    const sentHttpRequest = async () => {
      const res = await fetch(
        'https://react-cours-http-3ee12-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartData)
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch cart data.');
      }
    };

    try {
      await sentHttpRequest();

      dispatch(
        mainActions.showStatusMessage({
          status: 'success',
          title: 'Data Sent Successfully',
          message: 'Cart data sent!'
        })
      );
    } catch (e) {
      dispatch(
        mainActions.showStatusMessage({
          status: 'error',
          title: 'Error Sendining Data',
          message: 'Failed to fetch cart data.'
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

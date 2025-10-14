import { createSlice } from '@reduxjs/toolkit';

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

      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
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
    removeItem: (state, action) => {}
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../services/api';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: { [key: number]: CartItem };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { ...action.payload, quantity: 1 };
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        if (quantity <= 0) {
          delete state.items[id];
        } else {
          state.items[id].quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

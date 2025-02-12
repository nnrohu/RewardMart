import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

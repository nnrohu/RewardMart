import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  highScore: number;
  currentScore: number;
  discountCode: string | null;
}

const initialState: GameState = {
  highScore: 0,
  currentScore: 0,
  discountCode: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentScore: (state, action: PayloadAction<number>) => {
      state.currentScore = action.payload;
      if (action.payload > state.highScore) {
        state.highScore = action.payload;
      }
    },
    setDiscountCode: (state, action: PayloadAction<string>) => {
      state.discountCode = action.payload;
    },
    resetGame: (state) => {
      state.currentScore = 0;
    },
  },
});

export const { setCurrentScore, setDiscountCode, resetGame } = gameSlice.actions;
export default gameSlice.reducer;

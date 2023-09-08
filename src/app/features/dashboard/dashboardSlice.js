import { createSlice } from '@reduxjs/toolkit';

export const themesEnum = { dark: 'dark', default: 'default' };

const initialState = {
  theme: themesEnum.dark
};

export const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    }
  }
});

export const { setTheme } = slice.actions;

export const selectTheme = state => state.dashboard.theme;

export default slice.reducer;

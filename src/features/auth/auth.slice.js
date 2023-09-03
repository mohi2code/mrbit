import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ui: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    test() { }
  },
});

// Exporting actions here
export const {
  test
} = authSlice.actions;

// Exporting reducer as default
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentials: null,
  data: null
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.credentials = action.payload;
    }
  }
});

export const { setCredentials } = slice.actions;

export const selectCreds = state => state.auth.credentials;

export default slice.reducer;

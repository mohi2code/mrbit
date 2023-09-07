import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentials: null,
  account: null
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.credentials = action.payload;
    },
    setAccount(state, action) {
      state.account = action.payload;
    }
  }
});

export const { setCredentials, setAccount } = slice.actions;

export const selectCreds = state => state.auth.credentials;
export const selectAccount = state => state.auth.account;

export default slice.reducer;

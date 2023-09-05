import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const {
  setUser
} = slice.actions;


/** Selectors are defined here */
const selectUser = state => state.auth.user;

export {
  selectUser
};

/** Default export */
export default slice.reducer;

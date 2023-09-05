import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentials: null,
  data: null
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default slice.reducer;

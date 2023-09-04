import { configureStore } from '@reduxjs/toolkit'
import { firebaseAPI } from './services/firebaseAPI'

export const store = configureStore({
  reducer: {
    [firebaseAPI.reducerPath]: firebaseAPI.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseAPI.middleware),
})
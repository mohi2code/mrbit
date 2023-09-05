import { configureStore } from '@reduxjs/toolkit'
import { firebaseAPI } from './services/firebaseAPI'
import authReducer from '../features/auth/auth'

export const store = configureStore({
  reducer: {
    [firebaseAPI.reducerPath]: firebaseAPI.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseAPI.middleware),
})
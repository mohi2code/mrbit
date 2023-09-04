import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth } from '../config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';

export const firebaseAPI = createApi({
  reducerPath: 'firebaseAPI',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const creds = await signInWithEmailAndPassword(auth, email, password);
          return { data: serializeUser(creds.user) }
        } catch (error) {
          return { error: error.code };
        }
      }
    })
  })
})

const serializeUser = ({
  email
}) => ({
  email
})

export const {
  useLoginMutation
} = firebaseAPI;

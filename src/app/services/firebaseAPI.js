import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth, firestore } from '../config/firebaseConfig'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore'

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
    }),

    register: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const creds = await createUserWithEmailAndPassword(auth, email, password);
          return { data: serializeUser(creds.user) }
        } catch (error) {
          return { error: error.code }
        }
      }
    }),

    accountsList: builder.query({
      async queryFn() {
        try {
          const ref = collection(firestore, 'accounts');
          const querySnapshot = await getDocs(ref);
          let accounts = [];
          querySnapshot?.forEach(doc => {
            accounts.push(serializeAccountDoc({ id: doc.id, ...doc.data() }));
          });
          return { data: accounts };
        } catch (error) {
          return { error }
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

const serializeAccountDoc = ({
  id,
  accountType,
  isActivated
}) => ({
  id,
  accountType,
  isActivated
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useAccountsListQuery,
} = firebaseAPI;

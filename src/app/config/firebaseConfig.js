import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyASapdRtPd5Zo5fxAYmK0Z587Zz0wafkgQ",
  authDomain: "mrbit-9e8c9.firebaseapp.com",
  projectId: "mrbit-9e8c9",
  storageBucket: "mrbit-9e8c9.appspot.com",
  messagingSenderId: "931323046056",
  appId: "1:931323046056:web:2a1fd9acfb9bddc3a07a9d",
  measurementId: "G-FMV2L7LX5P"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export const auth = getAuth();


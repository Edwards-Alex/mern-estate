// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   apiKey: "AIzaSyB6kTxYlzEyHBErJIoCdi-PWo4F-XXm_rw",
  authDomain: "mern-estate-dafdf.firebaseapp.com",
  projectId: "mern-estate-dafdf",
  storageBucket: "mern-estate-dafdf.appspot.com",
  messagingSenderId: "979277743495",
  appId: "1:979277743495:web:121bec7158d6a2c9507f22"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
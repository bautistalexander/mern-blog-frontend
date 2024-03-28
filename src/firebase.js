// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-app-blog.firebaseapp.com",
  projectId: "mern-app-blog",
  storageBucket: "mern-app-blog.appspot.com",
  messagingSenderId: "259718641113",
  appId: "1:259718641113:web:ca7e9a4b23c53a0aced5c8"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
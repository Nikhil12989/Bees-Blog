// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-1eb6f.firebaseapp.com",
  projectId: "mern-blog-1eb6f",
  storageBucket: "mern-blog-1eb6f.appspot.com",
  messagingSenderId: "392578587557",
  appId: "1:392578587557:web:b031c6572543214f6a264c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


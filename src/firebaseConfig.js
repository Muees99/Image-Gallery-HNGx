// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj9vha2Hi-M4MhxFo_Mp3gYOPrANplBrc",
  authDomain: "image-gallery-3e720.firebaseapp.com",
  projectId: "image-gallery-3e720",
  storageBucket: "image-gallery-3e720.appspot.com",
  messagingSenderId: "60621680802",
  appId: "1:60621680802:web:927f0bc955257b4457e7fb",
  measurementId: "G-JGDBL10GW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getAuth(app);

// export default app;
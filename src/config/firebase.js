// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3jhlGC2J5oMCUkO2xeWORpJppZUb97GY",
  authDomain: "vite-contact-6626a.firebaseapp.com",
  projectId: "vite-contact-6626a",
  storageBucket: "vite-contact-6626a.appspot.com",
  messagingSenderId: "231823550184",
  appId: "1:231823550184:web:aef86ff68f57b895ec4b5d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
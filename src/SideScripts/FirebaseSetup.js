// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase , ref, onValue, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg9Tv9E-HzYySMLU6ubpi-080ssX3PImk",
  authDomain: "cineverse-8470a.firebaseapp.com",
  projectId: "cineverse-8470a",
  storageBucket: "cineverse-8470a.appspot.com",
  messagingSenderId: "612186195614",
  appId: "1:612186195614:web:a0625ff05509c8c9891d8f",
  measurementId: "G-QGCMRKXV8N",
  databaseURL: 'https://cineverse-8470a-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)


export  { app, analytics, database,  ref, onValue ,set};
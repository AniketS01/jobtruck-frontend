// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNK9qlEVp1TMxdrRQyqE04x09z6dLqcKk",
  authDomain: "jobtruck-6f6c5.firebaseapp.com",
  projectId: "jobtruck-6f6c5",
  storageBucket: "jobtruck-6f6c5.appspot.com",
  messagingSenderId: "409766975719",
  appId: "1:409766975719:web:f182687da633015d8dea42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
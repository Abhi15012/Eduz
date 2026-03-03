// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPjujSyUz1lj_t3C-XYKM_qUqVBRsPkHg",
  authDomain: "eduz-5c1c4.firebaseapp.com",
  projectId: "eduz-5c1c4",
  storageBucket: "eduz-5c1c4.firebasestorage.app",
  messagingSenderId: "840991571656",
  appId: "1:840991571656:web:175a269a2dd9140bd2affd",
  measurementId: "G-QC7NDE6XNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
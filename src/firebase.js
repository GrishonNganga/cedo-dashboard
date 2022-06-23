// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8-4eIqO4e0FFJVBeMfwVwivVjoNvQ_nw",
    authDomain: "cedo-7f9c5.firebaseapp.com",
    projectId: "cedo-7f9c5",
    storageBucket: "cedo-7f9c5.appspot.com",
    messagingSenderId: "519231491172",
    appId: "1:519231491172:web:f6c56ee1219f2d35d72371",
    measurementId: "G-F30ZSNC19F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

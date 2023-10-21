// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-Ffm4We_QQ0oz6bOAENiw3kxGlis25Hw",
    authDomain: "videogame-ecommerce-2d8fb.firebaseapp.com",
    projectId: "videogame-ecommerce-2d8fb",
    storageBucket: "videogame-ecommerce-2d8fb.appspot.com",
    messagingSenderId: "979056774021",
    appId: "1:979056774021:web:8ae1b7f65c1c016f2492ec",
    measurementId: "G-287G8FN3E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Database
export const db = getFirestore(app);
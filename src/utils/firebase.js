// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyxsNiBYj9xVXTI85yO3um7iqX0Q157Eo",
  authDomain: "netflix-gpt-1ef51.firebaseapp.com",
  projectId: "netflix-gpt-1ef51",
  storageBucket: "netflix-gpt-1ef51.appspot.com",
  messagingSenderId: "737274781800",
  appId: "1:737274781800:web:be61c4358962b280f15bdd",
  measurementId: "G-VFXN6CY61N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//central API
export const auth = getAuth();

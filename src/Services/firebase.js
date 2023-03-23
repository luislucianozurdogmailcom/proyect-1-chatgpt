// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUHeNPs2nmnMbUzRXPadE8twWfrHdARPI",
  authDomain: "callidus-oauth-7456c.firebaseapp.com",
  projectId: "callidus-oauth-7456c",
  storageBucket: "callidus-oauth-7456c.appspot.com",
  messagingSenderId: "508627833380",
  appId: "1:508627833380:web:1e2f70180cf03f73dafeb1"
};

// Initialize Firebase
const fbConfig = initializeApp(firebaseConfig);
const auth = getAuth(fbConfig);

export {
    fbConfig,
    auth
}
    
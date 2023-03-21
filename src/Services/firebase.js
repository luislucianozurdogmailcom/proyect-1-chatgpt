// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyak6snLg4u-Nf5B0SBjD6wVjoE-8x1QQ",
  authDomain: "callidus-api.firebaseapp.com",
  projectId: "callidus-api",
  storageBucket: "callidus-api.appspot.com",
  messagingSenderId: "356095520498",
  appId: "1:356095520498:web:8967b4ee9a6d08020cea6b"
};

// Initialize Firebase
const fbConfig = initializeApp(firebaseConfig);
const auth = getAuth(fbConfig);

export {
    fbConfig,
    auth
}
    
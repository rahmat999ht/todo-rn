import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkYNsycjKM3kzuH7MKXV3ZR18bfgauR8g",
  authDomain: "skripsi-92779.firebaseapp.com",
  databaseURL: "https://skripsi-92779-default-rtdb.firebaseio.com",
  projectId: "skripsi-92779",
  storageBucket: "skripsi-92779.appspot.com",
  messagingSenderId: "1032606244343",
  appId: "1:1032606244343:web:97cc87e348fb3ef4aae2f2",
  measurementId: "G-0P9DM3E3FK",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

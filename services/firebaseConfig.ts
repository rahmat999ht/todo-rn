// import {} from "@react-native-firebase/app";

// Optionally import the services that you want to use
// import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import firestore from "@react-native-firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDkYNsycjKM3kzuH7MKXV3ZR18bfgauR8g",
//   authDomain: "skripsi-92779.firebaseapp.com",
//   databaseURL: "https://skripsi-92779-default-rtdb.firebaseio.com",
//   projectId: "skripsi-92779",
//   storageBucket: "skripsi-92779.appspot.com",
//   messagingSenderId: "1032606244343",
//   appId: "1:1032606244343:web:97cc87e348fb3ef4aae2f2",
//   measurementId: "G-0P9DM3E3FK",
// };

// const app = initializeApp(firebaseConfig);

// export const db = firebase(app);
export const db = firestore();
// export const auth = getAuth(app);

// Android : 1032606244343-gann6s2qi99it95ep4jdp5tg0opptqdi.apps.googleusercontent.com
// IOS : 1032606244343-kd53jfh696cpq7k73aq6t89nl6qv3qb8.apps.googleusercontent.com
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// initialize firebaseApp with firebase-config values
const firebaseConfig = {
  apiKey: "AIzaSyCa_fAbesNxeRXBUINdlCRdOkm4Iuj71_M",
  authDomain: "cuspot-c33ef.firebaseapp.com",
  projectId: "cuspot-c33ef",
  storageBucket: "cuspot-c33ef.appspot.com",
  messagingSenderId: "952066253953",
  appId: "1:952066253953:web:ed003da01ce18c7ab95980",
  measurementId: "G-50F4968PD4"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// firebase - Data-Base
const db = app.firestore();

// firebase - Storage
const storage = firebase.storage();

// firebase - Auth
const auth = firebase.auth();

// firebase -Auth Provider (Google)
const provider = new firebase.auth.GoogleAuthProvider();

export { storage, auth, provider,db };

export default db;

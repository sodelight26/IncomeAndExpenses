import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "react-native-ie.firebaseapp.com",
    projectId: "react-native-ie",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore(); // Get a Firestore instance

export default db; // Export the Firestore instance for use in your app

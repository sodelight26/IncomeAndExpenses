import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJ1m91L37D4wzONF1WABIOFbYtS11wkiM",
    authDomain: "react-native-ie.firebaseapp.com",
    projectId: "react-native-ie",
    storageBucket: "react-native-ie.appspot.com",
    messagingSenderId: "2261357178",
    appId: "1:2261357178:web:35a4bf6061e8c6ebcb61c3",
    measurementId: "G-998M6TV072"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore(); // Get a Firestore instance

export default db; // Export the Firestore instance for use in your app

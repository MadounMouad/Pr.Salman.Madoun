import * as firebase from 'firebase/app';
import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnISghlBPW9pnxVFnXm1byTDoh39InfBk",
    authDomain: "salman-madoun.firebaseapp.com",
    projectId: "salman-madoun",
    storageBucket: "salman-madoun.appspot.com",
    messagingSenderId: "248624946614",
    appId: "1:248624946614:web:94f8c63fdc8dd5ec5eb517",
    measurementId: "G-N2KT4QQF44"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;
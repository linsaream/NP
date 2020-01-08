import firebase from 'firebase/app'
import 'firebase/firestore'
//gsutil cors set cors.json gs://project-name.appspot.com

let firebaseApp;
  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDuicOsibY2WHZXf-7fsubcL6RT48Rx48k",
    authDomain: "word-lookup-7b81e.firebaseapp.com",
    databaseURL: "https://word-lookup-7b81e.firebaseio.com",
    projectId: "word-lookup-7b81e",
    storageBucket: "word-lookup-7b81e.appspot.com",
    messagingSenderId: "136812520391",
    appId: "1:136812520391:web:2a0a1ade622bd0e39bafe2"
  });

export default {
  db: firebaseApp.firestore(),
}


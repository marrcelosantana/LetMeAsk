import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBRjo0wnBcZTcxbE5aOuywud9mf7v4K1DQ",
  authDomain: "letmeask-50052.firebaseapp.com",
  databaseURL: "https://letmeask-50052-default-rtdb.firebaseio.com",
  projectId: "letmeask-50052",
  storageBucket: "letmeask-50052.appspot.com",
  messagingSenderId: "57839970405",
  appId: "1:57839970405:web:2526f5dd64a61b985ebe8c"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }

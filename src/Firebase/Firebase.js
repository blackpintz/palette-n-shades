import * as firebase from 'firebase/app'
import 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqN-mOyDPvYbF-xFm8oedoVECMU-A8CKo",
    authDomain: "shadesofcolor-fb99e.firebaseapp.com",
    databaseURL: "https://shadesofcolor-fb99e.firebaseio.com",
    projectId: "shadesofcolor-fb99e",
    storageBucket: "",
    messagingSenderId: "197182513734",
    appId: "1:197182513734:web:a44f1980fdff71d9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database()


 export {firebase, database as default} 
//   Test whether the connection works

// firebase.database().ref().set({
//     name: 'Rose Wanjohi',
//     age: 28,
//     isSingle: true,
//     location: {
//       city: 'Nairobi',
//       country: 'Kenya'
//     }
// })
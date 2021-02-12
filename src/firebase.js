import firebase from "firebase";
import app from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyChthpKkg4VMm54OqtWWj_uVnR1K-R2rdI",
  authDomain: "card-project-6d96a.firebaseapp.com",
  projectId: "card-project-6d96a",
  storageBucket: "card-project-6d96a.appspot.com",
  messagingSenderId: "563298165854",
  appId: "1:563298165854:web:b9be1fab18da6f9871c0cf",
  measurementId: "G-2GQH2JNRVH",
};

app.initializeApp(firebaseConfig);

export default firebase.database().ref();

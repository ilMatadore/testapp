import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA_hWwIyUBpFZY9-xBNrFO5tDFFAygD8MM",
    authDomain: "eureka-db.firebaseapp.com",
    databaseURL: "https://eureka-db.firebaseio.com",
    projectId: "eureka-db",
    storageBucket: "eureka-db.appspot.com",
    messagingSenderId: "146609669968",
    appId: "1:146609669968:web:14b38a12fa5b6164534e55",
    measurementId: "G-X3QQWCNLNB"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDAYo9SHwt0v_0V08ucTnw86BxSCy4gJ94",
    authDomain: "chat-react-3386e.firebaseapp.com",
    projectId: "chat-react-3386e",
    storageBucket: "chat-react-3386e.appspot.com",
    messagingSenderId: "871754830089",
    appId: "1:871754830089:web:1d7f556b564869eeaf03d8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
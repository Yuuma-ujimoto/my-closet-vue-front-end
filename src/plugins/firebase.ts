import {initializeApp} from 'firebase/app'
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD_13QbGJPeoispy6cCOztkOPgab4QgAF8",
    authDomain: "mycloset-7e3de.firebaseapp.com",
    projectId: "mycloset-7e3de",
    storageBucket: "mycloset-7e3de.appspot.com",
    messagingSenderId: "194020926976",
    appId: "1:194020926976:web:923d2de8900279bc7c1ae5",
    measurementId: "G-3RKRCB6330"
};


export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

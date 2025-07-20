import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAh5apvZA5dn-21bG9k4i_MvWR8dMWsHWk",
  authDomain: "api-s-validator.firebaseapp.com",
  projectId: "api-s-validator",
  storageBucket: "api-s-validator.firebasestorage.app",
  messagingSenderId: "1031596067068",
  appId: "1:1031596067068:web:2e9576a72133934692ef79"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ props }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) setUser(user);
            else setUser(null);
        })
    }, [])

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password);
    }

    const signinWithGoogle = () => {
        signInWithPopup(auth, googleProvider);
    }

    const isLoggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{
            signUp,
            signIn,
            signinWithGoogle,
            user,
            isLoggedIn,
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export const useFirebase = () => useContext(FirebaseContext);

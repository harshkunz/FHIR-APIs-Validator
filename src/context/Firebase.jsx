import { createContext, useContext, useState, useEffect, use } from "react";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAh5apvZA5dn-21bG9k4i_MvWR8dMWsHWk",
  authDomain: "api-s-validator.firebaseapp.com",
  projectId: "api-s-validator",
  storageBucket: "api-s-validator.firebasestorage.app",
  messagingSenderId: "1031596067068",
  appId: "1:1031596067068:web:2e9576a72133934692ef79"
};

const app = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ props }) => {
    return (
        <FirebaseContext.Provider value={{}}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export const useFirebase = () => useContext(FirebaseContext);

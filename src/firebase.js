
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCXvAkLr7V_ANjcH_qlspt6bi3tVLQDd7M",
    authDomain: "e-commers-10-2023.firebaseapp.com",
    projectId: "e-commers-10-2023",
    storageBucket: "e-commers-10-2023.appspot.com",
    messagingSenderId: "728397060416",
    appId: "1:728397060416:web:572525d2ab539b4181c2a5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 
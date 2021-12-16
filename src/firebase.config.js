import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJtkdBbreygMGWAX1nkb0SMngS07swxpk",
    authDomain: "house-marketplace-app-58cb3.firebaseapp.com",
    projectId: "house-marketplace-app-58cb3",
    storageBucket: "house-marketplace-app-58cb3.appspot.com",
    messagingSenderId: "402496754210",
    appId: "1:402496754210:web:5665c989fbf9edab70707b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
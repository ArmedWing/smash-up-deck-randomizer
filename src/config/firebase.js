import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQ2RhpSb40pcq11W4kBl7yNU7ud0nJTNc",
    authDomain: "smash-up-randomizer.firebaseapp.com",
    projectId: "smash-up-randomizer",
    storageBucket: "smash-up-randomizer.appspot.com",
    messagingSenderId: "490831800733",
    appId: "1:490831800733:web:acd89e53cec4d4b80b6774"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
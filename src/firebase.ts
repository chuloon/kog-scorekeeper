import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKH1pg0N-VWf3wX1tijL6w4I_KX5kPw8Y",
    authDomain: "kog-scorekeeper.firebaseapp.com",
    projectId: "kog-scorekeeper",
    storageBucket: "kog-scorekeeper.appspot.com",
    messagingSenderId: "418492273974",
    appId: "1:418492273974:web:98fb77a9775e326ce18f97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
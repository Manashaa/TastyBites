// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAddaBoN4xdZFTUxhIFZgJRBgvbOSyOg40",
  authDomain: "tastybites-ab8a3.firebaseapp.com",
  projectId: "tastybites-ab8a3",
  storageBucket: "tastybites-ab8a3.firebasestorage.app",
  messagingSenderId: "1074274527667",
  appId: "1:1074274527667:web:cd29346014ebd15eb643c6",
  measurementId: "G-WLVPGH0WB2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

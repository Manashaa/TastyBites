// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0zZnOkPdaWckgCq1FpA4bWc9nIqHoJfw",
  authDomain: "tastybites-b8225.firebaseapp.com",
  projectId: "tastybites-b8225",
  storageBucket: "tastybites-b8225.firebasestorage.app",
  messagingSenderId: "312143518883",
  appId: "1:312143518883:web:0b2f9cf33cec5dcb64b316"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

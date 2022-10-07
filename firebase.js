import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD3fqiFnlM78TUIu-H1biwSiVWsJfiw6Kc",
  authDomain: "todoapp-7bf62.firebaseapp.com",
  projectId: "todoapp-7bf62",
  storageBucket: "todoapp-7bf62.appspot.com",
  messagingSenderId: "343351779039",
  appId: "1:343351779039:web:e488deb92455367d68d36a",
  measurementId: "G-HYB7CQS5L8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}
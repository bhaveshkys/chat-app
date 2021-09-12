import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAomYIAcSZb7WdhTKLvqJPSec4_o8SCazg",
    authDomain: "chatapp-81272.firebaseapp.com",
    projectId: "chatapp-81272",
    storageBucket: "chatapp-81272.appspot.com",
    messagingSenderId: "1061673666630",
    appId: "1:1061673666630:web:e0a94d75723430d1996247"
  };

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
export  {firebase, db};

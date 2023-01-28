import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEviJwmkx-FTAbnAjMn4AiUYaoPZNRxOk",
  authDomain: "chatapplication-b25fe.firebaseapp.com",
  projectId: "chatapplication-b25fe",
  storageBucket: "chatapplication-b25fe.appspot.com",
  messagingSenderId: "968670109703",
  appId: "1:968670109703:web:bb8fe80cf6383acbb78aa2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

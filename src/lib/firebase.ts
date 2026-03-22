import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2nyBhCmsMXh6g0ZTUni4Ws0TwQoRMtbo",
  authDomain: "sthanu-setu-technologies.firebaseapp.com",
  projectId: "sthanu-setu-technologies",
  storageBucket: "sthanu-setu-technologies.firebasestorage.app",
  messagingSenderId: "790742831953",
  appId: "1:790742831953:web:d4f6871f262e4548613970",
  measurementId: "G-HKZTYBPFH9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };

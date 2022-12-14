import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDpCEH4yFiVQGDP3l84mXLiBsnNVPu8E3o",
  authDomain: "microblogging-5b11c.firebaseapp.com",
  projectId: "microblogging-5b11c",
  storageBucket: "microblogging-5b11c.appspot.com",
  messagingSenderId: "573635057124",
  appId: "1:573635057124:web:b7fb13de7f606ee71423f1",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage=getStorage(app)

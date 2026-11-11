import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE5r7dpAKvqbHIVF48BYOz4Jqet0T_Cn0",
  authDomain: "linktree-c12a6.firebaseapp.com",
  projectId: "linktree-c12a6",
  storageBucket: "linktree-c12a6.firebasestorage.app",
  messagingSenderId: "804676618284",
  appId: "1:804676618284:web:2142667989b60e868f2989",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC-HxGXZ26fSeeV3aYftIo2nk3F2baoElY",
  authDomain: "my-unspalsh.firebaseapp.com",
  projectId: "my-unspalsh",
  storageBucket: "my-unspalsh.appspot.com",
  messagingSenderId: "710782837781",
  appId: "1:710782837781:web:7f4bf08b0aa77c20da9a1c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

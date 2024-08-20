// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYeGNKtmSfCfM3g_ierecr8Yefjq8YvQI",
  authDomain: "pack-n-go-814f3.firebaseapp.com",
  projectId: "pack-n-go-814f3",
  storageBucket: "pack-n-go-814f3.appspot.com",
  messagingSenderId: "184545041836",
  appId: "1:184545041836:web:fbccb5cfaf1aac4c94ee09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB =getFirestore(app);
export const storage=getStorage(app);

export default DB;
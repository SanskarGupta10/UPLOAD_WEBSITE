// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChehyZoJCLQ5teGdLG6mfEMduQe5zkPL8",
  authDomain: "testing-project-ed675.firebaseapp.com",
  projectId: "testing-project-ed675",
  storageBucket: "testing-project-ed675.firebasestorage.app",
  messagingSenderId: "919188174861",
  appId: "1:919188174861:web:0e0d38c95987cc1a027d44",
  measurementId: "G-82212XKRDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, storage };

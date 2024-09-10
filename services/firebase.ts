// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDr0D6bns1mNup3sjIAwMaRmFEoY-iAnqU",
	authDomain: "linkedin-clone-8f9c9.firebaseapp.com",
	projectId: "linkedin-clone-8f9c9",
	storageBucket: "linkedin-clone-8f9c9.appspot.com",
	messagingSenderId: "437899094365",
	appId: "1:437899094365:web:0bf926a0f46e5860eea0b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

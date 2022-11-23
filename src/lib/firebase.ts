// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyABDESCgo1ij0s0e6GSDrHKbzZd9nTENew',

	authDomain: 'sveltekit-unnamed.firebaseapp.com',

	projectId: 'sveltekit-unnamed',

	storageBucket: 'sveltekit-unnamed.appspot.com',

	messagingSenderId: '1067685510953',

	appId: '1:1067685510953:web:eb95f6c117d661f53f0138',

	measurementId: 'G-Q76RNP4DF7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const auth = () => {
	return getAuth();
};

export default { app, googleAuthProvider, auth };

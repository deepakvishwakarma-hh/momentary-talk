import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// for authentication with google
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBOTCdLMZBd2S24CqAdIGmpH9xSvnsRvI4",
    authDomain: "momentart-chat.firebaseapp.com",
    databaseURL: "https://momentart-chat-default-rtdb.firebaseio.com",
    projectId: "momentart-chat",
    storageBucket: "momentart-chat.appspot.com",
    messagingSenderId: "634059730033",
    appId: "1:634059730033:web:ef2258015a6604eaac3fd0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database

// for authentication with google
export const googleAuth = getAuth(app)
export const provider = new GoogleAuthProvider();

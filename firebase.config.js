import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// for authentication with google
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_ENV_VARIABLE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_ENV_VARIABLE_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_ENV_VARIABLE_BASEURL,
    projectId: process.env.NEXT_PUBLIC_ENV_VARIABLE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_ENV_VARIABLE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_ENV_VARIABLE_SENDERID,
    appId: process.env.NEXT_PUBLIC_ENV_VARIABLE_APPID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database

// for authentication with google
export const googleAuth = getAuth(app)
export const provider = new GoogleAuthProvider();
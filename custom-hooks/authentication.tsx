// I AM CUSTOM HOOK GOOGLE AUTH FUNCTIONALITY

import jwt from "jsonwebtoken"
import { useRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import { googleAuth, provider } from "../firebase.config";
import { extract } from "../component/flowsys/flow";

import type { UserCredential } from "firebase/auth";

const Authentication = () => {
    const router = useRouter()

    // encrypt credentials to JWT token - extract only Name , email , photoURL
    const encrpt_store = (data: UserCredential) => {
        const { displayName, email, photoURL } = data.user;
        const TOKEN = jwt.sign({ displayName, email, photoURL }, process.env.NEXT_PUBLIC_ENV_VARIABLE_SECRETKEY as any)
        const local_store = localStorage.setItem('token', TOKEN)
        // short time fix for bug
        router.reload()
    }

    // authenticate user with google credentials
    const autheticateWithGoogle = () => {
        signInWithPopup(googleAuth, provider)
            .then(data => { encrpt_store(data) })
            .then(data => { extract(router, '/') })
            .catch(err => { alert(err) })
    }
    return autheticateWithGoogle
}
export default Authentication

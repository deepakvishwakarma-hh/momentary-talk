
import jwt from "jsonwebtoken"
import { useRouter, NextRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import { googleAuth, provider } from "../firebase.config";
import { extract } from "../component/flow-system/flow";

const Authentication = () => {
    const router = useRouter()

    const encrpt_store = (data: any) => {
        const { displayName, email, photoURL } = data.user;
        const TOKEN = jwt.sign({ displayName, email, photoURL }, "secret_key")
        const local_store = localStorage.setItem('token', TOKEN)
    }

    const autheticateWithGoogle = () => {
        signInWithPopup(googleAuth, provider)
            .then(data => { encrpt_store(data) })
            .then(data => { extract(router as any, '/') })
            .catch(err => { alert(err) })
    }
    return autheticateWithGoogle
}
export default Authentication

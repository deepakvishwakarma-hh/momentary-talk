import database from "../firebase.config";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react"
import { ref, update } from "firebase/database";
import { useAppSelector } from "../src/store/hook";

type updateMsg = (id: string) => void
type block = (email: string) => void
import type * as store from "../types/store"
type updateOnline = (online: store.user[], email: string) => void

const useConfigChat = () => {

    const toast = useToast()
    const router = useRouter()
    const id = router.query.id;
    const user: store.user = useAppSelector(state => state?.user)
    const oldChat: store.chat[] = useAppSelector(state => state?.room?.chat)
    const blocked: string[] = useAppSelector(state => state?.room?.blocked)

    const updateMsg: updateMsg = (msg) => {
        const chatBlock = { sender: user, message: msg, cat: +Date.now() }
        // condition - 
        const payload = (oldChat) ? { chat: [...oldChat, chatBlock] } : { chat: [chatBlock] }
        // preventing message to be blank
        const isMsgBlank = msg == '';

        if (isMsgBlank) {
            // Error toast
            toast({
                title: 'Please write message',
                description: "You can not able to write blank message",
                status: 'error',
                duration: 800,
                isClosable: true,
            })
        } else {
            // update msg
            update(ref(database, 'room/' + id as string), payload)
        }
    }

    const removeMsgs = () => {
        // extract non-user chat from room 
        const filteradChat = oldChat.filter((data: store.chat) => data.sender.email !== user.email);
        // store with filtered Arrey
        update(ref(database, 'room/' + id), { chat: [...filteradChat] }).then(() => {
            // Success msg toast
            toast({
                title: 'Messages deleted',
                description: "We've deleted your messages for you.",
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
        })
    }

    const updateOnline: updateOnline = (online, email) => {
        // finding  current user 
        const trigger = online?.filter((value: store.user) => value?.email == email)
        // condtion if curr user present or not
        if (trigger?.length == 0) {
            const Object = (online)
                ? { online: [...online, user] }
                : { online: [user] }
            // store to online arr
            update(ref(database, 'room/' + id), Object);
        }
    }

    const blockUser: block = (email) => {
        const payload = (blocked) ? { blocked: [...blocked, email] } : { blocked: [email] }
        update(ref(database, 'room/' + id as string), payload)
    }

    return { updateMsg, removeMsgs, updateOnline, blockUser }

}

export default useConfigChat
import database from "../firebase.config";
import { ref, onValue, update, remove } from "firebase/database";

import type * as store from "../types/store"
// need to add Fallback when getting error

export async function addMyMessage(roomId: string, oldChat: any, sender: any, message: string) {
    const Object = (oldChat) ? { chat: [...oldChat, { sender: sender, message: message, cat: +Date.now() }] } : { chat: [{ sender: sender, message: message, cat: +Date.now() }] }
    const updates = await update(ref(database, 'room/' + roomId.toString()), Object);
    return updates;
}


export async function updateOnline(roomId: string, oldChat: any, user: any,) {

    const trigger = oldChat?.filter((value: store.user, index: number) => value.email == user.email)
    if (trigger?.length == 0) {
        const Object = (oldChat)
            ? { online: [...oldChat, user] }
            : { online: [user] }
        const updates = await update(ref(database, 'room/' + roomId), Object);
        return updates;
    }


}

export async function getRoomData(roomId: string, callback = (data: any) => { console.log(data) }) {
    const starCountRef = ref(database, 'room/' + roomId);
    onValue(starCountRef, (snapshot) => {
        callback(snapshot.val())
        return snapshot.val()
    });
}


export async function removeMyMessages(roomId: string,
    oldChat: any, email: string, callback = (data: any) => { console.log(data) }) {
    const filteradChat = oldChat.filter((data: store.chat) => data.sender.email !== email)
    const updates = await update(ref(database, 'room/' + roomId.toString()), {
        chat: [...filteradChat]
    }).then((data) => {
        callback(data)
    })
    return updates
}

export async function deleteRoom(room: string) {
    const removedRoom = await remove(ref(database, 'room/' + room.toString())).then(data => {
        console.log("deleteRoom is running..")
    })
}


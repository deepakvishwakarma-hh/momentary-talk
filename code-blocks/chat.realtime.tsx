import { useEffect, useState } from "react";
import database from "../firebase.config";
import { getDatabase, ref, set, onValue, update } from "firebase/database";




// need to add Fallback when getting error

export async function addMyMessage(roomId: string, oldChat: any, sender: string, message: string) {
    const updates = await update(ref(database, 'room/' + roomId.toString()), {
        chat: [...oldChat, { sender: sender, message: message, cat: +Date.now() }]
    });
    return updates;
}

export async function getRoomData(roomId: string, callback = (data) => { console.log(data) }) {
    const starCountRef = ref(database, 'room/' + roomId);
    onValue(starCountRef, (snapshot) => {
        callback(snapshot.val())
        return snapshot.val()
    });
}


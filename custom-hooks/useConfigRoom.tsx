import { useRouter } from "next/router";
import * as store from "../types/store"
import database from "../firebase.config";
import useConfigChat from "./useConfigChat"
import { ref, set, remove, onValue, } from "firebase/database";
import { useAppSelector, useAppDispatch } from "../src/store/hook";
import { updateRoomInfo, updateOnlineArr, update_roomConstruction, updateAbility } from "../src/store/features/slices"

type typeCreate = () => void
type typeRemove = () => void
type asyncRemove = () => void

const useConfigRoom = () => {

    const router = useRouter()
    const id = router.query.id;
    const room_id = +Date.now()
    const dispatch = useAppDispatch()
    const configChat = useConfigChat()
    const user = useAppSelector(state => state?.user)
    const _ATT = useAppSelector(state => state?._custom?._ATT)

    // Func : handler room creation & configuration
    const create: typeCreate = () => {

        // update room construction process : boolean
        dispatch(update_roomConstruction(true))

        // update data info update accroding to ATT : seted auto termination time
        const today: Date = new Date();
        const lastlong: number = (_ATT == 0)
            ? today.setMinutes(today.getMinutes() + 5)
            : today.setHours(today.getHours() + _ATT)

        // Store obj to firebase
        const DefaultSchema: store.room = {
            lastlong,
            blocked: ['hackhoster04@gmail.com'],
            online: [user],
            cat: today,
            admin: user,
            chat: [{
                sender: user,
                message: 'Hey 👋 I am Administrator of this room. Administrator is responsible for room activities',
                cat: +Date.now()
            }]
        }

        // Room Link
        const shareableLink = `https://momentary.vercel.app/room/${room_id}`;

        // setting created room : first step for "single room at a time"
        localStorage.setItem('created-room', room_id.toString())

        // last step store to firebase
        set(ref(database, 'room/' + room_id), DefaultSchema)
            // href to room
            .then(() => { router.push('/room/' + room_id) })
            // auto copy to clipboard : link
            .then(() => { navigator.clipboard.writeText(shareableLink) })
            // getting => aleating error
            .catch((error) => { alert(error) })
    }

    // Func : Helper for room deletion
    const removeEventHandler = () => {
        localStorage.removeItem('created-room')
        dispatch(updateAbility(false))
    }

    // Func : Room deletion handler
    const Delete: typeRemove = async () => {
        await remove(ref(database, 'room/' + id))
        removeEventHandler()
    }

    // Func : Room deletion handler for SRT
    const syncRemove: asyncRemove = async () => {
        const id = localStorage.getItem('created-room') as string
        await remove(ref(database, 'room/' + id))
        removeEventHandler()
    }

    // Func : Room data getter & store to  Redux store
    const getData = (callback = (data: any) => { console.table(data) }) => {
        // Referance to firebase
        const starCountRef = ref(database, 'room/' + id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            // condition : if room is exist
            if (data) {
                dispatch(updateOnlineArr(data?.online))
                dispatch(updateRoomInfo(data) as any)
                configChat.updateOnline(data.online, user.email)
            }
            // callback with data
            callback(snapshot.val())
        });
    }

    return { create, remove: Delete, get: getData, syncRemove: syncRemove }
}

export default useConfigRoom
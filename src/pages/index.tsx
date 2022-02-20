import jwt from "jsonwebtoken"
import { NextRouter, useRouter } from "next/router";
import { ref, set } from "firebase/database";
import database from "../../firebase.config";
import { Button, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { updateUser, updateRoomInfo } from "../store/features/slices"
import Validator from "../../component/validation-system/validate-user-login";

const Index = () => {
    const router: NextRouter = useRouter();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const [roomId, setRoomId] = useState<number>(+new Date);

    useEffect(() => {
        dispatch(updateUser(jwt.decode(localStorage.getItem('token'))) as any)
    }, [])

    function createRealtimeRoom() {

        const { displayName, email, photoURL } = user;

        const DefaultSchema = {
            admin: { displayName, email, photoURL },
            chat: [{ sender: { displayName, email, photoURL }, message: 'Hey 👋 I am Administrator of this room. Administrator is responsible for room activities', cat: +Date.now() },
            ]
        }
        set(ref(database, 'room/' + roomId), DefaultSchema)
            .then(() => { router.push('/room/' + roomId) })
            .catch((error) => { console.log(error) })
    }

    return (

        <Validator>
            <Flex
                alignItems={"center"}
                justifyContent="center"
                height={["100vh", "100vh", "100vh", "100vh"]}
            >
                <Button onClick={createRealtimeRoom}>Create Room</Button>
            </Flex>
        </Validator>
    )
}

export default Index    

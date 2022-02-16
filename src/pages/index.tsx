
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { ref, set } from "firebase/database";
import database from "../../firebase.config";
import { Button, Flex } from "@chakra-ui/react"
import jwt from "jsonwebtoken"
import Validator from "../../component/validation-system/validate-user-login";
const Index = () => {

    const router = useRouter();

    const [roomId, setRoomId] = useState<number>(+new Date);

    const [user, updateUser] = useState<any>(false)

    useLayoutEffect(() => {
        updateUser(jwt.decode(localStorage.getItem('token')))
    }, [])


    function createRealtimeRoom() {

        const { displayName, email, photoURL } = user;

        const DefaultSchema = {
            chat: [{ sender: { displayName, email, photoURL }, message: 'welcome', cat: +Date.now() },
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

import { useState } from "react";
import { useRouter } from "next/router";
import { ref, set } from "firebase/database";
import database from "../../firebase.config";
import { Button, Flex } from "@chakra-ui/react"

const Index = () => {

    const router = useRouter();

    const [roomId, setRoomId] = useState<number>(+new Date);

    function createRealtimeRoom() {

        const DefaultSchema = {
            chat: [{ sender: 'director', message: 'welcome', cat: +Date.now() },
            ]
        }

        set(ref(database, 'room/' + roomId), DefaultSchema)
            .then(() => { router.push('/room/' + roomId) })
            .catch((error) => { console.log(error) })
    }

    return (
        <Flex
            alignItems={"center"}
            justifyContent="center"
            height={["100vh", "100vh", "100vh", "100vh"]}
        >
            <Button onClick={createRealtimeRoom}>Create Room</Button>
        </Flex>
    )
}

export default Index    
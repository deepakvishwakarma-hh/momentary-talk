
import { useEffect, useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react"

import { addMyMessage, getRoomData } from "../../../code-blocks/chat.realtime";

export default function Room({ query }) {
    const [roomData, setRoomData] = useState<any>(false)
    const [myNewMessage, setMyNewMessage] = useState<string>('welcome')

    const onChangeHandler = e => { setMyNewMessage(e.target.value) }

    const addMessageToRoom = () => {
        addMyMessage(query, roomData?.chat, 'lodu', myNewMessage)
    }

    useEffect(() => {
        getRoomData(query, (data) => { setRoomData(data) })
    }, [query]);

    return (
        <>
            <Box>{roomData?.directorEmail}</Box>
            <Box>{
                roomData.chat?.map((value, index) => {
                    return (
                        <Box bg="lightblue" key={index}>{value.sender} : {value.message}</Box>
                    )
                })
            }</Box>
            <Flex p="2rem">
                <Input onChange={onChangeHandler} value={myNewMessage} />
                <Button onClick={addMessageToRoom}>Send Message</Button>
            </Flex>
        </>
    )
}


export async function getServerSideProps(context) {
    const { query, res } = context;
    return ({ props: { query: query.id } })
}
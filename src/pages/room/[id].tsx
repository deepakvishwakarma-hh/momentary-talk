
import jwt from "jsonwebtoken"
import { Flex, Grid } from "@chakra-ui/react"
import Chat from "../../../component/chat-component/chat";
import Footer from "../../../component/chat-component/footer";
import Header from "../../../component/chat-component/header";
import { useEffect, useLayoutEffect, useState } from "react";
import { addMyMessage, getRoomData } from "../../../code-blocks/chat.realtime";

export default function Room({ query }) {
    const [user, updateUser] = useState<any>(false)
    const [roomData, setRoomData] = useState<any>(false)
    const [myNewMessage, setMyNewMessage] = useState<string>('')

    const [showSetting, setSetting] = useState<boolean>(false)
    const [showShare, setShare] = useState<boolean>(false)
    const onChangeHandler = e => { setMyNewMessage(e.target.value) }

    const addMessageToRoom = () => {
        const { displayName, email, photoURL } = user;
        addMyMessage(query, roomData?.chat, { displayName, email, photoURL }, myNewMessage);
        setMyNewMessage('')
    }
    useLayoutEffect(() => {
        updateUser(jwt.decode(localStorage.getItem('token')))
    }, [])

    useEffect(() => {
        getRoomData(query, (data) => { setRoomData(data) })
    }, [query]);


    return (
        <>
            <Flex
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                alignItems={"center"} justifyContent="center" height={"100vh"}>
                <Grid overflow={"hidden"} templateRows={'50px auto 100px'} w={1200} h={800} bg={"black"} borderRadius={10}>
                    <Header
                        query={query}
                        showShare={showShare}
                        setSetting={setSetting}
                        showSetting={showSetting}
                        setShare={setShare} />
                    <Chat
                        roomData={roomData}
                        userEmail={user.email} />
                    <Footer
                        myNewMessage={myNewMessage}
                        onChangeHandler={onChangeHandler} addMessageToRoom={addMessageToRoom} />
                </Grid>
            </Flex>

        </>
    )
}

// use Pixel for design
export async function getServerSideProps(context) {
    const { query, res } = context;
    return ({ props: { query: query.id } })
}

import jwt from "jsonwebtoken"
import { Flex, Box, Grid } from "@chakra-ui/react"
import Loader from "../../../component/loaders/spinner";
import Chat from "../../../component/chat-component/chat";
import { useEffect, useLayoutEffect, useState } from "react";
import Footer from "../../../component/chat-component/footer";
import Header from "../../../component/chat-component/header";
import { addMyMessage, getRoomData } from "../../../code-blocks/chat.realtime";
import Validator from "../../../component/validation-system/validate-user-login";


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
        <Validator>
            <Flex position={"fixed"} width={"100%"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                alignItems={['start', "center"]}
                justifyContent="center" height={"100%"} >

                <Loader target={!roomData} />

                <Grid
                    overflow={"hidden"}
                    templateRows={'50px auto 100px'}
                    w={1200}
                    h={['100%', 800]}
                    bg={"black"}
                    borderRadius={['0', 10]}>
                    <Header
                        query={query}
                        showShare={showShare}
                        setSetting={setSetting}
                        showSetting={showSetting}
                        setShare={setShare} />
                    <Chat
                        roomData={roomData}
                        userEmail={user?.email} />
                    <Footer
                        myNewMessage={myNewMessage}
                        onChangeHandler={onChangeHandler} addMessageToRoom={addMessageToRoom} />
                </Grid>
            </Flex>
        </Validator >
    )
}

// use Pixel for design
export async function getServerSideProps(context) {
    const { query, res } = context;
    return ({ props: { query: query.id } })
}

import jwt from "jsonwebtoken"
import { Flex, Box, Grid } from "@chakra-ui/react"
import Loader from "../../../component/loaders/spinner";
import Chat from "../../../component/chat-component/chat";
import { useEffect, useLayoutEffect, useState, useMemo } from "react";
import Footer from "../../../component/chat-component/footer";
import Header from "../../../component/chat-component/header";
import Share from "../../../component/chat-component/popups/share";
import { addMyMessage, getRoomData } from "../../../code-blocks/chat.realtime";
import Validator from "../../../component/validation-system/validate-user-login";
import Setting from "../../../component/chat-component/popups/setting";

import { updateUser, updateRoomInfo } from "../../store/features/slices"
import { useAppDispatch, useAppSelector } from "../../store/hook";

export default function Room({ query }) {

    // For Redux Setup
    const user = useAppSelector(state => state.user)
    const oldChat = useAppSelector(state => state.room.chat)
    const toggleSetting = useAppSelector(state => state.toggles.setting)
    const dispatch = useAppDispatch()

    // Basic Component State

    // that is only used for trigger loading
    const [roomData, setRoomData] = useState<any>(false)

    const [myNewMessage, setMyNewMessage] = useState<string>('')

    // Component Handlers
    const onChangeHandler = e => { setMyNewMessage(e.target.value) }


    const addMessageToRoom = () => {
        const { displayName, email, photoURL } = user;
        addMyMessage(query, oldChat, { displayName, email, photoURL }, myNewMessage);
        setMyNewMessage('')
    }

    // Component Effects

    // Here User Data Updates
    useLayoutEffect(() => {
        const decryptedToken = jwt.decode(localStorage.getItem('token'))
        dispatch(updateUser(decryptedToken) as any)
    }, [])
    // Here Room Data Updates
    useEffect(() => {
        getRoomData(query, (data) => {
            dispatch(updateRoomInfo(data) as any)
            setRoomData(data)
        })
    }, [query]);

    return (
        <Validator>
            <Loader target={!roomData} />

            <Flex position={"fixed"} width={"100%"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                alignItems={['start', "center"]}
                justifyContent="center" height={"100%"} >


                {toggleSetting && <Setting id={query} />}

                {/* <Share target={roomData} /> */}

                <Grid
                    overflow={"hidden"}
                    templateRows={'60px auto 100px'}
                    w={1200}
                    h={['100%', 800]}
                    bg={"black"}
                    borderRadius={['0', 10]}>
                    <Header
                        query={query} />
                    <Chat
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
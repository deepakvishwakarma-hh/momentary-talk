
import jwt from "jsonwebtoken"
import Image from "next/image"
import { motion } from 'framer-motion'
import { Flex, Box, Grid } from "@chakra-ui/react"
import Loader from "../../../component/loaders/spinner";
import Chat from "../../../component/chat-component/chat";
import { useEffect, useLayoutEffect, useState } from "react";
import Footer from "../../../component/chat-component/footer";
import Header from "../../../component/chat-component/header";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Share from "../../../component/chat-component/popups/share";
import Setting from "../../../component/chat-component/popups/setting";
import { updateUser, updateRoomInfo } from "../../store/features/slices"
import { addMyMessage, getRoomData } from "../../../code-blocks/chat.realtime";
import Validator from "../../../component/validation-system/validate-user-login"
import useWindowDimensions from "../../../code-blocks/useDimention"
export default function Room({ query }) {
    const { height, width } = useWindowDimensions();
    // For Redux Setup
    const user = useAppSelector(state => state.user)
    const oldChat = useAppSelector(state => state.room.chat)
    const dispatch = useAppDispatch()

    const MotionBall = motion(Box)

    // that is only used for trigger loading
    const [roomData, setRoomData] = useState<any>(false)

    const [myNewMessage, setMyNewMessage] = useState<string>('')

    // Component Handlers
    const onChangeHandler = e => { setMyNewMessage(e.target.value) }


    const addMessageToRoom = () => {
        const { displayName, email, photoURL } = user;
        if (myNewMessage !== '') {
            addMyMessage(query, oldChat, { displayName, email, photoURL }, myNewMessage);
        }
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
                <Setting id={query} />
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

{/* <MotionBall
                initial={{ x: 0, y: 0 }}
                animate={{ x: 30, y: 100 }}
                transition={{ duration: 2 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: width - 70,
                    bottom: height - 70,
                }} zIndex={99} top="0" pos="absolute" bg="white" width="70px" height="70px" borderRadius="50%" drag>
                <Image
                    src="/balloon-heart.svg"
                    width="30"
                    height="30"
                    alt="none"
                />
            </MotionBall> */}
import Head from "next/head"
import jwt from "jsonwebtoken"
import { NextRouter, useRouter } from "next/router";
import { useAppDispatch } from "../../store/hook";
import Setting from "../../../component/popups/setting";
import Loader from "../../../component/loaders/spinner";
import Chat from "../../../component/chat-component/chat";
import { useEffect, useState } from "react";
import Footer from "../../../component/chat-component/footer";
import Header from "../../../component/chat-component/header";
import { getRoomData } from "../../../code-blocks/chat.realtime";
import { Flex, Grid, Alert, Center, Text } from "@chakra-ui/react"
import LinkExpireFallback from "../../../component/link-expire/link-expire";
import Validator from "../../../component/validation-system/validate-user-login"
import { updateUser, updateRoomInfo, updateRoomId } from "../../store/features/slices"

import type { chat, Admin } from "../../store/features/slices"
type room = { admin: Admin, chat: chat[] } | null

export default function Room() {
    const dispatch = useAppDispatch();
    const router: NextRouter = useRouter()
    const query: string = router.query.id as string;

    const [testRoom, setRoom] = useState(false)
    const [loader, setLoader] = useState<'loading' | 'loaded'>('loading');

    useEffect(() => {
        const decryptedToken = jwt.decode(localStorage.getItem('token')) as Admin
        dispatch(updateUser(decryptedToken) as any)
        dispatch(updateRoomId(query))
        getRoomData(query, (data: room) => {
            dispatch(updateRoomInfo(data) as any)
            setLoader('loaded')
            setRoom(data as any)
        })
    }, [query]);

    return (
        <>
            <Head>
                <title>Room -{query}</title>
                <meta name="theme-color" content="#16161D" />
            </Head>
            <Validator>
                <Loader target={loader} />
                {(testRoom) ?
                    <Flex fontFamily={"Questrial"} position={"fixed"} width={"100%"} bgGradient="linear(to-l, #7928CA, #FF0080)" alignItems={['start', "center"]} justifyContent="center" height={"100%"} >
                        <Setting />
                        <Grid overflow={"hidden"} templateRows={'70px auto 100px'} w={1200} h={['100%', 800]} bg={"black"} borderRadius={['0', 10]}>
                            <Header />
                            <Chat />
                            <Footer />
                        </Grid>
                    </Flex> : <LinkExpireFallback />}
            </Validator >
        </>
    )
}

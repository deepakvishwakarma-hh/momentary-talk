import Head from "next/head"
import jwt from "jsonwebtoken"
import { useEffect, useState } from "react";
import { Flex, Grid, } from "@chakra-ui/react"
import Chat from "../../../component/room/chat";
import { useAppDispatch } from "../../store/hook";
import Footer from "../../../component/room/footer";
import { NextRouter, useRouter } from "next/router";
import Header from "../../../component/room/header";
import Setting from "../../../component/popups/setting";
import Loader from "../../../component/loaders/spinner";
import { updateUser, updateRoomId } from "../../store/features/slices"
import Validator from "../../../component/validationsys/validate-user-login"
import LinkExpireFallback from "../../../component/validationsys/link-expire";

import * as store from "../../../types/store"
import useConfigRoom from "../../../custom-hooks/useConfigRoom";

export default function Room() {

    const configRoom = useConfigRoom()
    const dispatch = useAppDispatch();
    const router: NextRouter = useRouter()
    const query: string = router.query.id as string;
    const [testRoom, setRoom] = useState<any>(false)
    const [loader, setLoader] = useState<'loading' | 'loaded'>('loading');

    useEffect(() => {
        const decryptedToken = jwt.decode(localStorage.getItem('token') as string) as store.user
        dispatch(updateUser(decryptedToken) as any);
        dispatch(updateRoomId(query));

        configRoom.get((data: store.room) => {
            setLoader('loaded')
            setRoom(data)

            const find = data?.blocked?.filter(email => email == decryptedToken.email);
            if (find?.length == 1) {
                // alert('you have been blocked by this room')
                router.push('/')
                setRoom(false)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, dispatch]);

    return (
        <>
            <Head>
                <title>Room - {query}</title>
                <meta name="theme-color" content="#16161D" />
                <link rel="shortcut icon" href="/transparent.png" />
                <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
            </Head>
            <Validator>
                <Loader target={loader} />
                {(testRoom) ?
                    <Flex width={"100%"} height={"100%"} position={"fixed"} fontFamily={"Questrial"} userSelect={"none"} justifyContent="center" alignItems={['start', "center"]} bgImage="/h2.svg" bgSize={'cover'}>
                        <Setting />
                        <Grid opacity={.8} w={1200} h={['100%', 800]} overflow={"hidden"} bg={"black"} borderRadius={['0', 10]} templateRows={'70px auto 100px'}>
                            <Header />
                            <Chat />
                            <Footer />
                        </Grid>
                    </Flex> : <LinkExpireFallback />}
            </Validator >
        </>
    )
}

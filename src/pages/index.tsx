import Head from "next/head";
import jwt from "jsonwebtoken"
import Image from "next/image"
import { ref, set } from "firebase/database";
import database from "../../firebase.config";
import { useState, useEffect, ChangeEventHandler } from "react";
import { NextRouter, useRouter } from "next/router";
import { updateUser, } from "../store/features/slices"
import { useAppDispatch, useAppSelector } from "../store/hook";
import Validator from "../../component/validation-system/validate-user-login";
import {
    Button, Flex, Grid, Select, Text, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from "@chakra-ui/react"

import type * as store from "../../types/store"

const Index = () => {
    const router: NextRouter = useRouter();
    const dispatch = useAppDispatch()
    const [loader, setloader] = useState<boolean>(false)
    const [duration, setDuration] = useState<number>(0)
    const [roomId, setRoomId] = useState<number>(+new Date);
    const user: store.user = useAppSelector(state => state.user)

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const user = localStorage.getItem('token')
        dispatch(updateUser(jwt.decode(user as string)))

    }, [dispatch])



    function createRealtimeRoom() {
        setloader(true)
        const today: Date = new Date();
        const lastlong = (duration == 0) ? today.setMinutes(today.getMinutes() + 5) : today.setHours(today.getHours() + duration)

        const { displayName, email, photoURL } = user;

        const DefaultSchema: store.room = {
            lastlong,
            online: [{ displayName, email, photoURL }],
            cat: today,
            admin: { displayName, email, photoURL },
            chat: [{ sender: { displayName, email, photoURL }, message: 'Hey 👋 I am Administrator of this room. Administrator is responsible for room activities', cat: +Date.now() },
            ]
        }
        set(ref(database, 'room/' + roomId), DefaultSchema)
            .then(() => { router.push('/room/' + roomId) })
            .catch((error) => { console.log(error) })
    }

    const onChangeHandler: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(parseFloat(e.target.value))
    }

    return (

        <Validator>
            <Head>
                <title>Momentary</title>
                <meta name="theme-color" content="#16161D" />
                <link rel="shortcut icon" href="/transparent.png" />
            </Head>

            <Grid position={'fixed'} templateRows={"150px auto"} templateColumns={'100%'} width={'100%'} height={'100%'} bg={'blackAlpha.900'}>

                <Flex justifyContent={"space-between"} bg="none" alignItems={'center'}>
                    <Flex pl={3} alignItems={'center'}>
                        <Image src="/transparent.png" width={40} height={40} alt="icons" />
                        <Text color="white" px={3} fontSize="20">Momentary</Text>
                    </Flex>
                    <Tooltip label="Logged in with Google security">
                        <Flex pr={3}>
                            <Image src="/google.svg" width={30} height={30} alt="icons" /> <Text p={2} textTransform={'capitalize'} color="white">Secured</Text>
                        </Flex>
                    </Tooltip>
                </Flex>

                <Flex bgGradient='linear(to-l, #7928CA, #FF0080)'
                    flexDirection={['column', 'column', 'column', 'row']}
                    alignItems={"center"} justifyContent={"space-around"} pt={10} borderRadius={"3rem 3rem 0 0"}>

                    <Flex flexDir={'column'}>
                        <Text p={[10, 0]} fontFamily={"Fredoka One"} fontSize={['4vh', 50, 50, 70]} color="white">Feel Free & Create <br /> <Text display="inline" color="black ">Room</Text> chat with <br />  <Image src="/send.svg" width={40} height={40} alt="icons" /> Momentary  </Text>
                        <Text px={[10, 0]} fontSize={[20, 25, 30, 30]} color="white">
                            Your complete privacy in your hand</Text>
                    </Flex>
                    <Button letterSpacing={1} fontSize={20} fontFamily={"Fredoka One"} width={['80%', 200]} tabIndex={1} onClick={onOpen}>Start Chat</Button>

                    <Modal onClose={onClose} isOpen={isOpen} isCentered     >
                        <ModalOverlay backdropFilter='blur(10px) ' />
                        <ModalContent bg={'blackAlpha.800'}>
                            <ModalHeader color="white">Customization</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text color="white">Select to terminate your room automatically By default 5 minutes.</Text>
                                <Select _focus={{ color: 'black' }}
                                    my={3} onChange={onChangeHandler} variant='filled' placeholder='Last Long - default'>
                                    <option value='0'>5 min</option>
                                    <option value='1'>1 Hours</option>
                                    <option value='2'>2 Hours</option>
                                    <option value='3'>3 Hours</option>
                                </Select>
                                <Button
                                    w={'100%'}
                                    _hover={{ opacity: .8, bg: "none" }}
                                    isLoading={loader}
                                    loadingText='Creating...'
                                    variant='outline'
                                    fontWeight={100}
                                    color="white"
                                    letterSpacing={2}
                                    onClick={createRealtimeRoom}
                                >
                                    Create
                                </Button>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Flex >
            </Grid>

        </Validator >
    )
}

export default Index    

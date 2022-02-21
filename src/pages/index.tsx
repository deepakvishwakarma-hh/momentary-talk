
import Head from "next/head";
import jwt from "jsonwebtoken"
import { NextRouter, useRouter } from "next/router";
import { ref, set } from "firebase/database";
import database from "../../firebase.config";
import { Box, Button, Flex, Grid, Text, Tooltip, Input, Checkbox, Select, CloseButton, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { updateUser, updateRoomInfo } from "../store/features/slices"
import Validator from "../../component/validation-system/validate-user-login";
import Image from "next/image"
import { callAll } from "@chakra-ui/utils";
import { callbackify } from "util";
import { divide } from "lodash";

const Index = () => {
    const router: NextRouter = useRouter();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const [roomId, setRoomId] = useState<number>(+new Date);
    const [duration, setDuration] = useState<number>(1)
    const [loader, setloader] = useState(false)

    useEffect(() => {
        dispatch(updateUser(jwt.decode(localStorage.getItem('token'))) as any)
    }, [])



    function createRealtimeRoom() {
        setloader(true)
        var today = new Date();
        const lastlong = today.setHours(today.getHours() + duration)
        const { displayName, email, photoURL } = user;

        const DefaultSchema = {
            lastlong: lastlong,
            cat: today,
            admin: { displayName, email, photoURL },
            chat: [{ sender: { displayName, email, photoURL }, message: 'Hey 👋 I am Administrator of this room. Administrator is responsible for room activities', cat: +Date.now() },
            ]
        }
        set(ref(database, 'room/' + roomId), DefaultSchema)
            .then(() => { router.push('/room/' + roomId) })
            .catch((error) => { console.log(error) })
    }

    const onChangeHandler = (e) => {
        setDuration(parseFloat(e.target.value))
    }

    return (

        <Validator>

            <Head>
                <title>Momentary</title>
                <meta name="theme-color" content="#16161D" />
            </Head>

            <Grid position={'fixed'} templateRows={"150px auto"} templateColumns={'100%'} width={'100%'} height={'100%'} bg={'blackAlpha.900'}>

                {/* Header  */}
                <Flex justifyContent={"space-between"} bg="none" alignItems={'center'}>
                    <Flex pl={3}>
                        <Image src="/send.svg" width={30} height={30} alt="icons" />
                        <Text color="white" px={3} fontSize="25">Momentary</Text>
                    </Flex>
                    <Tooltip label="Logged in with Google security">
                        <Flex pr={3}>
                            <Image src="/google.svg" width={30} height={30} alt="icons" /> <Text p={2} textTransform={'capitalize'} color="white">Secured</Text>
                        </Flex>
                    </Tooltip>
                </Flex>
                {/* Header  */}

                <Flex bg={" #7928CA"} flexDirection={['column', 'column', 'column', 'row']} alignItems={"center"} justifyContent={"space-around"} pt={10} borderRadius={"3rem 3rem 0 0"}>

                    <Image width={200} height={200} src={'/shield-lock.svg'} />

                    <Accordion defaultIndex={[0]} minWidth={['90%', 500]} maxWidth={[200, 500]} >
                        <AccordionItem border={"none"} pl={0}>
                            <h2>
                                <AccordionButton bg={'blackAlpha.200'} justifyContent="space-between">
                                    <Text color="white">Create Room</Text>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text color="whiteAlpha.900">Select to terminate your room automatically</Text>
                                <Select _focus={{ color: 'black' }}
                                    my={3} onChange={onChangeHandler} variant='filled' placeholder='Last Long'>
                                    <option value='1'>1 Hours</option>
                                    <option value='2'>2 Hours</option>
                                    <option value='3'>3 Hours</option>
                                </Select>
                                <Button
                                    w={'100%'}
                                    _hover={{ opacity: .8, bg: "none" }}
                                    isLoading={loader}
                                    loadingText='Creating'
                                    variant='outline'
                                    color="white"
                                    fontWeight={100}
                                    letterSpacing={2}
                                    onClick={createRealtimeRoom}
                                >
                                    Create
                                </Button>

                            </AccordionPanel>
                        </AccordionItem>

                    </Accordion>

                </Flex >
            </Grid>

        </Validator >
    )
}

export default Index    

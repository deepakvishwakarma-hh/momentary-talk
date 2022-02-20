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


const Index = () => {
    const router: NextRouter = useRouter();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const [roomId, setRoomId] = useState<number>(+new Date);
    const [duration, setDuration] = useState<number>(1)

    useEffect(() => {
        dispatch(updateUser(jwt.decode(localStorage.getItem('token'))) as any)
    }, [])

    function createRealtimeRoom() {
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
            <Grid position={'fixed'} templateRows={"150px auto"} templateColumns={'100%'} width={'100%'} height={'100%'} bg={'blackAlpha.900'}>
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
                <Flex bg={" #7928CA"} flexDirection={['column', 'column', 'column', 'row']} alignItems={"center"} justifyContent={"space-around"} pt={10} borderRadius={"3rem 3rem 0 0"}>
                    <Box my={1} p={[4, 4, 0]}>
                        <Text letterSpacing={1} fontSize={[30, 40]} color={"white"}>Customize Your Room</Text>
                        <Text fontSize={15} p={0} color={"white"}>Room customization </Text>
                    </Box>
                    <Box borderRadius={[0, 0, 10]} p={10} maxWidth={500} bg={'blackAlpha.400'} width={'100%'}>
                        <Text color="white">Room Automatically terminated. By default 1 Hours</Text>
                        <Box>
                            <Select _focus={{ color: 'black' }}
                                my={3} onChange={onChangeHandler} variant='filled' placeholder='Last Long'>
                                <option value='1'>1 Hours</option>
                                <option value='2'>2 Hours</option>
                                <option value='3'>3 Hours</option>
                            </Select>
                        </Box>
                        <Button mt={2} letterSpacing={1} fontWeight={100} textTransform={'capitalize'} variant="outline" color="white" width={['100%', "100%"]}
                            onClick={createRealtimeRoom}
                        >Create room</Button>
                    </Box>
                </Flex >
            </Grid>

        </Validator >
    )
}

export default Index    

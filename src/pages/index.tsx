import Head from "next/head";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, ChangeEventHandler } from "react";
import useConfigRoom from "../../custom-hooks/useConfigRoom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import RoomAleart from "../../component/validationsys/room-aleart";
import Validator from "../../component/validationsys/validate-user-login";
import { updateUser, update_ATT, update_roomConstruction, updateAbility } from "../store/features/slices";
import { Button, Flex, Grid, Select, Text, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

const Index = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const configRoom = useConfigRoom();
    const createRoom = () => { configRoom.create() }
    const user = useAppSelector(state => state?.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const loader = useAppSelector(state => state?._custom._roomConstruction);

    // input : select handler
    const onChangeHandler: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(update_ATT(parseFloat(e.target.value)));
    }

    // logout Handler
    const logoutHandler = () => {
        const confirmation = confirm('Do you wanna Logout')
        if (confirmation) {
            localStorage.removeItem('token')
            router.reload()
        }
    }

    useEffect(() => {
        dispatch(updateUser(jwt.decode(localStorage.getItem('token') as string)));
        const createdRoom: string = localStorage.getItem('created-room') as string;
        if (createdRoom !== null) {
            dispatch(updateAbility(true))
        }

        return () => { dispatch(update_roomConstruction(false)) }

    }, [dispatch])

    return (

        <>
            <Head>
                <title>Login Required</title>
                <meta name="theme-color" content="#16161D" />
                <link rel="shortcut icon" href="/transparent.png" />
                <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
            </Head>

            <Validator>

                <Head>
                    <title>Momentary</title>
                    <meta name="theme-color" content="#16161D" />
                    <link rel="shortcut icon" href="/transparent.png" />
                    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
                    />
                </Head>

                <RoomAleart />

                <Grid
                    position={'fixed'}
                    templateRows={"150px auto"}
                    templateColumns={'100%'}
                    width={'100%'}
                    height={'100%'}
                    bg={'blackAlpha.900'}>

                    <Flex px={[0, 10]}
                        justifyContent={"space-between"}
                        bg="none"
                        alignItems={'center'}>

                        <Flex pl={3}
                            alignItems={'center'}>

                            <Image src="/transparent.png"
                                width={40}
                                height={40}
                                alt="icons" />
                            <Text
                                color="white"
                                px={3}
                                fontSize="20">Momentary</Text>
                        </Flex>
                        <Tooltip label="Logged in with Google security, click to logout">
                            <Flex
                                onClick={logoutHandler}
                                border={"2px rgba(255, 255, 255, 0.116) solid"}
                                borderRadius={50}
                                py={1}
                                px={3}
                            >
                                <Image
                                    src="/google.svg"
                                    width={30}
                                    height={30}
                                    alt="icons"
                                />
                                <Text
                                    display={['none', 'block']}
                                    p={2}
                                    textTransform={'capitalize'}
                                    color="white">{user?.displayName}</Text>
                            </Flex>
                        </Tooltip>
                    </Flex>
                    <Flex
                        bgImage={["/h.svg", "/h2.svg"]}
                        bgRepeat={'no-repeat'}
                        bgSize="cover"
                        flexDirection={['column', 'column', 'column', 'row']}
                        alignItems={"center"}
                        justifyContent={"space-around"}
                        pt={10}
                        borderRadius={"3rem 3rem 0 0"}>
                        <Flex
                            px={5}
                            flexDir={'column'}>
                            <Text
                                py={[5, 0]}
                                fontFamily={"Fredoka One"}
                                fontSize={['4vh', 50, 50, 70]}
                                color="white">Feel Free & Create <br />
                                <Text
                                    display="inline"
                                    color="tomato">Secret</Text> chat with <br />
                                Momentary
                            </Text>
                            <Text color="white"
                                onClick={() => { router.push('https://github.com/deepakvishwakarma-hh/momentary-talk#readme') }}>Read more
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg></Text>
                        </Flex>

                        <Button
                            letterSpacing={1}
                            fontSize={20}
                            variant="outline"
                            color="white"
                            fontFamily={"Fredoka One"}
                            width={['30', 200]}
                            tabIndex={1}
                            onClick={onOpen}
                            fontWeight={100}
                            _hover={{ opacity: .8 }}
                            _focus={{ opacity: .8 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-box"
                                viewBox="0 0 16 16">
                                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" /> <br />
                            </svg>
                        </Button>


                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay backdropFilter='blur(10px) ' />
                            <ModalContent bg={'blackAlpha.800'}>
                                <ModalHeader letterSpacing={2} color="white" textTransform={'uppercase'} fontSize={20} >Customization</ModalHeader>
                                <ModalCloseButton color="grey" />
                                <ModalBody>
                                    <Text opacity={.8} color="white">Select option to terminate your room automatically. otherwise 5 minute by default.</Text>
                                    <Select _focus={{ color: 'black' }}
                                        my={3} onChange={onChangeHandler} variant='filled' placeholder='Select auto termination'>
                                        <option value='0'>5 min</option>
                                        <option value='1'>1 Hours</option>
                                        <option value='2'>2 Hours</option>
                                        <option value='3'>3 Hours</option>
                                    </Select>
                                    <Button
                                        w={'100%'}
                                        _hover={{ opacity: .8, bg: "none" }}
                                        isLoading={loader}
                                        variant='outline'
                                        fontWeight={100}
                                        color="white"
                                        letterSpacing={2}
                                        onClick={createRoom}
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                        </svg>
                                    </Button>
                                </ModalBody>
                                <ModalFooter>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Flex >
                </Grid>
            </Validator >

        </>

    )
}

export default Index    

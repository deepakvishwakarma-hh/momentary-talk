import Image from 'next/image'
import Admin from './component/user'
import Online from './component/online'
import { useEffect, useState, useCallback } from 'react'
import useConfigRoom from '../../custom-hooks/useConfigRoom'
import useConfigChat from '../../custom-hooks/useConfigChat'
import { toggleSetting, } from "../../src/store/features/slices"
import useWindowDimensions from "../../custom-hooks/useDimention"
import { useAppDispatch, useAppSelector } from "../../src/store/hook";
import { Flex, Box, Input, Button, Center, Text, CloseButton, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Tooltip, useFocusOnPointerDown } from '@chakra-ui/react'


export default function Setting() {

    const dispatch = useAppDispatch();
    const configRoom = useConfigRoom()
    const configChat = useConfigChat()
    const { width } = useWindowDimensions();
    const state = useAppSelector(state => state);
    const [time, setTime] = useState<number>(Date.now());
    const admin = useAppSelector(state => state?.room?.admin)
    const lastlongtime = useAppSelector(state => state?.room?.lastlong)

    // Validator : only room adminisrator can access the terminator
    const authorize: boolean = state?.user?.email == state?.room?.admin?.email;

    // close settingbar handler 
    const closeHandler: () => void = () => { dispatch(toggleSetting(false) as any) };

    // TO termiante Handler
    const terminate: () => void = useCallback(() => { configRoom.remove() }, [configRoom])

    // Copy to clipboard - Handler & value
    const shareableLink = `https://momentary.vercel.app/room/${state.currentRoomId}`;
    const clickToCopyHandler: () => void = () => { navigator.clipboard.writeText(shareableLink) };

    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            setTime(+Date.now() - lastlongtime)
            if (lastlongtime < +Date.now()) { terminate() }
        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, [lastlongtime, terminate]);

    const msToTime = (ms: number) => {
        const minutes: any = (ms / (1000 * 60)).toFixed(1);
        if (true) return minutes + " Min";
    }
    const removeMyMessagesHandler = () => { configChat.removeMsgs() }

    return (
        <>
            {state.toggles.setting && <Center
                h="100%"
                w="100%"
                zIndex={100}
                pos={'fixed'}
                bg={' rgba(0, 0, 0, 0.900)'}
            >
                <Box
                    bg={'black'}
                    height={['100%', 'initial']}
                    maxWidth={[`${width}px`, `500px`]}
                    minWidth={[`${width}px`, `500px`]} >
                    <Flex color={"white"}
                        pl={9}
                        pr={7}
                        py={4}
                        overflow={'hidden'}
                        alignItems={"center"}
                        bg={'blackAlpha.300'}
                        justifyContent={"space-between"}>
                        <Text
                            letterSpacing={3}
                            fontSize={20}
                            textTransform={"uppercase"}>settings</Text>
                        <CloseButton
                            p={0}
                            size='xl'
                            onClick={closeHandler} />
                    </Flex>
                    <Box p={5}
                        color={'white'}>
                        <Accordion >
                            <AccordionItem border={"none"} pl={0}>
                                <h2>
                                    <AccordionButton _focus={{ border: "none" }} justifyContent="space-between">
                                        <Text
                                            letterSpacing={3}
                                            fontSize={15}
                                            color={'purple.500'}
                                            py={2}
                                            textTransform={"uppercase"}>Members </Text>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>

                                    <Flex >
                                        {state?.online?.map((value, index) => {
                                            return (
                                                <Online key={index} data={value} />
                                            )
                                        })}
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem border={"none"} pl={0}>
                                <h2>
                                    <AccordionButton _focus={{ border: "none" }} justifyContent="space-between">
                                        <Text
                                            letterSpacing={3}
                                            fontSize={15}
                                            color={'purple.500'}
                                            py={2}
                                            textTransform={"uppercase"}>Invitation Link </Text>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text
                                        letterSpacing={3}
                                        fontSize={13}
                                        color={'white.500'}
                                        py={2}
                                        textTransform={"uppercase"}>Invite via link.</Text>
                                    <Flex mb={3}
                                        alignItems={"center"}>
                                        <Input
                                            my={2}
                                            py={2}
                                            readOnly
                                            opacity={.5}
                                            flex={10}
                                            borderRadius={5}
                                            value={shareableLink} />
                                        <Button
                                            ml={3}
                                            bg="black"
                                            variant='outline'
                                            colorScheme='purple'
                                            onClick={clickToCopyHandler}
                                            _hover={{ opacity: .8 }}
                                            _focus={{ opacity: .8 }}
                                        > COPY</Button>
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem border={"none"} pl={0}>
                                <h2>
                                    <AccordionButton _focus={{ border: "none" }} justifyContent="space-between">
                                        <Text
                                            letterSpacing={3}
                                            fontSize={15}
                                            color={'purple.500'}
                                            py={3}
                                            textTransform={"uppercase"}>Administrater </Text>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel p={0}>
                                    <Admin admin={admin} />
                                    <Box mt={3} p={3}
                                        bg={'blackAlpha.300'}
                                    >
                                        <Text
                                            letterSpacing={3}
                                            fontSize={13}
                                            color={'white.500'}
                                            py={2}
                                            textTransform={"uppercase"}>terminate</Text>
                                        <Box>
                                            <Text color={'grey'} py={2}>Room Terminate from fireabse server and Link  gonna be expire. This action is only oprated by Admin</Text>
                                            <Button
                                                disabled={!authorize}
                                                onClick={terminate}
                                                borderRadius={5}
                                                width={'100%'}
                                                _hover={{ opacity: .8 }}
                                                _focus={{ opacity: .8 }}
                                                colorScheme={'red'}
                                                variant={'outline'}
                                                textTransform={"capitalize"}
                                                letterSpacing={1}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M3.112 5.112a3.125 3.125 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447c0-.075.006-.152.018-.231l-.812-.812zm2.55-1.45-.725-.725A5.512 5.512 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z" />
                                                    <path d="m13.646 14.354-12-12 .708-.708 12 12-.707.707z" />
                                                </svg>


                                            </Button>
                                        </Box>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem border={"none"} pl={0}>
                                <h2>
                                    <AccordionButton _focus={{ border: "none" }} justifyContent="space-between">
                                        <Text
                                            letterSpacing={3}
                                            fontSize={15}
                                            color={'purple.500'}
                                            py={3}
                                            textTransform={"uppercase"}>action controls </Text>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel p={0}>
                                    <Box p={3}
                                        bg={'blackAlpha.300'}
                                    >
                                        <Text
                                            letterSpacing={3}
                                            fontSize={13}
                                            color={'white.500'}
                                            py={2}
                                            textTransform={"uppercase"}>Protect yourself </Text>
                                        <Box>
                                            <Text color={'grey'} py={2}>Delete all the data entered in the current ({state.currentRoomId}) room.</Text>
                                            <Button
                                                _hover={{ opacity: .8 }}
                                                _focus={{ opacity: .8 }}
                                                onClick={removeMyMessagesHandler}
                                                borderRadius={5}
                                                width={'100%'}
                                                colorScheme={'blue'}
                                                variant={'outline'}
                                                textTransform={"capitalize"}
                                                letterSpacing={1}
                                            >Delete</Button>
                                        </Box>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                    <Tooltip label="termination time"  >
                        <Flex position={['absolute', 'static']} bottom={0} pl={9}>
                            <Image width={20} alt="none" height={20} src={"/clock.svg"} />
                            <Text bg="black" py={5} color={'white'} pl={3}>{msToTime(time)}
                            </Text>
                        </Flex>
                    </Tooltip>
                </Box>
            </Center>
            }
        </>
    )
}

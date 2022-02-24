import Image from 'next/image'
import Admin from './component/admin-box'
import { useEffect, useState, useCallback } from 'react'
import { toggleSetting, } from "../../src/store/features/slices"
import Online from './component/online'
import useWindowDimensions from "../../code-blocks/useDimention"
import { useAppDispatch, useAppSelector } from "../../src/store/hook";
import { removeMyMessages, deleteRoom } from '../../code-blocks/chat.realtime';
import { Flex, Box, Input, Button, useToast, Center, Text, CloseButton, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Tooltip } from '@chakra-ui/react'

export default function Setting() {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const { width } = useWindowDimensions();
    const state = useAppSelector(state => state);
    const [time, setTime] = useState<number>(Date.now());
    const authorize: boolean = state?.user?.email == state?.room?.admin?.email;
    const closeHandler: () => void = () => { dispatch(toggleSetting(false) as any) };
    const shareableLink = `https://momentary.vercel.app/room/${state.currentRoomId}`;
    const clickToCopyHandler: () => void = () => { navigator.clipboard.writeText(shareableLink) };
    const terminate: () => void = useCallback(() => {
        deleteRoom(state.currentRoomId as string)
    }, [state.currentRoomId])
    const admin = useAppSelector(state => state?.room?.admin)
    const lastlongtime = useAppSelector(state => state?.room?.lastlong)


    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            setTime(+Date.now() - lastlongtime)
            if (lastlongtime < +Date.now()) {
                terminate()
                console.log('hii')
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [lastlongtime, terminate]);

    function msToTime(ms: number) {
        let seconds: any = (ms / 1000).toFixed(1);
        let minutes: any = (ms / (1000 * 60)).toFixed(1);
        if (true) return minutes + " Min";
    }

    const removeMyMessagesHandler = () => {
        removeMyMessages(state.currentRoomId as string, state.room.chat, state.user.email, () => {
            toast({
                title: 'Messages deleted',
                description: "We've deleted your messages for you.",
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
        })
    }

    return (
        <>
            {state.toggles.setting && <Center
                h="100%"
                w="100%"
                zIndex={100}
                pos={'fixed'}
                bg={' rgba(0, 0, 0, 0.900)'}>
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
                                    <Text
                                        letterSpacing={3}
                                        fontSize={13}
                                        color={'white.500'}
                                        py={2}
                                        textTransform={"uppercase"}>Joined User</Text>
                                    <Text
                                        letterSpacing={2}
                                        fontSize={15}
                                        color={'red'}
                                        fontWeight={200}
                                        py={1}>Members can see your messages. It can also be online.</Text>
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
                                            textTransform={"uppercase"}>Terminate Room </Text>
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
                                            >Terminate</Button>
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
                                                colorScheme={'purple'}
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

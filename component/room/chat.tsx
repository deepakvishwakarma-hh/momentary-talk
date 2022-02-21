import Image from "next/image"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useAppSelector } from "../../src/store/hook";
const Chat = () => {

    const getDateStringServ = (timestamp: number) => {
        const plus0 = num => `0${num.toString()}`.slice(-2), d = new Date(timestamp), year = d.getFullYear(), monthTmp = d.getMonth() + 1, month = plus0(monthTmp), date = plus0(d.getDate()), hour = plus0(d.getHours()), minute = plus0(d.getMinutes()), second = plus0(d.getSeconds()), rest = timestamp.toString().slice(-5)
        return `${year}-${month}-${date} , ${hour}:${minute}:${second}`
    }

    const state = useAppSelector(state => state)
    const MotionMessage = motion(Text);
    const messageEl = useRef(null);
    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    const Messages = state?.room?.chat?.map((value, index) => {

        if (value.sender.email == state.user.email) {
            return (
                <Flex
                    borderRadius={3} my={3} p={2} pl={5}
                    justifyContent={"end"}
                    alignItems={"center"}
                    color={"white"}
                    key={index}>
                    <Box
                        mr={5} minWidth="200px" maxWidth="500px"
                    >
                        <Text textAlign={"right"}>You</Text>
                        <MotionMessage
                            pr={5}
                            p={"1rem"}
                            overFlow="hidden"
                            width={'inherit'}
                            bg="#7928CA"

                            borderRadius={"1rem 0 1rem 1rem"}
                        >{value.message}</MotionMessage>
                        <Text p={2} opacity={.5} fontSize={['10px', '15px']} textAlign={"right"}>{getDateStringServ(value.cat)}</Text>
                    </Box>
                    <Button alignSelf={"flex-start"} overflow={"hidden"} borderRadius={"50%"} p={0} textTransform={'uppercase'}>
                        {(value.sender.photoURL) ? <Image
                            src={value.sender.photoURL as string}
                            width="40"
                            height="40"
                            alt="user image" /> : null
                        }
                    </Button>
                </Flex>
            )
        }
        else {
            return (
                <Flex borderRadius={3} my={3} p={2} pr={5} alignItems={"center"} color={"white"} key={index}>

                    <Button alignSelf={"flex-start"} overflow={"hidden"} borderRadius={"50%"} p={0} textTransform={'uppercase'}>
                        {(value.sender.photoURL) ? <Image
                            src={value.sender.photoURL as string}
                            width="40"
                            height="40"
                            alt="user image" /> : null
                        }
                    </Button>

                    <Box ml={5} minWidth="200px" maxWidth="500px">
                        <Text fontWeight={"500"} textTransform={'lowercase'}>@{value.sender.displayName}</Text>
                        <Text
                            bg="#FF0080"
                            pr={5} p={"1rem"} borderRadius={"0rem 1rem 1rem 1rem"}>{value.message}</Text>
                        <Text p={2} opacity={.5} fontSize={['10px', '15px']} textAlign={"right"}>{getDateStringServ(value.cat)}</Text>
                    </Box>
                </Flex >
            )
        }
    })
    return (
        <>
            < Box overflowY={"scroll"} ref={messageEl} >
                <Box p="1rem">
                    {Messages}
                </Box>
            </Box>
        </>

    )
}

export default Chat

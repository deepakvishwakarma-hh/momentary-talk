import Image from "next/image"
import { useRef, useEffect } from "react";
import { useAppSelector } from "../../src/store/hook"
import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react"
const Chat = ({ userEmail }) => {
    const room = useAppSelector(state => state.room)

    const messageEl = useRef(null);
    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    const Messages2 = room.chat.map((value, index) => {

        if (value.sender.email == userEmail) {
            return (
                <Flex borderRadius={3} my={3} p={2} pl={5} justifyContent={"end"} alignItems={"center"} color={"white"} key={index}>
                    <Box
                        mr={5} minWidth="150px" maxWidth="500px"
                    >
                        <Text textAlign={"right"}>You</Text>
                        <Text width={'inherit'} bgGradient="linear(to-l, #7928CA, #FF0080)"
                            pr={5}
                            p={"1rem"}
                            borderRadius={"1rem 0 1rem 1rem"}
                        >{value.message}</Text>
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
                <Flex borderRadius={3} my={3} p={2} pl={5} alignItems={"center"} color={"white"} key={index}>
                    <Button alignSelf={"flex-start"} overflow={"hidden"} borderRadius={"50%"} p={0} textTransform={'uppercase'}>
                        {(value.sender.photoURL) ? <Image
                            src={value.sender.photoURL as string}
                            width="40"
                            height="40"
                            alt="user image" /> : null
                        }
                    </Button>
                    <Box ml={5}>
                        <Text>{value.sender.displayName}</Text>
                        <Text bgGradient="linear(to-l, #7928CA, #FF0080)" pr={5} p={"1rem"} borderRadius={"0rem 1rem 1rem 1rem"}>{value.message}</Text>
                    </Box>


                </Flex>
            )
        }
    })
    return (
        <>
            < Box overflowY={"scroll"} ref={messageEl} >
                <Box p="1rem">
                    {Messages2}
                </Box>
            </Box>
        </>

    )
}

export default Chat
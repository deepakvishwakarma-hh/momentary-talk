import { Button, Flex, Input, useToast } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"
import { addMyMessage } from "../../code-blocks/chat.realtime"
import { useAppSelector } from "../../src/store/hook"
const Footer = () => {
    const toast = useToast()
    const state = useAppSelector(state => state)
    const [message, setMessage] = useState<string>('')
    const onChangeHandler = (e) => { setMessage(e.target.value) }
    const pushMessage = () => {
        (message !== "") ? addMyMessage(state.currentRoomId, state.room.chat, state.user, message) : toast({
            title: 'Please write message',
            description: "We've deleted your messages for you.",
            status: 'error',
            duration: 500,
            isClosable: true,
        })
        setMessage('')
    }

    return (
        < Flex borderTop={"2px black solid"} padding={"1rem"} bg="#11111D" alignItems={"center"} >
            <Input value={message} onChange={onChangeHandler} bg="whiteAlpha.50" borderTop={"2px black solid"} color={"white"} placeholder="type message..." />
            <Button
                onClick={pushMessage}
                type="submit" ml={10} mx='2'
                // border={"2px grey solid"}
                bg={'none'}
                textTransform={'uppercase'}>
                <Image width={20} height={20} src="/send.svg" />
            </Button>
        </Flex>
    )
}

export default Footer
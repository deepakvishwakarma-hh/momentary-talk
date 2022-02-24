import { Button, Flex, Input, useToast } from "@chakra-ui/react"
import Image from "next/image"
import React, { useState } from "react"
import { motion } from 'framer-motion'
import { addMyMessage } from "../../code-blocks/chat.realtime"
import { useAppSelector } from "../../src/store/hook"
import { ChangeEventHandler } from "react"



const Footer = () => {
    const toast = useToast()
    const MotionButton = motion(Button);
    const state = useAppSelector(state => state)
    const [message, setMessage] = useState<string>('')
    const onChangeHandler: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => { setMessage(e.target.value) }
    const pushMessage = () => {
        (message !== "") ? addMyMessage(state.currentRoomId as string, state.room.chat, state.user, message) : toast({
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
            <MotionButton
                whileHover={{ background: "blue" }}
                onClick={pushMessage}
                type="submit"
                ml={10} mx='2'
                bg={'black'}
                textTransform={'uppercase'}>
                <Image width={20} height={20} alt="none" src="/send.svg" />
            </MotionButton>
        </Flex >
    )
}

export default Footer
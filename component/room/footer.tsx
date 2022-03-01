import Image from "next/image"
import React, { useState } from "react"
import { motion } from 'framer-motion'
import { Button, Flex, Input } from "@chakra-ui/react"
import useConfigChat from "../../custom-hooks/useConfigChat"

const Footer = () => {

    const chatConfig = useConfigChat()
    const MotionButton = motion(Button);
    const [message, setMessage] = useState<string>('')
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { setMessage(e.target.value) }

    const pushMessage = () => {
        chatConfig.updateMsg(message)
        setMessage('')
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") { pushMessage() }
    };

    return (
        < Flex borderTop={"2px black solid"} padding={"1rem"} bg={'blackAlpha.900'} alignItems={"center"} >
            <Input onKeyDown={keyDownHandler} value={message} onChange={onChangeHandler} bg="whiteAlpha.50" borderTop={"2px black solid"} color={"white"} placeholder="type message..." />
            <MotionButton whileHover={{ background: "blue" }} onClick={pushMessage} type="submit" ml={10} mx='2' bg={'black'} textTransform={'uppercase'}>
                <Image width={20} height={20} alt="none" src="/send.svg" />
            </MotionButton>
        </Flex >
    )
}

export default Footer
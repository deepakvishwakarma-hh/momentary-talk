import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react"
import Image from "next/image"
const Footer = ({ myNewMessage, onChangeHandler, addMessageToRoom }) => {
    return (
        < Flex borderTop={"2px black solid"} padding={"1rem"} bg="#11111D" alignItems={"center"} >
            <Input value={myNewMessage} onChange={onChangeHandler} bg="whiteAlpha.50" borderTop={"2px black solid"} color={"white"} placeholder="type message..." />
            <Button onClick={addMessageToRoom} type="submit" ml={10} mx='2'
                // border={"2px grey solid"}
                bg={'none'}
                textTransform={'uppercase'}>
                <Image width={20} height={20} src="/send.svg" />
            </Button>
        </Flex>
    )
}

export default Footer
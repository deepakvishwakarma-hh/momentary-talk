import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react"
import Image from "next/image"
const Footer = ({ myNewMessage, onChangeHandler, addMessageToRoom }) => {
    return (
        < Flex borderTop={"2px black solid"} padding={"2rem"} bg="#11111D" alignItems={"center"} >
            <Input value={myNewMessage} onChange={onChangeHandler} bg="white" borderTop={"2px black solid"} color={"black"} placeholder="type message..." />
            <Button onClick={addMessageToRoom} type="submit" ml={10} bg="white" mx='2' textTransform={'uppercase'}>
                <Image width={20} height={20} src="/send.svg" />
            </Button>
        </Flex>
    )
}

export default Footer
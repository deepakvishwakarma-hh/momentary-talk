import * as store from "../../../types/store"
import { Box, Flex, Text } from "@chakra-ui/react"
import Avatar from "./Avatar"
type props = {
    value: store.chat,
    index: number,
    dateToString: any
}

export const User = ({ value, index, dateToString }: props) => {
    return (
        <Flex borderRadius={3} my={3} p={2} pl={5} justifyContent={"end"} alignItems={"center"} color={"white"} key={index}>
            <Box mr={5} minWidth="200px" maxWidth="500px">
                <Text textAlign={"right"}>You</Text>
                <Text pr={5} p={"1rem"} overflow="hidden" width={'inherit'} bg={'blackAlpha.500'} borderRadius={"1rem 0 1rem 1rem"}
                >{value.message}</Text>
                <Text p={2} opacity={.5} fontSize={['10px', '15px']} textAlign={"right"}>{dateToString(value?.cat)}</Text>
            </Box>
            <Avatar value={value} />
        </Flex>
    )
}
export const Stranger = ({ value, index, dateToString }: props) => {
    return (
        <Flex borderRadius={3} my={3} p={2} pr={5} alignItems={"center"} color={"white"} key={index}>
            <Avatar value={value} />
            <Box ml={5} minWidth="200px" maxWidth="500px">
                <Text fontWeight={"500"} textTransform={'lowercase'}>@{value.sender.displayName}</Text>
                <Text bg={'purple.800'} pr={5} p={"1rem"} borderRadius={"0rem 1rem 1rem 1rem"}>{value.message}</Text>
                <Text p={2} opacity={.5} fontSize={['10px', '15px']} textAlign={"right"}>{dateToString(value.cat)}</Text>
            </Box>
        </Flex >
    )
}

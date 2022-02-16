import { useRouter } from "next/router"
import { Button, Flex, Text, Box } from "@chakra-ui/react"

export default function UserNotLogin() {
    const router = useRouter()
    const onClickHandler = () => {
        router.push('/login')
    }
    return (
        <Flex
            alignItems={"center"}
            justifyContent="center"
            height="100vh"
            bg={"black"}
            flexDirection={"column"}
        >
            <Box p={'3rem'} border={".5px grey solid"}>
                <Text color={"white"} fontSize={'3xl'} fontWeight={'500'}>Login Not Found </Text>
                <Button onClick={onClickHandler} width={"100%"} borderRadius={0} my="1rem">LOGIN</Button>
            </Box>
        </Flex>
    )
}

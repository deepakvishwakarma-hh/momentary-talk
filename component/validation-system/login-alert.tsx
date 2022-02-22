import Image from "next/image"

import { Button, Grid, Flex, Text, Box } from "@chakra-ui/react"
import Authentication from "../../code-blocks/authentication"
export default function LoginAleart() {
    const authenticate = Authentication()
    return (
        <Flex
            alignItems={"center"}
            justifyContent="center"
            position={"fixed"}
            height="100%"
            width={"100%"}
            bg={"black"}
            flexDirection={"column"}
        >
            <Box p={'0rem'}
                borderRadius={10}
                py={10}
                px={[10, 20]}
                bg={'blackAlpha.500'}
            // border={['none', '1px white solid']}
            >
                <Text color={"white"} letterSpacing={2} textTransform={"uppercase"} my={4} fontSize={10} fontWeight={'500'}>+ firebase auth provider </Text>

                <Text color={"white"} fontSize={['25', '3xl']} fontWeight={'500'} >Login not found </Text>
                <Grid onClick={authenticate} bg="#F3F2FB" my={3} padding=".7rem 1rem .5rem .3rem" borderRadius={5} gridTemplateColumns='50px auto' templateRows='80%' alignItems={"center"}>
                    <Image alt="icon" width={25} height={25} src="/google.svg" />
                    <Text opacity={.8} fontFamily={"heading"} textAlign={'center'} letterSpacing={1} fontWeight={800}>Connect with Google</Text>
                </Grid>
                <Text color={"white"} letterSpacing={2} textTransform={"lowercase"} my={4} fontSize={10} fontWeight={'500'}>! you need to authenticate your identity </Text>

            </Box>
        </Flex>

    )
}

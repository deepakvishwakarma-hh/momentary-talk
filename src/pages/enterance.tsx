import { Box, Text, Flex, Button, Grid, GridItem } from "@chakra-ui/react"
import { IconButton } from '@chakra-ui/react'
import Image from "next/image"
const Enterence = () => {
    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;800&display=swap');
            </style>
            <Flex pos={"absolute"}
                height="100%"
                width="100%"
                alignItems="center"
                justifyContent='center'>
                <Grid
                    p={"5rem"}
                    borderRadius={10}
                    height="45rem"
                    bg={"white"}
                    border={'1px solid white'}
                    gridTemplateColumns='100%'
                    templateRows='repeat(3, 1fr)'
                    gap={6} >
                    <Box p={1} >
                        <Text padding="1rem" fontSize='3xl' textAlign="center" fontFamily="Dosis" fontWeight="bold" >Momentary-Talk</Text>
                        <Text fontSize='1xl' textAlign="center"  >Lorem ipsum dolor sit amet consectetur </Text>
                    </Box>
                    <Flex alignItems="center" flexDirection={"column"} p={1} >
                        <Image width={100} height={100} src="/secure.png" />

                    </Flex >
                    <Box
                    >
                        <Grid bg="#F3F2FB" my={2} padding=".5rem .5rem .5rem 0" borderRadius={5} gridTemplateColumns='50px auto' templateRows='100%' alignItems={"center"}>
                            <Image width={25} height={25} src="/google.svg" />
                            <Text fontSize="1xl" fontWeight="500" >Sign With Google</Text>
                        </Grid>
                        <Grid bg='black' padding=".5rem .5rem .5rem 0" borderRadius={5} gridTemplateColumns='50px auto' templateRows='auto ' alignItems="center" >
                            <Image width={25} height={25} src="/apple.svg" />
                            <Text color="white" fontSize="1xl" fontWeight="500">Sign With Apple</Text>
                        </Grid>
                    </Box>
                </Grid>
            </Flex >



        </>

    )
}

export default Enterence
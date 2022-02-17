import Image from "next/image"
import jwt from "jsonwebtoken"
import { useRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import { Box, Text, Flex, Button, Grid, } from "@chakra-ui/react"
import { googleAuth, provider } from "../../firebase.config";
import { extractUserFlow } from "../../component/user-flow-system/user-flow";
const Enterence = () => {

    const router = useRouter()
    // This Function Handle the Login with Google set set up the token as well as the user data
    const logInHandlerWithGoogle = async () => {
        signInWithPopup(googleAuth, provider)
            .then(data => {
                const { displayName, email, photoURL } = data.user;
                var token = jwt.sign({ displayName, email, photoURL }, 'this is my secret key');
                localStorage.setItem('token', token);
                extractUserFlow(router, '/')
            }).catch(err => { alert(err) })
    }

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;800&display=swap');
            </style>
            <Flex
                pos={"fixed"}
                top="0"
                height="100%"
                width="100%"
                alignItems="center"
                justifyContent='center'>
                <Grid
                    p={[5, 5, 5]}
                    w={['100%', "auto", "auto"]}
                    borderRadius={10}
                    height="45rem"
                    border={'1px solid white'}
                    gridTemplateColumns='100%'
                    templateRows='repeat(2, 100px)'
                    gap={6} >
                    <Box p={1} >
                        <Text padding="1rem" fontSize='3xl' textAlign="center" fontFamily="Dosis" fontWeight="bold" >Momentary-Talk</Text>
                        <Text fontSize='1xl' textAlign="center"  >Chat Securely, We Work upon Google policies</Text>
                    </Box>
                    <Box
                    >
                        <Grid onClick={logInHandlerWithGoogle} bg="#F3F2FB" my={2} padding=".5rem .5rem .5rem 0" borderRadius={5} gridTemplateColumns='50px auto' templateRows='80%' alignItems={"center"}>
                            <Image width={25} height={25} src="/google.svg" />
                            <Text textAlign={"center"} fontSize="1xl" fontWeight="500" >Sign With Google</Text>
                        </Grid>
                        {/* <Grid bg='black' padding=".5rem .5rem .5rem 0" borderRadius={5} gridTemplateColumns='50px auto' templateRows='auto ' alignItems="center" >
                            <Image width={25} height={25} src="/apple.svg" />
                            <Text color="white" fontSize="1xl" fontWeight="500">Sign With Apple</Text>
                        </Grid> */}
                    </Box>
                </Grid>
            </Flex >
        </>

    )
}

export default Enterence

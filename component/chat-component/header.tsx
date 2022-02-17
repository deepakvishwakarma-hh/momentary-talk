import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react"
import Image from "next/image"
import Head from "next/head"
const Header = ({ query, showShare, setSetting, setShare, showSetting }) => {

    const settingOnClickHandler = () => { setSetting(!showSetting) }
    const shareOnClickHandler = () => { setShare(!showShare) }

    return (
        <>
            <Head>
                <title>Room -{query}</title>
                <meta name="theme-color" content="#16161D" />
            </Head>
            <Flex justifyContent={"space-between"} alignItems={"center"} bg={"white"}>
                <Text padding="1rem" fontSize='2xl' textAlign="center" fontFamily="Dosis" fontWeight="bold" >Momentary</Text>
                <Text
                    display={['none', 'block']}
                >ID: {query}</Text>
                <Box>
                    <Button onClick={shareOnClickHandler} mx='2' bg={'white'} textTransform={'uppercase'}>
                        <Image width={18} height={18} src="/share.svg" />
                    </Button>
                    <Button onClick={settingOnClickHandler} mx='2' bg={'none'} textTransform={'uppercase'}>
                        <Image width={20} height={20} src="/settings.svg" />
                    </Button>

                </Box>
            </Flex>
        </>

    )
}

// New Component that show component ID
export default Header
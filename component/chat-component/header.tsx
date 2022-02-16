import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react"
import Image from "next/image"

const Header = ({ query, showShare, setSetting, setShare, showSetting }) => {

    const settingOnClickHandler = () => { setSetting(!showSetting) }
    const shareOnClickHandler = () => { setShare(!showShare) }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} bg={"lightcyan"}>
            <Text padding="1rem" fontSize='2xl' textAlign="center" fontFamily="Dosis" fontWeight="bold" >Momentary</Text>
            <Text>ID: {query}</Text>
            <Box>
                <Button onClick={shareOnClickHandler} mx='2' bg={'none'} textTransform={'uppercase'}>
                    <Image width={18} height={18} src="/share.svg" />
                </Button>
                <Button onClick={settingOnClickHandler} mx='2' bg={'none'} textTransform={'uppercase'}>
                    <Image width={20} height={20} src="/settings.svg" />
                </Button>

            </Box>
        </Flex>
    )
}

export default Header
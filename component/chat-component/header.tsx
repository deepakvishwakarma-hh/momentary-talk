import Head from "next/head"
import Image from "next/image"
import { useAppDispatch, } from "../../src/store/hook";
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { toggleSetting } from "../../src/store/features/slices"

const Header = ({ query }) => {
    const dispatch = useAppDispatch()

    const settingOnClickHandler = () => {
        dispatch(toggleSetting(true) as any)
    }

    return (
        <>
            <Head>
                <title>Room -{query}</title>
                <meta name="theme-color" content="#16161D" />
            </Head>
            <Flex
                bg={['white']}

                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box m={4}>
                    <Image width={25} height={25} src="/balloon-heart.svg" />

                </Box>
                <Box>
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
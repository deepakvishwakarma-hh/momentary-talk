import Image from "next/image"
import { useAppDispatch, useAppSelector } from "../../src/store/hook";
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { toggleSetting } from "../../src/store/features/slices"

const Header = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)

    const settingOnClickHandler = () => {
        dispatch(toggleSetting(true) as any)
    }

    return (
        <>
            <Flex
                bg="#121218"
                justifyContent={"space-between"}
                boxSizing={'border-box'}
                alignItems={"center"} >
                <Box m={4}>
                    <Text fontSize={[15, 20]} color="white">{user.displayName}</Text>
                    <Text fontSize={[10, 15]} opacity={.6} color="white">{user.email}</Text>
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
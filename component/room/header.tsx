import Image from "next/image"
import { useAppDispatch, useAppSelector } from "../../src/store/hook";
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { toggleSetting } from "../../src/store/features/slices"
const Header = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)
    const online = useAppSelector(state => state.online)

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
                    <Flex>
                        {online?.map((value, index) => {
                            return (
                                <Box border={'2px black solid'} ml={(index > 0) ? -5 : 1} width={"40px"} height={"40px"} borderRadius={'50%'} overflow={'hidden'} key={index}>
                                    <Image width={"40px"} alt="none" height={"40px"} src={value.photoURL as string} />
                                </Box>
                            )
                        })}
                    </Flex>



                </Box>
                <Box>
                    <Button onClick={settingOnClickHandler} mx='2' bg={'none'} textTransform={'uppercase'}>
                        <Image width={20} alt="none" height={20} src="/settings.svg" />
                    </Button>

                </Box>
            </Flex >
        </>

    )
}

// New Component that show component ID
export default Header
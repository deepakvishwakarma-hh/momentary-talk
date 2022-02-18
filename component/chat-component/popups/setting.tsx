import Image from 'next/image'
import Admin from './component/admin-box'
import { useAppDispatch, } from "../../../src/store/hook";
import { Flex, Box, Text, CloseButton } from '@chakra-ui/react'
import { toggleSetting } from "../../../src/store/features/slices"

export default function Setting({ id }) {
    const dispatch = useAppDispatch()
    const closeHandler = () => { dispatch(toggleSetting(false) as any) }
    return (
        <>
            <Box w={['100%', '100%']} h={['100%', 'initial']}
                // fontFamily={'Poppins'} 
                pos={'fixed'}
                top="0%"
                zIndex={100}
                bg={['white', "white"]}
            >
                <Flex px={5} py={5} alignItems={"center"} justifyContent={"space-between"}>
                    <Flex>

                        <Image
                            src="/settings.svg"
                            width="30"
                            height="30"
                            alt="none" />
                        <Text letterSpacing={1}
                            textTransform={'uppercase'}
                            fontSize={[30, 20]}
                            p={'.5rem 1rem'}
                        >Settings</Text>
                    </Flex>
                    <CloseButton p={2} size='xl' onClick={closeHandler} />
                </Flex>
                <Box>
                    <Text p="1rem">
                        <Text fontSize={20}
                            textTransform={"uppercase"}
                            display={'inline'}> ID </Text>
                        : {id}</Text>

                    <Admin />
                </Box>
            </Box>
        </>
    )
}

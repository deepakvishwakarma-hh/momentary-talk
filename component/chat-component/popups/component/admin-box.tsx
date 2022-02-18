import Image from 'next/image'
import { Flex, Box, Text } from '@chakra-ui/react'
import { useAppSelector, } from "../../../../src/store/hook";

const Admin = () => {
    const admin = useAppSelector(state => state.user)
    return (
        <>
            <Text
                pl={3}
                letterSpacing={1}
                textTransform={'uppercase'}
                fontSize={15}
            >Admin</Text>
            <Flex p={"1rem 1rem 1rem 1rem"}>
                {(admin.photoURL) ? <Image
                    src={admin.photoURL as string}
                    width="40"
                    height="40"
                    alt="user image" /> : null
                }
                <Box>
                    <Text
                        fontSize={20}
                        pl={2}>@{admin.displayName}</Text>
                    <Text
                        opacity={.5}
                        pl={2}>{admin.email}</Text>
                </Box>
            </Flex>
        </>
    )
}

export default Admin
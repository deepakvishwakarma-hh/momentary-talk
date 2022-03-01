import Image from 'next/image'
import { Grid, Box, Text, Button } from '@chakra-ui/react'
import { user } from "../../../types/store"
import useConfigChat from '../../../custom-hooks/useConfigChat'
import { useAppSelector } from '../../../src/store/hook'

type Props = { admin: user }

const AdminBox = ({ admin }: Props) => {
    const configChat = useConfigChat()
    const user = useAppSelector(state => state?.user)
    const roomAdmin = useAppSelector(state => state?.room?.admin)
    const blockHandler = () => { configChat.blockUser(admin.email) }
    const blocked = useAppSelector(state => state?.room?.blocked)
    const isMeBlocked = blocked?.find((value: string) => value == admin?.email)

    const showButton = (user?.email == admin?.email) ? false : (roomAdmin?.email == admin?.email) ? false :
        (admin?.email == isMeBlocked) ? false : true
    return (
        <>
            <Grid
                p={3}
                borderRadius={3}
                templateColumns={"50px auto auto"}
            >
                {(admin?.photoURL) ? <Box    >
                    <Image
                        width="50"
                        height="50"
                        src={admin?.photoURL as string}
                        alt="user image" />
                </Box> : null
                }
                <Box pl={3} >
                    <Text
                        opacity={.8}
                        fontSize={18}
                        letterSpacing={1}
                        pl={2}>@{admin?.displayName}</Text>
                    <Text
                        fontSize={15}
                        opacity={.5}
                        pl={2}>{admin?.email}</Text>
                </Box>
                {showButton && <Button onClick={blockHandler} p={0} bg="none" _hover={{ opacity: .8 }} ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
                </svg></Button>}
            </Grid>
        </>
    )
}

export default AdminBox
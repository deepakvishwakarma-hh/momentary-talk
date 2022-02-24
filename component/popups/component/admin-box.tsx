import Image from 'next/image'
import { Grid, Box, Text } from '@chakra-ui/react'
import { user } from "../../../types/store"

const AdminBox = ({ admin }: { admin: user }) => {
    return (
        <>
            <Grid
                p={3}
                borderRadius={3}
                templateColumns={"50px auto"}
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
            </Grid>
        </>
    )
}

export default AdminBox
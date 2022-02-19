import Image from 'next/image'
import { Grid, Box, Text } from '@chakra-ui/react'
import { useAppSelector, } from "../../../src/store/hook";

const Admin = () => {
    const admin = useAppSelector(state => state.room.admin)
    return (
        <>

            <Grid
                p={1}
                borderRadius={3}
                templateColumns={"50px auto"}
            >
                {(admin.photoURL) ? <Box overflow={'hidden'} >
                    <Image
                        width="50"
                        height="50"
                        src={admin.photoURL as string}
                        alt="user image" />
                </Box> : null
                }
                <Box pl={3}>
                    <Text
                        fontSize={20}
                        pl={2}>@{admin.displayName}</Text>
                    <Text
                        opacity={.5}
                        pl={2}>{admin.email}</Text>
                </Box>
            </Grid>
        </>
    )
}

export default Admin
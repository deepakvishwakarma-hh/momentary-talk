import { Alert, Center, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
export default function LinkExpireFallback() {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 8000);
    }, [])
    return (
        <Center bg="black" pos="fixed" width="100%" h="100%">
            <Alert display={'block'} bg={"blackAlpha.900"} color="white" maxWidth={['100%', '500px']} status='error'>
                <Text color="red" fontSize={20}>Link Expired</Text>
                <Text>This Link is Expired. Create new room or get another link from administator. You automtically push to home in <b>8 seconds</b></Text>
            </Alert>
        </Center>
    )
}

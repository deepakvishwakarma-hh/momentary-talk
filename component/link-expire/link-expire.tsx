import { Alert, Center, Text } from "@chakra-ui/react"
import Link from "next/link"
export default function LinkExpireFallback() {
    return (
        <Center bg="black" pos="fixed" width="100%" h="100%">
            <Alert display={'block'} bg={"blackAlpha.900"} color="white" maxWidth={['100%', '500px']} status='error'>
                <Text color="red" fontSize={20}>Link Expired</Text>
                <Text>This Link is Expired. Create new room or get another link from administator.  <Link href={"/"}>visit home</Link></Text>
            </Alert>
        </Center>
    )
}

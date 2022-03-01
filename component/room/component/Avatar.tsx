import Image from "next/image"
import { Button } from "@chakra-ui/react"
import * as store from "../../../types/store"
type props = { value: store.chat }

const Avatar = ({ value }: props) => {
    return (
        <Button alignSelf={"flex-start"} overflow={"hidden"} borderRadius={"50%"} p={0} textTransform={'uppercase'}>
            {(value?.sender?.photoURL) ?
                <Image src={value?.sender?.photoURL as string} width="40" height="40" alt="user image" /> : null}
        </Button>
    )
}
export default Avatar
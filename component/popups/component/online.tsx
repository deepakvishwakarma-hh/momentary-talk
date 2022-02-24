import type { user } from "../../../types/store"
import {
    Box, Button, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react"
import Image from "next/image"
import AdminBox from "./admin-box"
const Online = ({ data }: { data: user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (

        <>
            <Box onClick={onOpen} m={2} width={50} height={50} overflow={'hidden'} borderRadius={"505"} bg="green"><Image alt="img" width={50} height={50} src={data.photoURL} /></Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'black'}>
                    <ModalHeader >
                        <Text
                            letterSpacing={3}
                            color="white"
                            fontSize={15}
                            textTransform={"uppercase"}>details</Text>
                    </ModalHeader>
                    <ModalCloseButton color={"white"} />
                    <ModalBody color="white">
                        <AdminBox admin={data} />
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    )
}

export default Online 
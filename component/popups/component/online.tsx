// Myself = im a component used in mostly in MAPPING

import Image from "next/image"
import AdminBox from "./user"
import { useAppSelector } from "../../../src/store/hook"
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import type { user } from "../../../types/store"
type Props = { data: user }

const Online = ({ data }: Props) => {
    const blocked = useAppSelector(state => state?.room?.blocked)
    const isMeBlocked = blocked?.find((value: string) => value == data?.email)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box border={(isMeBlocked) ? '5px tomato solid' : 'none'} onClick={onOpen} m={2} width={50} height={50} overflow={'hidden'} borderRadius={"505"} bg="green">
                <Image alt="img" width={50} height={50} src={data.photoURL} />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'black'}>
                    <ModalHeader >
                        <Text letterSpacing={3} color="white" fontSize={15} textTransform={"uppercase"}>details</Text>
                    </ModalHeader>
                    <ModalCloseButton color={"white"} />
                    <ModalBody color="white">
                        <AdminBox admin={data} />
                    </ModalBody>
                </ModalContent>
            </Modal></>
    )
}

export default Online 
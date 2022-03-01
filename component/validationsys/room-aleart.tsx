import { Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/react";
import useConfigRoom from "../../custom-hooks/useConfigRoom";
import { useAppSelector } from "../../src/store/hook";
import Router from "next/router"

const RoomAleart = () => {

    const toggler = useAppSelector(state => state.toggles.abilty)

    const configRoom = useConfigRoom();

    const onCloseHandler = () => {
        // im not sure if this is the best way to do this
    }

    const onDeleteHandler = () => {
        configRoom.syncRemove();
    }
    const onVisitHandler = () => {
        const label = localStorage.getItem('created-room') as string;
        Router.push('/room/' + label);
    }

    if (toggler) {
        return (
            <Modal onClose={onCloseHandler} isOpen={true} isCentered>
                <ModalOverlay backdropFilter='blur(10px) ' />
                <ModalContent bg={'blackAlpha.800'}>
                    <ModalHeader letterSpacing={2} color={'red'} textTransform={'uppercase'} fontSize={15} >High security aleart</ModalHeader>
                    <ModalBody>
                        <Text mb={3} opacity={.5} color="white">Old room still active. Which can leak data. You must delete it before creating a new one or join.</Text>
                        <Button
                            _hover={{ opacity: .8, bg: "none" }}
                            variant='outline'
                            fontWeight={100}
                            border={'none'}
                            onClick={onVisitHandler}
                            color="white"
                            mr={3}
                            letterSpacing={2}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                            </svg>
                        </Button>
                        <Button
                            _hover={{ opacity: .8, bg: "none" }}
                            onClick={onDeleteHandler}
                            variant='outline'
                            fontWeight={100}
                            color="white"
                            border={'none'}
                            letterSpacing={2}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </Button>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    } else {
        return (
            <></>
        )
    }
}

export default RoomAleart
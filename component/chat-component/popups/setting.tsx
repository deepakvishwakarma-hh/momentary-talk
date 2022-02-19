import Admin from './component/admin-box'
import { motion, AnimatePresence } from "framer-motion"
import { toggleSetting, } from "../../../src/store/features/slices"
import useWindowDimensions from "../../../code-blocks/useDimention"
import { useAppDispatch, useAppSelector } from "../../../src/store/hook";
import {
    Flex, Box, Input, Button, Center, Text, CloseButton, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

export default function Setting({ id, removeMyMessages, terminate }) {
    const MotionComp = motion(Box);
    const dispatch = useAppDispatch();
    const { width } = useWindowDimensions();
    const toggle = useAppSelector(state => state.toggles.setting);
    const state = useAppSelector(state => state);
    const authorize = state.user.email == state.room.admin.email;
    const closeHandler = () => { dispatch(toggleSetting(false) as any) };
    const shareableLink = `https://momentary-talk.vercel.app/room/${id}`;
    const clickToCopyHandler = () => { navigator.clipboard.writeText(shareableLink) };
    return (
        <>
            <AnimatePresence>
                {toggle && <Center
                    h="100%"
                    w="100%"
                    zIndex={100}
                    pos={'fixed'}
                    bg={' rgba(0, 0, 0, 0.900)'}>
                    <MotionComp
                        bg={'black'}
                        height={['100%', 'initial']}
                        maxWidth={[`${width}px`, `500px`]}
                        minWidth={[`${width}px`, `500px`]} >
                        <Flex color={"white"}
                            px={9}
                            py={4}
                            overflow={'hidden'}
                            alignItems={"center"}
                            bg={'blackAlpha.300'}
                            justifyContent={"space-between"}>
                            <Text
                                letterSpacing={3}
                                fontSize={20}
                                textTransform={"uppercase"}>settings</Text>
                            <CloseButton
                                p={2}
                                size='xl'
                                onClick={closeHandler} />
                        </Flex>
                        <Box p={5}
                            color={'white'}>
                            <Accordion defaultIndex={[0]} >
                                <AccordionItem border={"none"} pl={0}>
                                    <h2>
                                        <AccordionButton justifyContent="space-between">
                                            <Text
                                                letterSpacing={3}
                                                fontSize={15}
                                                color={'purple.500'}
                                                py={3}
                                                textTransform={"uppercase"}>Invitation Link </Text>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Text
                                            letterSpacing={3}
                                            fontSize={13}
                                            color={'white.500'}
                                            py={2}
                                            textTransform={"uppercase"}>Invite via link.</Text>
                                        <Flex mb={3}
                                            alignItems={"center"}>
                                            <Input
                                                my={2}
                                                py={2}
                                                readOnly
                                                opacity={.5}
                                                flex={10}
                                                borderRadius={5}
                                                value={shareableLink} />
                                            <Button
                                                ml={3}
                                                bg="black"
                                                variant='outline'
                                                colorScheme='purple'
                                                onClick={clickToCopyHandler}
                                            > COPY</Button>
                                        </Flex>
                                    </AccordionPanel>
                                </AccordionItem>

                                <AccordionItem border={"none"} pl={0}>
                                    <h2>
                                        <AccordionButton justifyContent="space-between">
                                            <Text
                                                letterSpacing={3}
                                                fontSize={15}
                                                color={'purple.500'}
                                                py={3}
                                                textTransform={"uppercase"}>Administrater </Text>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Admin />
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem border={"none"} pl={0}>
                                    <h2>
                                        <AccordionButton justifyContent="space-between">
                                            <Text
                                                letterSpacing={3}
                                                fontSize={15}
                                                color={'purple.500'}
                                                py={3}
                                                textTransform={"uppercase"}>action controls </Text>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel p={0}>
                                        <Box p={3}
                                            bg={'blackAlpha.300'}
                                        >
                                            <Text
                                                letterSpacing={3}
                                                fontSize={13}
                                                color={'white.500'}
                                                py={2}
                                                textTransform={"uppercase"}>Protect yourself </Text>
                                            <Box>
                                                <Text color={'grey'} py={2}>Delete all the data entered in the current ({id}) room.</Text>
                                                <Button
                                                    onClick={removeMyMessages}
                                                    borderRadius={5}
                                                    width={'100%'}
                                                    colorScheme={'purple'}
                                                    variant={'outline'}
                                                    textTransform={"capitalize"}
                                                    letterSpacing={1}
                                                >Delete</Button>
                                            </Box>
                                        </Box>
                                        <Box p={3}
                                            bg={'blackAlpha.300'}
                                        >
                                            <Text
                                                letterSpacing={3}
                                                fontSize={13}
                                                color={'white.500'}
                                                py={2}
                                                textTransform={"uppercase"}>Terminate Room </Text>
                                            <Box>
                                                <Text color={'grey'} py={2}>Room Terminate from fireabse server and Link  gonna be expire. This action is only oprated by Admin</Text>
                                                <Button
                                                    disabled={!authorize}
                                                    onClick={terminate}
                                                    borderRadius={5}
                                                    width={'100%'}
                                                    colorScheme={'purple'}
                                                    variant={'outline'}
                                                    textTransform={"capitalize"}
                                                    letterSpacing={1}
                                                >Terminate</Button>
                                            </Box>
                                        </Box>

                                    </AccordionPanel>
                                </AccordionItem>

                            </Accordion>
                        </Box>
                    </MotionComp>
                </Center>
                }
            </AnimatePresence>
        </>
    )
}

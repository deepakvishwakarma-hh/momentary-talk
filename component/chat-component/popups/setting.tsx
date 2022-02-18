import Image from 'next/image'
import Admin from './component/admin-box'
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../../src/store/hook";
import { Flex, Box, Input, Button, Text, CloseButton, useClipboard } from '@chakra-ui/react'
import { toggleSetting, } from "../../../src/store/features/slices"
import useWindowDimensions from "../../../code-blocks/useDimention"

export default function Setting({ id }) {
    const { height, width } = useWindowDimensions();
    const dispatch = useAppDispatch()
    const closeHandler = () => { dispatch(toggleSetting(false) as any) }
    const toggle = useAppSelector(state => state.toggles.setting)
    const MotionComp = motion(Box)



    const [value, setValue] = useState(`https://momentary-talk.vercel.app/room/${id}`)
    const { hasCopied, onCopy } = useClipboard(value)

    const Memoral = useMemo(onCopy, [value])

    return (
        <>
            <AnimatePresence>
                {toggle && <MotionComp
                    transition={{ duration: 1 }}
                    w={['100%', '50%']}
                    h={['initial']}
                    pos={'fixed'}
                    top="0%"
                    left="0"
                    zIndex={100}
                    bg={['white', "white"]}
                >
                    <Flex px={5} py={5} alignItems={"center"} justifyContent={"space-between"} overflow={'hidden'}>

                        <CloseButton p={2} size='xl' onClick={closeHandler} />
                    </Flex>
                    <Box>
                        <Text pl={5}>Copy the link send to the you receiver.</Text>
                        <Flex p={3} mb={2}>
                            <Input color="blue" value={value} isReadOnly placeholder='Welcome' />
                            <Button onClick={onCopy} ml={2}>
                                {hasCopied ? 'Copied' : 'Copy'}
                            </Button>
                        </Flex>

                        <Admin />
                    </Box>
                </MotionComp>
                }
            </AnimatePresence>
        </>
    )
}

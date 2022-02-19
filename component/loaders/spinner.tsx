import { motion, AnimatePresence } from 'framer-motion'
import { Spinner, Flex, Box } from '@chakra-ui/react'

const Loader = ({ target }) => {
    const MotionBox = motion(Flex)
    return (
        <>
            <AnimatePresence>
                {(target == 'loading') && <MotionBox
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    position="fixed"
                    bg="black"
                    zIndex={999999}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                >

                    <Spinner size="sm" color='white' />
                </MotionBox>}
            </AnimatePresence>

        </>
    )
}

export default Loader
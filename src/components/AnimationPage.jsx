import React from 'react'
import { motion } from 'framer-motion'
const animationsLeft = {
    initial: { opacity: 1, x : -300 },
    animate: { opacity: 1, x : 0 },
    exit: { opacity: 1, x : -100 },
}
export const AnimationPageLeft = ({children}) => {
    return (
        <motion.div variants={animationsLeft}
            initial="initial"
            animate="animate"
            exit="exit"
            transition = {{duration: 0.5}}>
            {children}
        </motion.div>
    )
}

const animationsRight = {
    initial: { opacity: 1, x : 300},
    animate: { opacity: 1, x : 0 },
    exit: { opacity: 1, x : 100},
}

export const AnimationPageRight = ({children}) => {
    return (
        <motion.div variants={animationsRight}
            initial="initial"
            animate="animate"
            exit="exit"
            transition = {{duration: 0.5}}>
            {children}
        </motion.div>
    )
}
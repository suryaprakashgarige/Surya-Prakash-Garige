'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-accent-hover to-accent z-[101] origin-left shadow-lg shadow-accent/50"
                style={{ scaleX }}
            />
            <motion.div
                className="fixed top-0 left-0 right-0 h-[1px] bg-accent/30 blur-md z-[100]"
                style={{ scaleX, opacity: useSpring(scrollYProgress, { stiffness: 150 }) }}
            />
        </>
    )
}

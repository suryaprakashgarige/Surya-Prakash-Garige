'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <motion.div
                className="fixed inset-0 z-50 bg-black pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ originY: 0 }} // Slide up (reveal)
            />
            <motion.div
                className="fixed inset-0 z-50 bg-black pointer-events-none"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }} // Slide down (cover)
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ originY: 1 }}
            />
            {children}
        </>
    )
}

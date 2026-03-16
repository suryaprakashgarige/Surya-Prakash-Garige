'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    /** How strongly the element is pulled toward the cursor (0–1) */
    strength?: number
}

/**
 * Wraps any element with a magnetic cursor-follow effect.
 * The element smoothly drifts toward the cursor while hovering.
 */
export default function MagneticButton({
    children,
    className,
    strength = 0.45,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)

    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)
    const x = useSpring(rawX, { stiffness: 350, damping: 22, mass: 0.5 })
    const y = useSpring(rawY, { stiffness: 350, damping: 22, mass: 0.5 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        rawX.set((e.clientX - cx) * strength)
        rawY.set((e.clientY - cy) * strength)
    }

    const handleMouseLeave = () => {
        rawX.set(0)
        rawY.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x, y, display: 'inline-block' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    )
}

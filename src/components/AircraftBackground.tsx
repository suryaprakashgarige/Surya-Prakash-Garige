'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import FrameSequence from './sections/FrameSequence'

/**
 * Fixed-position aircraft that animates based on page scroll.
 * Lives behind all content — sections scroll over it.
 * Like Apple's product pages where the 3D model animates in the background.
 */
export default function AircraftBackground() {
    const { scrollYProgress } = useScroll()

    // Aircraft plays through all 80 frames during the first ~40% of page scroll
    const frameProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1], { clamp: true })

    // Fade out gently — stays fully visible through hero, fades as About comes up
    const opacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0])

    return (
        <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity }}
        >
            <FrameSequence
                frameCount={80}
                basePath="/framevid/Cinematic_tracking_shot_1080p_202602161748_"
                mode="scroll"
                scrollProgress={frameProgress}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Bottom fade so it blends into content below */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
        </motion.div>
    )
}

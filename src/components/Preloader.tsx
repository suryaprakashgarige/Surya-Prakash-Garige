'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [isOn, setIsOn] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    const handleToggle = useCallback(() => {
        if (isOn) return
        setIsOn(true)
        // After the "power on" animation, dismiss the preloader
        setTimeout(() => setIsExiting(true), 1200)
    }, [isOn])

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
                    style={{ background: 'radial-gradient(ellipse at center, #0a0f1c 0%, #050508 100%)' }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: 'blur(10px)',
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    }}
                >
                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Status text */}
                    <motion.p
                        className="text-xs font-mono uppercase tracking-[0.4em] mb-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            color: isOn ? '#4ade80' : '#6b7280',
                        }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {isOn ? 'System Online' : 'System Offline'}
                    </motion.p>

                    {/* Power Switch */}
                    <motion.button
                        onClick={handleToggle}
                        className="relative w-20 h-36 rounded-2xl cursor-pointer focus:outline-none group"
                        style={{
                            background: 'linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)',
                            boxShadow: isOn
                                ? '0 0 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                                : 'inset 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Power switch"
                    >
                        {/* Switch track background */}
                        <div className="absolute inset-2 rounded-xl overflow-hidden">
                            {/* Glow when ON */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    background: isOn
                                        ? 'linear-gradient(180deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)'
                                        : 'transparent',
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* The toggle knob */}
                        <motion.div
                            className="absolute left-3 right-3 h-14 rounded-xl"
                            style={{
                                boxShadow: isOn
                                    ? '0 4px 20px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2)'
                                    : '0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                            }}
                            animate={{
                                y: isOn ? 6 : 68,
                                background: isOn
                                    ? 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)'
                                    : 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)',
                            }}
                            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                        >
                            {/* Knob line detail */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-[2px] rounded-full bg-white/30" />
                            </div>
                        </motion.div>
                    </motion.button>

                    {/* Instruction text */}
                    <motion.p
                        className="text-xs font-mono uppercase tracking-[0.3em] mt-10"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isOn ? 0 : 0.4,
                        }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        Engage Master Power to Access Portfolio
                    </motion.p>

                    {/* Power on flash effect */}
                    <AnimatePresence>
                        {isOn && (
                            <motion.div
                                className="absolute inset-0 bg-accent/10 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.3, 0] }}
                                transition={{ duration: 0.6, times: [0, 0.3, 1] }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Loading bar after power on */}
                    {isOn && (
                        <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-accent"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

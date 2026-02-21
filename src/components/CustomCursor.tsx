'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [rotation, setRotation] = useState(-90)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const prevPos = useRef({ x: -100, y: -100 })
    const speedRef = useRef(0)

    const mouseRef = useRef({ x: -100, y: -100, angle: -90 })

    const springConfig = { damping: 20, stiffness: 250, mass: 0.4 }
    const aircraftX = useSpring(cursorX, springConfig)
    const aircraftY = useSpring(cursorY, springConfig)
    const smoothRotation = useSpring(rotation, { damping: 30, stiffness: 200 })

    // Audio Engine variables
    const audioCtxRef = useRef<AudioContext | null>(null)
    const filterNodeRef = useRef<BiquadFilterNode | null>(null)
    const oscRef = useRef<OscillatorNode | null>(null)
    const masterGainRef = useRef<GainNode | null>(null)

    // Init Engine Sound
    useEffect(() => {
        const initAudio = () => {
            if (audioCtxRef.current) return
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext
            if (!AudioContext) return
            const ctx = new AudioContext()
            audioCtxRef.current = ctx

            // 1. Noise Generator (Rumble)
            const bufferSize = ctx.sampleRate * 2
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)
            let lastOut = 0
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1
                data[i] = (lastOut + 0.05 * white) / 1.05
                lastOut = data[i]
                data[i] *= 4
            }

            const noiseSource = ctx.createBufferSource()
            noiseSource.buffer = buffer
            noiseSource.loop = true

            const filter = ctx.createBiquadFilter()
            filter.type = 'lowpass'
            filter.frequency.value = 100 // Idle hum
            filter.Q.value = 1

            const noiseGain = ctx.createGain()
            noiseGain.gain.value = 0.5 // Noise mix level

            noiseSource.connect(filter)
            filter.connect(noiseGain)

            // 2. Oscillator (Jet Whine)
            const osc = ctx.createOscillator()
            osc.type = 'sawtooth'
            osc.frequency.value = 150 // Idle whine

            const oscFilter = ctx.createBiquadFilter()
            oscFilter.type = 'highpass'
            oscFilter.frequency.value = 500

            const oscGain = ctx.createGain()
            oscGain.gain.value = 0.12 // Whine mix level

            osc.connect(oscFilter)
            oscFilter.connect(oscGain)

            // 3. Master Mix
            const masterGain = ctx.createGain()
            masterGain.gain.value = 0 // Muted before interaction

            noiseGain.connect(masterGain)
            oscGain.connect(masterGain)
            masterGain.connect(ctx.destination)

            noiseSource.start()
            osc.start()

            filterNodeRef.current = filter
            oscRef.current = osc
            masterGainRef.current = masterGain

            masterGain.gain.setTargetAtTime(0.1, ctx.currentTime, 0.5) // Ambient idle volume
        }

        const handleInteract = () => {
            initAudio()
            if (audioCtxRef.current?.state === 'suspended') {
                audioCtxRef.current.resume()
            }
        }

        // Initialize on first interaction to bypass autoplay restrictions
        window.addEventListener('click', handleInteract)
        window.addEventListener('mousemove', handleInteract, { once: true })
        window.addEventListener('keydown', handleInteract, { once: true })
        window.addEventListener('touchstart', handleInteract, { once: true })

        return () => {
            window.removeEventListener('click', handleInteract)
            window.removeEventListener('mousemove', handleInteract)
            window.removeEventListener('keydown', handleInteract)
            window.removeEventListener('touchstart', handleInteract)
            if (audioCtxRef.current?.state !== 'closed') {
                audioCtxRef.current?.close().catch(() => { })
            }
        }
    }, [])

    // Speed decay and sound update loop
    useEffect(() => {
        let frameId: number

        const updatePhysicsAndSound = () => {
            // Decay speed when mouse not moving
            speedRef.current *= 0.90

            // Only update if context is running properly
            if (audioCtxRef.current?.state === 'running' && masterGainRef.current && filterNodeRef.current && oscRef.current) {
                const speed = speedRef.current

                // Increase volume from 0.1 to 0.7 based on speed
                const targetGain = Math.min(0.7, 0.1 + speed * 0.012)

                // Open lowpass filter for rumbling roar as you move
                const targetFreq = Math.min(2500, 100 + speed * 60)

                // Increase the pitch of the whine
                const targetPitch = Math.min(700, 150 + speed * 15)

                const ctx = audioCtxRef.current
                const currentTime = ctx.currentTime

                // Smoothly transition values to avoid clicks
                masterGainRef.current.gain.setTargetAtTime(targetGain, currentTime, 0.1)
                filterNodeRef.current.frequency.setTargetAtTime(targetFreq, currentTime, 0.1)
                oscRef.current.frequency.setTargetAtTime(targetPitch, currentTime, 0.1)
            }

            frameId = requestAnimationFrame(updatePhysicsAndSound)
        }

        frameId = requestAnimationFrame(updatePhysicsAndSound)
        return () => cancelAnimationFrame(frameId)
    }, [])

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouchDevice) {
            setIsHidden(true)
            return
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            const dx = e.clientX - prevPos.current.x
            const dy = e.clientY - prevPos.current.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            speedRef.current = distance // update speed

            if (distance > 3) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI)
                setRotation(angle)
                smoothRotation.set(angle)
                mouseRef.current.angle = angle
            }

            mouseRef.current.x = e.clientX
            mouseRef.current.y = e.clientY

            prevPos.current = { x: e.clientX, y: e.clientY }
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                window.getComputedStyle(target).cursor === 'pointer'
            setIsPointer(!!isClickable)
        }

        const handleMouseLeave = () => setIsHidden(true)
        const handleMouseEnter = () => setIsHidden(false)

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', handleMouseOver)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleMouseOver)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [cursorX, cursorY, smoothRotation])

    if (isHidden) return null

    return (
        <>
            {/* 2D Aircraft cursor */}
            <motion.div
                className="fixed top-0 left-0 z-[10000] pointer-events-none"
                style={{
                    x: aircraftX,
                    y: aircraftY,
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: smoothRotation,
                }}
            >
                <motion.div
                    animate={{
                        scale: isPointer ? 1.3 : 1,
                        filter: isPointer ? 'drop-shadow(0 0 8px rgba(59,130,246,0.6))' : 'drop-shadow(0 0 4px rgba(255,255,255,0.2))',
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    <svg
                        width={isPointer ? "36" : "28"}
                        height={isPointer ? "36" : "28"}
                        viewBox="0 0 64 74"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-all duration-200"
                    >
                        {/* Fuselage */}
                        <path
                            d="M32 4 L36 20 L36 44 L34 56 L32 60 L30 56 L28 44 L28 20 Z"
                            fill="white"
                            fillOpacity="0.9"
                        />
                        {/* Main Wings */}
                        <path d="M28 24 L8 36 L10 38 L28 32 Z" fill="white" fillOpacity="0.75" />
                        <path d="M36 24 L56 36 L54 38 L36 32 Z" fill="white" fillOpacity="0.75" />
                        {/* Tail Wings */}
                        <path d="M29 46 L20 54 L22 56 L30 50 Z" fill="white" fillOpacity="0.6" />
                        <path d="M35 46 L44 54 L42 56 L34 50 Z" fill="white" fillOpacity="0.6" />
                        {/* Cockpit */}
                        <ellipse cx="32" cy="14" rx="2" ry="4" fill="#3b82f6" fillOpacity="0.8" />
                        {/* Engine nozzle */}
                        <ellipse cx="32" cy="57" rx="2.5" ry="2" fill="#1e3a5f" fillOpacity="0.9" />

                        {/* Afterburner thrust */}
                        <ellipse cx="32" cy="64" rx="4" ry="8" fill="url(#thrustGlow)" fillOpacity="0.4">
                            <animate attributeName="ry" values="8;10;7;9;8" dur="0.3s" repeatCount="indefinite" />
                            <animate attributeName="fillOpacity" values="0.4;0.6;0.3;0.5;0.4" dur="0.25s" repeatCount="indefinite" />
                        </ellipse>
                        <ellipse cx="32" cy="63" rx="2.5" ry="6" fill="url(#thrustMid)" fillOpacity="0.7">
                            <animate attributeName="ry" values="6;8;5;7;6" dur="0.2s" repeatCount="indefinite" />
                        </ellipse>
                        <ellipse cx="32" cy="61" rx="1.5" ry="4" fill="#93c5fd" fillOpacity="0.9">
                            <animate attributeName="ry" values="4;5;3;4.5;4" dur="0.15s" repeatCount="indefinite" />
                            <animate attributeName="fillOpacity" values="0.9;1;0.7;0.9" dur="0.2s" repeatCount="indefinite" />
                        </ellipse>

                        <defs>
                            <radialGradient id="thrustGlow" cx="50%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="thrustMid" cx="50%" cy="20%" r="60%">
                                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                            </radialGradient>
                        </defs>
                    </svg>
                </motion.div>
            </motion.div>
        </>
    )
}

'use client'

import React, { useRef, useEffect, useState } from 'react'
import { MotionValue, useScroll, useMotionValueEvent } from 'framer-motion'

interface FrameSequenceProps {
    frameCount: number
    fps?: number
    basePath: string
    extension?: string
    digitCount?: number
    mode?: 'time' | 'scroll'
    className?: string
    /** Pass a custom scrollYProgress MotionValue to drive the animation */
    scrollProgress?: MotionValue<number>
}

export default function FrameSequence({
    frameCount,
    fps = 24,
    basePath,
    extension = '.jpg',
    digitCount = 3,
    mode = 'scroll',
    className = "absolute inset-0 w-full h-full object-cover z-0",
    scrollProgress: externalProgress,
}: FrameSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [imagesLoaded, setImagesLoaded] = useState(0)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const frameIndexRef = useRef(0)
    const lastFrameTimeRef = useRef(0)
    const requestIdRef = useRef<number>(0)

    // Fallback to global scroll if no external progress provided
    const { scrollYProgress: globalProgress } = useScroll()
    const scrollYProgress = externalProgress ?? globalProgress

    // Preload images
    useEffect(() => {
        if (imagesRef.current.length === frameCount) {
            setImagesLoaded(frameCount)
            return
        }

        let loadedCount = 0
        const images: HTMLImageElement[] = []

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            const paddedIndex = String(i).padStart(digitCount, '0')
            img.src = `${basePath}${paddedIndex}${extension}`

            const handleLoad = () => {
                loadedCount++
                setImagesLoaded(prev => prev + 1)
            }

            img.onload = handleLoad
            img.onerror = () => {
                console.warn(`Failed to load frame: ${i}`)
                handleLoad()
            }

            images.push(img)
        }
        imagesRef.current = images

        return () => {
            images.forEach(img => {
                img.onload = null
                img.onerror = null
            })
        }
    }, [basePath, digitCount, extension, frameCount])

    // Draw Function
    const drawFrame = (index: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = imagesRef.current[index]
        if (!img || !img.complete) return

        const canvasAspect = canvas.width / canvas.height
        const imgAspect = img.width / img.height

        let drawWidth, drawHeight, offsetX, offsetY

        if (canvasAspect > imgAspect) {
            drawWidth = canvas.width
            drawHeight = canvas.width / imgAspect
            offsetX = 0
            offsetY = (canvas.height - drawHeight) / 2
        } else {
            drawHeight = canvas.height
            drawWidth = canvas.height * imgAspect
            offsetX = (canvas.width - drawWidth) / 2
            offsetY = 0
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight
                drawFrame(frameIndexRef.current)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Time-based Animation
    useEffect(() => {
        if (mode !== 'time') return
        if (imagesLoaded < frameCount) return

        const animate = (time: number) => {
            if (time - lastFrameTimeRef.current > 1000 / fps) {
                drawFrame(frameIndexRef.current)
                frameIndexRef.current = (frameIndexRef.current + 1) % frameCount
                lastFrameTimeRef.current = time
            }
            requestIdRef.current = requestAnimationFrame(animate)
        }

        requestIdRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestIdRef.current)
    }, [mode, fps, frameCount, imagesLoaded])

    // Scroll-based Animation
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (mode !== 'scroll') return
        if (imagesLoaded < frameCount) return

        const totalFrames = frameCount - 1
        const targetFrame = Math.floor(latest * totalFrames)
        const clampedFrame = Math.max(0, Math.min(targetFrame, totalFrames))

        if (clampedFrame !== frameIndexRef.current) {
            frameIndexRef.current = clampedFrame
            const img = imagesRef.current[clampedFrame]
            if (img && img.complete && img.naturalWidth > 0) {
                drawFrame(clampedFrame)
            }
        }
    })

    // Initial Draw
    useEffect(() => {
        const timer = setTimeout(() => { drawFrame(0) }, 100)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (imagesLoaded > 0) {
            drawFrame(frameIndexRef.current)
        }
    }, [imagesLoaded])

    return (
        <canvas
            ref={canvasRef}
            className={className}
        />
    )
}

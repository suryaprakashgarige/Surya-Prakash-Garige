'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const STATS = [
    { value: '7+', label: 'Projects Built' },
    { value: '8+', label: 'Technologies' },
    { value: '2+', label: 'Years Coding' },
    { value: '∞', label: 'Curiosity' },
]

const CHAPTERS = [
    {
        number: '01',
        title: 'Origin',
        text: 'I am a second-year Aeronautical Engineering student with a passion for flight dynamics and digital creation. My journey began with simple code and CAD models, evolving into full-stack development and AI integration.',
    },
    {
        number: '02',
        title: 'Building Now',
        text: 'Currently exploring the intersection of aerodynamics and AI. I\'m building tools like NeuralFoil integration for drag prediction and developing voice cloning AI for content creators. I leverage the power of modern frameworks to speed up my workflows.',
    },
    {
        number: '03',
        title: 'Trajectory',
        text: 'My goal is to design cinematic web experiences that feel as precise and aerodynamic as the aircraft I study. I aim to merge engineering discipline with creative freedom, building products that inspire.',
    },
]

function AnimatedWord({ text, className }: { text: string; className?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

    const words = text.split(' ')

    return (
        <motion.p
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.02 }}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: '110%', opacity: 0, rotateX: -45 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                rotateX: 0,
                                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                            },
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.p>
    )
}

function StatCounter({ value, label, index }: { value: string; label: string; index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <motion.div
            ref={ref}
            className="text-center relative group"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.05 }}
        >
            <motion.div 
                className="text-4xl md:text-5xl font-display font-light text-foreground mb-2 tracking-tight"
                initial={{ filter: 'blur(10px)' }}
                animate={isInView ? { filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, delay: index * 0.12 + 0.2 }}
                whileHover={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
            >
                {value}
            </motion.div>
            <div className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">{label}</div>
            {/* Enhanced glow on hover */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-lg -z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
        </motion.div>
    )
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const meshX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
    const meshOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3])

    return (
        <section id="about" ref={sectionRef} className="relative min-h-screen w-full bg-background text-foreground py-28 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
            {/* Background mesh gradient with enhanced parallax and animation */}
            <motion.div
                className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[180px] pointer-events-none"
                style={{ x: meshX, opacity: meshOpacity }}
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"
                style={{ x: useTransform(scrollYProgress, [0, 1], ['30%', '-30%']) }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="max-w-7xl mx-auto">
                {/* Header with refined typography */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24">
                    <div>
                        <motion.span
                            className="block text-[11px] font-mono text-accent uppercase tracking-[0.35em] mb-5"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            About Me
                        </motion.span>
                        <motion.h2
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-[-0.03em] leading-[0.9]"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Aeronautical<br />
                            Engineer &<br />
                            <span className="italic text-gradient">Digital Creator</span>
                        </motion.h2>
                    </div>

                    {/* Stats Row with elegant spacing */}
                    <div className="flex gap-10 md:gap-14">
                        {STATS.map((stat, i) => (
                            <StatCounter key={stat.label} {...stat} index={i} />
                        ))}
                    </div>
                </div>

                {/* Story Chapters */}
                <div className="grid md:grid-cols-2 gap-x-20 gap-y-24">
                    {/* Left — visual placeholder with enhanced styling */}
                    <motion.div
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-subtle border border-border/50 hidden md:block group"
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-background/80" />
                        
                        {/* Animated accent corner */}
                        <motion.div
                            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/20 to-transparent"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Status card */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <motion.div 
                                className="glass rounded-xl p-5 border border-accent/10"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-accent"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <div className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Status</div>
                                </div>
                                <div className="text-sm text-foreground/90 font-light leading-relaxed">Building the future of flight & code</div>
                            </motion.div>
                        </div>

                        {/* Grid pattern */}
                        <div className="absolute inset-0 opacity-[0.04]" style={{
                            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                        }} />

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </motion.div>

                    {/* Right — chapters with enhanced animations */}
                    <div className="flex flex-col gap-20 md:gap-24 md:py-12">
                        {CHAPTERS.map((chapter, idx) => (
                            <motion.div 
                                key={chapter.number} 
                                className="space-y-5 group"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-accent font-mono text-xs tracking-wider">{chapter.number}</span>
                                    <motion.span 
                                        className="h-[1px] w-10 bg-accent/50"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: idx * 0.15 + 0.2 }}
                                        style={{ originX: 0 }}
                                    />
                                    <span className="text-[10px] font-mono text-muted/70 uppercase tracking-[0.2em]">{chapter.title}</span>
                                </div>
                                <AnimatedWord
                                    text={chapter.text}
                                    className="text-xl md:text-2xl font-light leading-[1.7] text-foreground/75 tracking-wide"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

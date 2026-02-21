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
    const isInView = useInView(ref, { once: true, margin: '-5% 0px -5% 0px' })

    const words = text.split(' ')

    return (
        <motion.p
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.03 }}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: '100%', opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">{value}</div>
            <div className="text-xs font-mono text-muted uppercase tracking-widest">{label}</div>
        </motion.div>
    )
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const meshX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

    return (
        <section id="about" ref={sectionRef} className="relative min-h-screen w-full bg-background text-foreground py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
            {/* Background mesh gradient */}
            <motion.div
                className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"
                style={{ x: meshX }}
            />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
                    <div>
                        <motion.span
                            className="block text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            About Me
                        </motion.span>
                        <motion.h2
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[0.95]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Aeronautical<br />
                            Engineer &<br />
                            <span className="italic text-accent">Digital Creator</span>
                        </motion.h2>
                    </div>

                    {/* Stats Row */}
                    <div className="flex gap-8 md:gap-12">
                        {STATS.map((stat, i) => (
                            <StatCounter key={stat.label} {...stat} index={i} />
                        ))}
                    </div>
                </div>

                {/* Story Chapters */}
                <div className="grid md:grid-cols-2 gap-x-24 gap-y-20">
                    {/* Left — visual placeholder */}
                    <motion.div
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-subtle border border-border hidden md:block"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-warm/5" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="glass rounded-xl p-4">
                                <div className="text-xs font-mono text-muted uppercase tracking-widest mb-1">Status</div>
                                <div className="text-sm text-foreground font-medium">Building the future of flight & code</div>
                            </div>
                        </div>
                        {/* Grid pattern */}
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }} />
                    </motion.div>

                    {/* Right — chapters */}
                    <div className="flex flex-col gap-16 md:gap-20 md:py-12">
                        {CHAPTERS.map((chapter) => (
                            <div key={chapter.number} className="space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-accent font-mono text-sm">{chapter.number}</span>
                                    <span className="h-[1px] w-8 bg-border" />
                                    <span className="text-xs font-mono text-muted uppercase tracking-widest">{chapter.title}</span>
                                </div>
                                <AnimatedWord
                                    text={chapter.text}
                                    className="text-xl md:text-2xl font-light leading-relaxed text-foreground/80"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

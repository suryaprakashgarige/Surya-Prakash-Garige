'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { ArrowDown, Github, Mail, Linkedin, Zap } from 'lucide-react'
import dynamic from 'next/dynamic'
import MagneticButton from '@/components/MagneticButton'

const ParticleOrb = dynamic(() => import('@/components/3d/ParticleOrb'), { ssr: false })

/* ─── Animation Variants ─── */
const charVariants: Variants = {
    hidden: { y: '110%', rotateX: -80, opacity: 0 },
    visible: (i: number) => ({
        y: '0%',
        rotateX: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            delay: 1.8 + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    }),
}

function SplitName({ text, className }: { text: string; className?: string }) {
    return (
        <span className={className} style={{ perspective: '600px' }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    variants={charVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    style={{ transformOrigin: 'bottom', display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}

/* ─── Floating stat badge ─── */
function StatBadge({
    value,
    label,
    delay,
    className,
}: {
    value: string
    label: string
    delay: number
    className?: string
}) {
    return (
        <motion.div
            className={`hidden lg:flex flex-col items-center justify-center px-5 py-3 glass rounded-2xl border border-white/8 pointer-events-none ${className}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <span className="text-2xl font-display font-bold text-foreground leading-none">{value}</span>
            <span className="text-[9px] font-mono text-muted uppercase tracking-[0.2em] mt-1">{label}</span>
        </motion.div>
    )
}

/* ─── Hero ─── */
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
    const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])
    const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

    return (
        <section
            ref={sectionRef}
            className="relative h-[180vh] w-full flex flex-col items-center justify-center overflow-hidden"
        >
            {/* ── Layered background ── */}
            <div className="absolute inset-0 bg-background/20 z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-0 pointer-events-none" />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 z-0 pointer-events-none hero-grid"
                aria-hidden="true"
            />

            {/* Ambient glow blobs */}
            <motion.div
                className="absolute top-[15%] left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-[20%] right-[8%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* ── 3D Particle Orb — centered background ── */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none"
                style={{ scale: orbScale, y: orbY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, delay: 1.2 }}
            >
                <div className="w-[700px] h-[700px] sm:w-[800px] sm:h-[800px] opacity-60">
                    <ParticleOrb />
                </div>
            </motion.div>

            {/* ── Floating stat badges ── */}
            <StatBadge
                value="7+"
                label="Projects"
                delay={4.0}
                className="absolute top-[28%] right-[12%] z-20"
            />
            <StatBadge
                value="2+"
                label="Years Coding"
                delay={4.2}
                className="absolute bottom-[35%] left-[8%] z-20"
            />
            <StatBadge
                value="8+"
                label="Technologies"
                delay={4.4}
                className="absolute top-[38%] left-[6%] z-20"
            />

            {/* ── Main content ── */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                style={{ y: textY, opacity: textOpacity }}
            >
                {/* Eyebrow pill */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md mb-8 shadow-[0_0_20px_-4px_var(--accent-glow)]"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                >
                    <Zap className="w-3 h-3 text-accent" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-mono text-accent/80 uppercase tracking-[0.25em]">
                        Aeronautical Engineer · Digital Creator
                    </span>
                </motion.div>

                {/* Name — letter-by-letter animation */}
                <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] font-display font-bold tracking-[-0.03em] leading-[0.9] mb-6">
                    <span className="block overflow-hidden">
                        <SplitName text="Surya Prakash" />
                    </span>
                    <span className="block overflow-hidden mt-2">
                        <SplitName text="Garige" className="text-gradient glow-text" />
                    </span>
                </h1>

                {/* Tagline */}
                <motion.p
                    className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2.8}
                >
                    Designing cinematic web experiences, AI tools, and aerospace-inspired
                    digital products as a solo creator.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3.2}
                >
                    {/* Primary CTA — magnetic + glow */}
                    <MagneticButton strength={0.4}>
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="group relative px-8 py-3.5 bg-accent text-white font-semibold rounded-full overflow-hidden hover:scale-[1.04] active:scale-[0.97] transition-transform duration-300 shadow-[0_0_30px_-6px_var(--accent)] hover:shadow-[0_0_50px_-4px_var(--accent)]"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide">
                                View Work
                                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-accent-hover transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </a>
                    </MagneticButton>

                    {/* Secondary CTA — ghost */}
                    <MagneticButton strength={0.35}>
                        <a
                            href="#about"
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="group relative px-8 py-3.5 bg-transparent border border-white/15 text-foreground font-medium rounded-full backdrop-blur-sm hover:border-accent/40 hover:bg-accent/5 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 text-sm tracking-wide"
                        >
                            About Me
                        </a>
                    </MagneticButton>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {[
                            { icon: Github, href: 'https://github.com/suryaprakashgarige-28', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/surya-prakash-garige/', label: 'LinkedIn' },
                            { icon: Mail, href: 'mailto:suryaprakashgarige009@gmail.com', label: 'Email' },
                        ].map(({ icon: Icon, href, label }) => (
                            <MagneticButton key={label} strength={0.5}>
                                <a
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    aria-label={label}
                                    className="p-3 rounded-full border border-white/10 hover:border-accent/50 hover:bg-accent/8 hover:shadow-[0_0_20px_-4px_var(--accent-glow)] text-muted hover:text-accent transition-all duration-300 backdrop-blur-sm block"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            </MagneticButton>
                        ))}
                    </div>
                </motion.div>

                {/* Live status indicator */}
                <motion.div
                    className="mt-12 inline-flex items-center gap-2 text-[10px] font-mono text-muted/60 uppercase tracking-[0.3em]"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3.8}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_1px_rgba(52,211,153,0.6)]" />
                    Available for work · Open to collaborate
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.0, duration: 1 }}
            >
                <span className="text-[10px] font-mono text-muted uppercase tracking-[0.3em]">Scroll</span>
                <motion.div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
                    <motion.div
                        className="w-1 h-1.5 rounded-full bg-accent"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}

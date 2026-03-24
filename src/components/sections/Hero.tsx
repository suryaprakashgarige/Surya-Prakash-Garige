'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { ArrowDown, Github, Mail, Linkedin } from 'lucide-react'

/* ─── Premium Animation Variants ─── */
const charVariants: Variants = {
    hidden: { y: '120%', rotateX: -90, opacity: 0 },
    visible: (i: number) => ({
        y: '0%',
        rotateX: 0,
        opacity: 1,
        transition: {
            duration: 1,
            delay: 1.8 + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
    }),
}

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 3.2,
        },
    },
}

const socialItem: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

function SplitName({ text, className }: { text: string; className?: string }) {
    return (
        <span className={className} style={{ perspective: '1200px' }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    variants={charVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    style={{ 
                        transformOrigin: 'bottom center',
                        display: char === ' ' ? 'inline' : 'inline-block',
                    }}
                    whileHover={{ 
                        y: -2,
                        textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}

/* ─── Hero ─── */
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
    const blur = useTransform(scrollYProgress, [0, 0.6], [0, 10])

    return (
        <section
            ref={sectionRef}
            className="relative h-[180vh] w-full flex flex-col items-center justify-center"
        >
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-glow)_0%,_transparent_70%)] z-0 pointer-events-none opacity-50" />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-6xl mx-auto"
                style={{ 
                    y: textY, 
                    opacity: textOpacity,
                    scale,
                    filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
                }}
            >
                {/* Eyebrow with animated border */}
                <motion.div
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md mb-10"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                >
                    <motion.span
                        className="w-2 h-2 rounded-full bg-accent"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <span className="text-xs font-mono text-accent/90 uppercase tracking-[0.25em]">
                        Aeronautical Engineer & Digital Creator
                    </span>
                </motion.div>

                {/* Name with luxury typography */}
                <h1 className="text-5xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-display font-medium tracking-[-0.04em] leading-[0.85] mb-8 shimmer-effect">
                    <span className="block overflow-hidden">
                        <SplitName text="Surya Prakash" />
                    </span>
                    <span className="block overflow-hidden mt-2 md:mt-4">
                        <SplitName text="Garige" className="text-gradient-shimmer" />
                    </span>
                </h1>

                {/* Elegant divider */}
                <motion.div
                    className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Tagline */}
                <motion.p
                    className="text-lg md:text-xl text-muted max-w-xl mx-auto mb-14 font-light leading-relaxed tracking-wide"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2.8}
                >
                    Designing cinematic web experiences, AI tools, and aerospace-inspired
                    digital products with precision and artistry.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-5"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3.2}
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="group relative px-8 py-4 bg-accent text-background font-medium rounded-full overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-lg shadow-accent/20"
                    >
                        <span className="relative z-10 flex items-center gap-3 text-sm tracking-wider uppercase">
                            Explore Work
                            <motion.span
                                animate={{ y: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <ArrowDown className="w-4 h-4" />
                            </motion.span>
                        </span>
                        <div className="absolute inset-0 bg-accent-hover transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                    </a>

                    <motion.div
                        className="flex items-center gap-2"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {[
                            { icon: Github, href: 'https://github.com/suryaprakashgarige-28', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/surya-prakash-garige/', label: 'LinkedIn' },
                            { icon: Mail, href: 'mailto:suryaprakashgarige009@gmail.com', label: 'Email' },
                        ].map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={label}
                                variants={socialItem}
                                className="group p-3.5 rounded-full border border-border/50 hover:border-accent/40 bg-subtle/30 hover:bg-accent/10 text-muted hover:text-accent transition-all duration-500 backdrop-blur-sm"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[-8deg]" />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator with enhanced animation */}
            <motion.div
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="text-[10px] font-mono text-muted/70 uppercase tracking-[0.4em]">Scroll to Discover</span>
                <motion.div 
                    className="w-6 h-10 rounded-full border border-accent/30 flex items-start justify-center p-2 bg-accent/5 backdrop-blur-sm"
                >
                    <motion.div
                        className="w-1.5 h-2 rounded-full bg-accent"
                        animate={{ 
                            y: [0, 14, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Corner accents */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-accent/10 pointer-events-none" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-accent/10 pointer-events-none" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-accent/10 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-accent/10 pointer-events-none" />
        </section>
    )
}

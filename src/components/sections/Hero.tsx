'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { ArrowDown, Github, Mail, Linkedin } from 'lucide-react'

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

/* ─── Hero ─── */
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    return (
        <section
            ref={sectionRef}
            className="relative h-[180vh] w-full flex flex-col items-center justify-center"
        >
            {/* Very subtle overlay — lets the aircraft show through prominently */}
            <div className="absolute inset-0 bg-background/20 z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-0 pointer-events-none" />

            {/* Content — scrolls with parallax over the fixed aircraft */}
            <motion.div className="relative z-10 text-center px-6 max-w-6xl mx-auto" style={{ y: textY, opacity: textOpacity }}>
                {/* Eyebrow */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                >
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">
                        Aeronautical Engineer · Digital Creator
                    </span>
                </motion.div>

                {/* Name */}
                <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] font-display font-bold tracking-[-0.03em] leading-[0.9] mb-6">
                    <span className="block overflow-hidden">
                        <SplitName text="Surya Prakash" />
                    </span>
                    <span className="block overflow-hidden mt-2">
                        <SplitName text="Garige" className="text-gradient" />
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
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="group relative px-8 py-3.5 bg-foreground text-background font-semibold rounded-full overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide">
                            View Work
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                    </a>

                    <div className="flex items-center gap-3">
                        {[
                            { icon: Github, href: 'https://github.com/suryaprakashgarige-28', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/surya-prakash-garige/', label: 'LinkedIn' },
                            { icon: Mail, href: 'mailto:suryaprakashgarige009@gmail.com', label: 'Email' },
                        ].map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={label}
                                className="p-3 rounded-full border border-white/10 hover:border-accent/50 hover:bg-accent/5 text-muted hover:text-foreground transition-all duration-300 backdrop-blur-sm"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
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

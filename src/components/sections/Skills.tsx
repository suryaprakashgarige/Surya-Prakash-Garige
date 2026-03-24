'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_ROWS = [
    // Row 1 — scrolls right
    [
        { name: 'Next.js', level: 90 },
        { name: 'React', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Three.js', level: 75 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'GSAP', level: 70 },
        { name: 'Framer Motion', level: 85 },
        { name: 'Node.js', level: 75 },
    ],
    // Row 2 — scrolls left
    [
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'MATLAB', level: 80 },
        { name: 'Figma', level: 75 },
        { name: 'Docker', level: 60 },
        { name: 'Git', level: 85 },
        { name: 'AWS', level: 55 },
        { name: 'CAD / SolidWorks', level: 80 },
    ],
]

function MarqueeRow({
    skills,
    direction = 'left',
    speed = 25,
}: {
    skills: { name: string; level: number }[]
    direction?: 'left' | 'right'
    speed?: number
}) {
    // Duplicate the array for seamless loop
    const doubled = [...skills, ...skills, ...skills]

    return (
        <div className="relative overflow-hidden group py-2">
            <motion.div
                className="flex gap-5 w-fit"
                animate={{ x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'] }}
                transition={{
                    x: {
                        duration: speed,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                }}
                whileHover={{ animationPlayState: 'paused' }}
            >
                {doubled.map((skill, i) => (
                    <motion.div
                        key={`${skill.name}-${i}`}
                        className="group/card relative flex-shrink-0 flex items-center gap-5 px-7 py-5 bg-subtle/40 border border-border/50 rounded-2xl hover:border-accent/30 hover:bg-accent/5 transition-all duration-500 cursor-default overflow-hidden"
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Skill name */}
                        <span className="text-base font-medium text-foreground/90 whitespace-nowrap group-hover/card:text-accent transition-colors duration-300 tracking-wide">
                            {skill.name}
                        </span>

                        {/* Level bar with enhanced styling */}
                        <div className="relative w-20 h-1.5 bg-border/50 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-hover rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            />
                            {/* Enhanced glow effect with animation */}
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent-hover to-accent rounded-full blur-sm"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}
                            />
                        </div>

                        {/* Corner glow on hover with animation */}
                        <motion.div 
                            className="absolute -top-px -right-px w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rounded-tr-2xl"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                        
                        {/* Bottom accent line */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 h-[1px] bg-accent/50"
                            initial={{ width: 0, x: '-50%' }}
                            whileHover={{ width: '80%' }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section id="skills" ref={ref} className="relative py-28 md:py-40 bg-background overflow-hidden">
            {/* Background gradient elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <motion.span
                    className="block text-[11px] font-mono text-accent uppercase tracking-[0.35em] mb-5"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    Tech Stack
                </motion.span>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-[-0.03em]"
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Tools & <span className="italic text-gradient">Technologies</span>
                    </motion.h2>
                    <motion.p
                        className="text-muted text-sm font-light max-w-sm leading-relaxed tracking-wide"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        The instruments I use to turn ideas into production-grade digital products.
                    </motion.p>
                </div>

                {/* Elegant divider */}
                <motion.div
                    className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mt-12"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-5">
                <MarqueeRow skills={SKILL_ROWS[0]} direction="left" speed={35} />
                <MarqueeRow skills={SKILL_ROWS[1]} direction="right" speed={40} />
            </div>

            {/* Fade edges with gradient */}
            <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-1 h-20 bg-gradient-to-b from-accent/30 to-transparent" />
            <div className="absolute bottom-20 left-20 w-1 h-20 bg-gradient-to-t from-accent/30 to-transparent" />
        </section>
    )
}

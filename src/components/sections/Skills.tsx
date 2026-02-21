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
    const doubled = [...skills, ...skills]

    return (
        <div className="relative overflow-hidden group">
            <motion.div
                className="flex gap-4 w-fit"
                animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
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
                    <div
                        key={`${skill.name}-${i}`}
                        className="group/card relative flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-subtle/50 border border-border rounded-xl hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 cursor-default"
                    >
                        {/* Skill name */}
                        <span className="text-base font-medium text-foreground whitespace-nowrap group-hover/card:text-accent transition-colors">
                            {skill.name}
                        </span>

                        {/* Level bar */}
                        <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-accent rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </div>

                        {/* Corner glow */}
                        <div className="absolute -top-px -right-px w-12 h-12 bg-gradient-to-br from-accent/15 to-transparent rounded-tr-xl opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section id="skills" ref={ref} className="relative py-24 md:py-32 bg-background overflow-hidden">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <motion.span
                    className="block text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Tech Stack
                </motion.span>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <motion.h2
                        className="text-4xl md:text-6xl font-display font-bold tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Tools & Technologies
                    </motion.h2>
                    <motion.p
                        className="text-muted text-sm font-mono max-w-sm"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        The instruments I use to turn ideas into production-grade digital products.
                    </motion.p>
                </div>
            </div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-4">
                <MarqueeRow skills={SKILL_ROWS[0]} direction="left" speed={30} />
                <MarqueeRow skills={SKILL_ROWS[1]} direction="right" speed={35} />
            </div>

            {/* Fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </section>
    )
}

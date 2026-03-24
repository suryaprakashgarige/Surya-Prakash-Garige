'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/data/projects'
import { useRouter } from 'next/navigation'
import Matter from 'matter-js'

const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint, Events, Body } = Matter

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const sceneRef = useRef<HTMLDivElement>(null)
    const engineRef = useRef<Matter.Engine | null>(null)
    const renderRef = useRef<Matter.Render | null>(null)
    const runnerRef = useRef<Matter.Runner | null>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const bodiesRef = useRef<Matter.Body[]>([])
    const isInView = useInView(sectionRef, { once: true })
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const router = useRouter()

    const CARD_W = 320
    const CARD_H = 200

    // Initialize physics
    useEffect(() => {
        if (!sceneRef.current) return

        const el = sceneRef.current
        const w = el.clientWidth
        const h = el.clientHeight

        // Engine
        const engine = Engine.create({ gravity: { x: 0, y: 0.5 } })
        engineRef.current = engine

        // Invisible renderer — we only use DOM overlay
        const render = Render.create({
            element: el,
            engine,
            options: {
                width: w,
                height: h,
                wireframes: false,
                background: 'transparent',
                pixelRatio: 1,
            },
        })
        renderRef.current = render
        // Hide the canvas — we render with DOM
        render.canvas.style.position = 'absolute'
        render.canvas.style.opacity = '0'
        render.canvas.style.pointerEvents = 'none'

        // Walls
        const wallOpts = { isStatic: true, render: { visible: false } }
        const floor = Bodies.rectangle(w / 2, h + 25, w + 100, 50, wallOpts)
        const leftWall = Bodies.rectangle(-25, h / 2, 50, h * 2, wallOpts)
        const rightWall = Bodies.rectangle(w + 25, h / 2, 50, h * 2, wallOpts)
        const ceiling = Bodies.rectangle(w / 2, -25, w + 100, 50, wallOpts)
        World.add(engine.world, [floor, leftWall, rightWall, ceiling])

        // Project bodies
        const bodies: Matter.Body[] = projects.map((_, i) => {
            const cols = Math.min(projects.length, 3)
            const spacing = w / (cols + 1)
            const col = i % cols
            const row = Math.floor(i / cols)
            const x = spacing * (col + 1) + (Math.random() - 0.5) * 40
            const y = 80 + row * (CARD_H + 50)

            return Bodies.rectangle(x, y, CARD_W, CARD_H, {
                chamfer: { radius: 16 },
                restitution: 0.35,
                friction: 0.08,
                frictionAir: 0.025,
                density: 0.0015,
                render: { visible: false },
            })
        })
        bodiesRef.current = bodies
        World.add(engine.world, bodies)

        // Mouse interaction
        const mouse = Mouse.create(el)
        const mc = MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.25, render: { visible: false } },
        })
        World.add(engine.world, mc)

        // Click detection
        let dragStart = { x: 0, y: 0 }
        Events.on(mc, 'startdrag', (e: unknown) => {
            const ev = e as { body: Matter.Body }
            dragStart = { x: ev.body.position.x, y: ev.body.position.y }
        })
        Events.on(mc, 'enddrag', (e: unknown) => {
            const ev = e as { body: Matter.Body }
            const dx = Math.abs(ev.body.position.x - dragStart.x)
            const dy = Math.abs(ev.body.position.y - dragStart.y)
            if (dx < 5 && dy < 5) {
                const idx = bodies.indexOf(ev.body)
                if (idx >= 0) router.push(`/project/${projects[idx].id}`)
            }
        })

        // Sync DOM to physics with smooth interpolation
        const tick = () => {
            Engine.update(engine, 1000 / 60)
            bodies.forEach((body, i) => {
                const card = cardsRef.current[i]
                if (!card) return
                card.style.transform = `translate(${body.position.x - CARD_W / 2}px, ${body.position.y - CARD_H / 2}px) rotate(${body.angle}rad)`
            })
            requestAnimationFrame(tick)
        }
        const raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            Render.stop(render)
            World.clear(engine.world, false)
            Engine.clear(engine)
            render.canvas.remove()
        }
    }, [router])

    // Gentle nudge on hover
    const nudge = useCallback((index: number) => {
        const body = bodiesRef.current[index]
        if (body) Body.applyForce(body, body.position, { x: 0, y: -0.012 })
    }, [])

    return (
        <section id="projects" ref={sectionRef} className="relative h-screen w-full bg-background overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--accent-glow)_0%,_transparent_60%)] pointer-events-none opacity-60" />

            {/* Section Header (absolute, top-left) */}
            <div className="absolute top-10 left-10 z-20 pointer-events-none">
                <motion.span
                    className="block text-[11px] font-mono text-accent uppercase tracking-[0.35em] mb-3"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    Selected Work
                </motion.span>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[-0.03em]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    Projects
                </motion.h2>
            </div>

            {/* Hint */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 0.6, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <span className="text-[11px] font-mono text-muted uppercase tracking-[0.25em]">
                    Drag & Throw Cards ・ Click to Explore
                </span>
            </motion.div>

            {/* Physics Container */}
            <div
                ref={sceneRef}
                className="w-full h-full relative cursor-grab active:cursor-grabbing touch-none"
            >
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        ref={(el) => { cardsRef.current[i] = el }}
                        className="absolute top-0 left-0 will-change-transform select-none"
                        style={{ width: CARD_W, height: CARD_H, pointerEvents: 'none' }}
                        onMouseEnter={() => { setHoveredId(project.id); nudge(i) }}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <motion.div
                            className={`w-full h-full rounded-2xl border p-6 flex flex-col justify-between transition-all duration-500 ${
                                hoveredId === project.id
                                    ? 'bg-accent/10 border-accent/30 shadow-[0_0_50px_-10px_var(--accent)]'
                                    : 'bg-subtle/70 border-border/50 shadow-2xl shadow-black/30'
                            }`}
                            style={{ backdropFilter: 'blur(16px)' }}
                            animate={hoveredId === project.id ? { scale: 1.05, rotateZ: 0.5 } : { scale: 1, rotateZ: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Top row */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-display font-medium text-foreground leading-tight mb-2 tracking-tight">
                                        {project.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">
                                        {project.category}
                                    </span>
                                </div>
                                <motion.span 
                                    className="text-xs font-mono text-muted/40"
                                    animate={hoveredId === project.id ? { color: 'var(--accent)' } : {}}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </motion.span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[9px] px-3 py-1 bg-background/50 border border-border/40 rounded-full text-muted/80 uppercase tracking-[0.15em] transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Accent corner with enhanced animation */}
                            <motion.div 
                                className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/20 to-transparent rounded-tr-2xl`}
                                initial={{ opacity: 0 }}
                                animate={hoveredId === project.id ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Corner accents */}
            <div className="absolute top-10 right-10 w-20 h-20 border-r border-t border-accent/10 pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-l border-b border-accent/10 pointer-events-none" />
        </section>
    )
}

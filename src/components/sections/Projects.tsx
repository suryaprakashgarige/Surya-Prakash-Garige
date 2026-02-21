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

    const CARD_W = 300
    const CARD_H = 180

    // Initialize physics
    useEffect(() => {
        if (!sceneRef.current) return

        const el = sceneRef.current
        const w = el.clientWidth
        const h = el.clientHeight

        // Engine
        const engine = Engine.create({ gravity: { x: 0, y: 0.6 } })
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
            const y = 80 + row * (CARD_H + 40)

            return Bodies.rectangle(x, y, CARD_W, CARD_H, {
                chamfer: { radius: 12 },
                restitution: 0.4,
                friction: 0.1,
                frictionAir: 0.02,
                density: 0.002,
                render: { visible: false },
            })
        })
        bodiesRef.current = bodies
        World.add(engine.world, bodies)

        // Mouse interaction
        const mouse = Mouse.create(el)
        const mc = MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.3, render: { visible: false } },
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

        // Sync DOM to physics
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
        if (body) Body.applyForce(body, body.position, { x: 0, y: -0.015 })
    }, [])

    return (
        <section id="projects" ref={sectionRef} className="relative h-screen w-full bg-background overflow-hidden">
            {/* Section Header (absolute, top-left) */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                <motion.span
                    className="block text-xs font-mono text-accent uppercase tracking-[0.3em] mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Selected Work
                </motion.span>
                <motion.h2
                    className="text-4xl md:text-5xl font-display font-bold tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                    Projects
                </motion.h2>
            </div>

            {/* Hint */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : {}}
                transition={{ delay: 1.5 }}
            >
                <span className="text-xs font-mono text-muted uppercase tracking-widest">
                    Drag · Throw · Click to explore
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
                        <div
                            className={`w-full h-full rounded-xl border p-5 flex flex-col justify-between transition-all duration-300 ${hoveredId === project.id
                                ? 'bg-accent/10 border-accent/40 shadow-[0_0_30px_-5px_var(--accent)]'
                                : 'bg-subtle/80 border-border shadow-2xl'
                                }`}
                            style={{ backdropFilter: 'blur(12px)' }}
                        >
                            {/* Top row */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-display font-semibold text-foreground leading-tight mb-1">
                                        {project.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                                        {project.category}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-muted/50">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[9px] px-2 py-0.5 bg-background/40 border border-border/50 rounded-full text-muted uppercase tracking-wider"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

'use client'

import { projects } from '@/data/projects'
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ProjectDetail() {
    const { id } = useParams()
    const projectIndex = projects.findIndex((p) => p.id === id)
    const project = projects[projectIndex]

    if (!project) {
        return (
            <div className="h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-6xl font-display font-bold mb-4">404</h1>
                    <p className="text-muted mb-8">Project not found</p>
                    <Link href="/" className="text-accent hover:underline">
                        ← Back home
                    </Link>
                </div>
            </div>
        )
    }

    const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
    const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Back Navigation */}
            <motion.div
                className="fixed top-6 left-6 z-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Link
                    href="/#projects"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back
                </Link>
            </motion.div>

            {/* Hero */}
            <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 bg-subtle">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-warm/5" />
                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />

                <div className="relative z-20 max-w-5xl mx-auto px-6 pb-12 w-full">
                    <motion.span
                        className="inline-block text-xs font-mono text-accent uppercase tracking-[0.3em] mb-3"
                        {...fadeUp}
                    >
                        {project.category}
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {project.title}
                    </motion.h1>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                    {/* Main Content */}
                    <motion.div
                        className="md:col-span-2 space-y-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div>
                            <h3 className="text-xs font-mono text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <span className="w-6 h-[1px] bg-border" />
                                Overview
                            </h3>
                            <p className="text-lg leading-relaxed text-foreground/80">{project.description}</p>
                        </div>

                        {project.outcome && (
                            <div>
                                <h3 className="text-xs font-mono text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <span className="w-6 h-[1px] bg-border" />
                                    Outcome
                                </h3>
                                <p className="text-lg leading-relaxed text-foreground/80">{project.outcome}</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.aside
                        className="space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div>
                            <h3 className="text-xs font-mono text-muted uppercase tracking-[0.2em] mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 bg-subtle border border-border rounded-full text-xs text-muted"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.link && (
                            <div>
                                <h3 className="text-xs font-mono text-muted uppercase tracking-[0.2em] mb-4">Links</h3>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent hover:underline text-sm"
                                >
                                    View Live <ArrowUpRight className="w-3 h-3" />
                                </a>
                            </div>
                        )}
                    </motion.aside>
                </div>
            </section>

            {/* Prev / Next Navigation */}
            <section className="max-w-5xl mx-auto px-6 pb-16">
                <div className="border-t border-border pt-12 flex items-center justify-between">
                    {prevProject ? (
                        <Link
                            href={`/project/${prevProject.id}`}
                            className="group flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            <div>
                                <div className="text-xs font-mono uppercase tracking-widest text-muted">Previous</div>
                                <div className="text-sm font-medium">{prevProject.title}</div>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextProject ? (
                        <Link
                            href={`/project/${nextProject.id}`}
                            className="group flex items-center gap-3 text-right text-muted hover:text-foreground transition-colors"
                        >
                            <div>
                                <div className="text-xs font-mono uppercase tracking-widest text-muted">Next</div>
                                <div className="text-sm font-medium">{nextProject.title}</div>
                            </div>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </section>
        </main>
    )
}

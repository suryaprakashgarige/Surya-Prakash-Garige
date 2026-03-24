'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

const SOCIALS = [
    {
        name: 'GitHub',
        icon: Github,
        href: 'https://github.com/suryaprakashgarige-28',
        handle: '@suryaprakashgarige-28',
    },
    {
        name: 'LinkedIn',
        icon: Linkedin,
        href: 'https://www.linkedin.com/in/surya-prakash-garige/',
        handle: 'Surya Prakash Garige',
    },
    {
        name: 'Email',
        icon: Mail,
        href: 'mailto:suryaprakashgarige009@gmail.com',
        handle: 'suryaprakashgarige009@gmail.com',
    },
]

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission (replace with Formspree/EmailJS in production)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSubmitted(true)
        setIsSubmitting(false)
        setFormState({ name: '', email: '', message: '' })

        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <section id="contact" ref={ref} className="relative py-24 md:py-32 bg-background overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.span
                    className="block text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.span>
                <motion.h2
                    className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Let&apos;s Build Something<br />
                    <span className="text-gradient">Together</span>
                </motion.h2>

                {/* Split Layout */}
                <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                    {/* Left — Info + Socials */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-lg text-muted leading-relaxed max-w-md">
                            Open for collaborations on AI tools, aerospace projects, and creative
                            web experiences. Let&apos;s create something exceptional.
                        </p>

                        {/* Social Links */}
                        <div className="space-y-3 pt-4">
                            {SOCIALS.map((social, i) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group flex items-center justify-between py-4 border-b border-border hover:border-accent/30 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <social.icon className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
                                        <div>
                                            <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                                                {social.name}
                                            </div>
                                            <div className="text-xs text-muted">{social.handle}</div>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                                className="w-full bg-transparent border-b border-border p-3 text-foreground focus:outline-none focus:border-accent focus:border-b-2 transition-all duration-300 placeholder:text-muted/40"
                                placeholder="Your name"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                                className="w-full bg-transparent border-b border-border p-3 text-foreground focus:outline-none focus:border-accent focus:border-b-2 transition-all duration-300 placeholder:text-muted/40"
                                placeholder="your@email.com"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                value={formState.message}
                                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                                className="w-full bg-transparent border-b border-border p-3 text-foreground focus:outline-none focus:border-accent focus:border-b-2 transition-all duration-300 resize-none placeholder:text-muted/40"
                                placeholder="Tell me about your project..."
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full bg-foreground text-background font-semibold py-4 rounded-full flex items-center justify-center gap-2 overflow-hidden hover:scale-[1.02] active:scale-[0.97] transition-transform disabled:opacity-50 shadow-lg shadow-foreground/20 hover:shadow-accent/30"
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
                        >
                            <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide">
                                {submitted ? (
                                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>Message Sent ✓</motion.span>
                                ) : isSubmitting ? (
                                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block">Sending...</motion.span>
                                ) : (
                                    'Send Message'
                                )}
                                {!submitted && !isSubmitting && (
                                    <motion.div
                                        animate={{ y: [0, 2, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </motion.div>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </motion.button>
                    </motion.form>
                </div>

                {/* Footer */}
                <motion.footer
                    className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <span className="text-xs font-mono text-muted">
                        &copy; {new Date().getFullYear()} Surya Prakash Garige
                    </span>
                    <span className="text-xs text-muted">
                        Built with Next.js, Tailwind & Framer Motion
                    </span>
                </motion.footer>
            </div>
        </section>
    )
}

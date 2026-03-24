'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const NAV_ITEMS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true)
    const [activeSection, setActiveSection] = useState('')
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isAtTop, setIsAtTop] = useState(true)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsAtTop(latest < 50)
        if (latest > lastScrollY && latest > 100) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
        setLastScrollY(latest)
    })

    // Intersection observer for active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`)
                    }
                })
            },
            { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
        )

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center px-6 pt-6"
                >
                    <nav
                        className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-700 ease-out ${
                            isAtTop 
                                ? 'bg-transparent' 
                                : 'glass shadow-2xl shadow-black/20'
                        }`}
                    >
                        {/* Logo / Name */}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="relative px-5 py-2 text-sm font-display font-medium tracking-tight text-foreground hover:text-accent transition-colors duration-300 mr-4 group"
                        >
                            <span className="relative z-10">
                                SPG<span className="text-accent">.</span>
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-accent/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                layoutId="nav-hover-bg"
                            />
                        </a>

                        {/* Nav Items */}
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className="relative px-4 py-2 text-[13px] font-medium transition-all duration-300 group"
                            >
                                {activeSection === item.href && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-accent/10 rounded-full border border-accent/20"
                                        transition={{ 
                                            type: 'spring', 
                                            stiffness: 380, 
                                            damping: 32,
                                        }}
                                    />
                                )}
                                <span
                                    className={`relative z-10 transition-colors duration-300 ${
                                        activeSection === item.href 
                                            ? 'text-accent glow-text' 
                                            : 'text-muted hover:text-foreground hover:glow-text'
                                    }`}
                                >
                                    {item.label}
                                </span>
                                {/* Underline effect on hover */}
                                <motion.div
                                    className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-gradient-to-r from-accent/30 to-accent via-accent origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </a>
                        ))}

                        {/* CTA with enhanced styling */}
                        <motion.a
                            href="#contact"
                            onClick={(e) => handleClick(e, '#contact')}
                            className="relative ml-4 px-6 py-2.5 text-[13px] font-medium bg-accent text-background rounded-full overflow-hidden group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="relative z-10 tracking-wide">Let&apos;s Talk</span>
                            <motion.div
                                className="absolute inset-0 bg-accent-hover"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </motion.a>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    )
}

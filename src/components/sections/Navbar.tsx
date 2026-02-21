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
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center px-6 pt-6"
                >
                    <nav
                        className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${isAtTop ? 'bg-transparent' : 'glass'
                            }`}
                    >
                        {/* Logo / Name */}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="px-4 py-2 text-sm font-display font-bold tracking-tight text-foreground hover:text-accent transition-colors mr-4"
                        >
                            SPG<span className="text-accent">.</span>
                        </a>

                        {/* Nav Items */}
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className="relative px-4 py-2 text-sm font-medium transition-colors"
                            >
                                {activeSection === item.href && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-accent/10 rounded-full border border-accent/20"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span
                                    className={`relative z-10 ${activeSection === item.href ? 'text-accent' : 'text-muted hover:text-foreground'
                                        } transition-colors`}
                                >
                                    {item.label}
                                </span>
                            </a>
                        ))}

                        {/* CTA */}
                        <a
                            href="#contact"
                            onClick={(e) => handleClick(e, '#contact')}
                            className="ml-4 px-5 py-2 text-sm font-semibold bg-accent text-white rounded-full hover:bg-accent-hover transition-colors"
                        >
                            Let&apos;s Talk
                        </a>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    )
}

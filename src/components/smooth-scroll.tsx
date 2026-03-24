'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis 
            root 
            options={{ 
                lerp: 0.08, 
                duration: 1.8, 
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.2,
            }}
        >
            {children as any}
        </ReactLenis>
    )
}

export default SmoothScroll

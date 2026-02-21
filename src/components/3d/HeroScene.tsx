'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { NebulaMaterial } from './NebulaMaterial'
import { extend } from '@react-three/fiber'

extend({ NebulaMaterial })

function Scene() {
    const materialRef = useRef<any>(null)

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime()
            // Mouse interaction could be hooked up here
        }
    })

    return (
        <mesh scale={[10, 10, 1]}>
            <planeGeometry args={[1, 1]} />
            {/* @ts-ignore */}
            <nebulaMaterial ref={materialRef} />
        </mesh>
    )
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Scene />
            </Canvas>
        </div>
    )
}

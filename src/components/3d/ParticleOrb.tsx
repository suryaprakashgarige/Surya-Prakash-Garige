'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function OrbMesh() {
    const outerRef = useRef<THREE.Points>(null)
    const innerRef = useRef<THREE.Points>(null)
    const ringRef = useRef<THREE.Points>(null)

    const { outerPos, innerPos, ringPos } = useMemo(() => {
        // Outer sphere — sparse, large
        const OUTER = 500
        const outer = new Float32Array(OUTER * 3)
        for (let i = 0; i < OUTER; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 2.4 + (Math.random() - 0.5) * 0.35
            outer[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            outer[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            outer[i * 3 + 2] = r * Math.cos(phi)
        }

        // Inner sphere — denser, smaller
        const INNER = 250
        const inner = new Float32Array(INNER * 3)
        for (let i = 0; i < INNER; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 1.3 + (Math.random() - 0.5) * 0.3
            inner[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            inner[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            inner[i * 3 + 2] = r * Math.cos(phi)
        }

        // Equatorial ring
        const RING = 180
        const ring = new Float32Array(RING * 3)
        for (let i = 0; i < RING; i++) {
            const theta = (i / RING) * Math.PI * 2 + (Math.random() - 0.5) * 0.15
            const r = 2.8 + (Math.random() - 0.5) * 0.25
            const y = (Math.random() - 0.5) * 0.2
            ring[i * 3] = r * Math.cos(theta)
            ring[i * 3 + 1] = y
            ring[i * 3 + 2] = r * Math.sin(theta)
        }

        return { outerPos: outer, innerPos: inner, ringPos: ring }
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (outerRef.current) {
            outerRef.current.rotation.y = t * 0.08
            outerRef.current.rotation.x = Math.sin(t * 0.025) * 0.2
        }
        if (innerRef.current) {
            innerRef.current.rotation.y = -t * 0.12
            innerRef.current.rotation.z = t * 0.06
        }
        if (ringRef.current) {
            ringRef.current.rotation.y = t * 0.15
            ringRef.current.rotation.x = Math.cos(t * 0.03) * 0.1
        }
    })

    return (
        <group>
            {/* Outer sphere */}
            <points ref={outerRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[outerPos, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.028}
                    color="#3b82f6"
                    sizeAttenuation
                    transparent
                    opacity={0.7}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Inner sphere — warmer tint */}
            <points ref={innerRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[innerPos, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.022}
                    color="#60a5fa"
                    sizeAttenuation
                    transparent
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Equatorial ring */}
            <points ref={ringRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[ringPos, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.018}
                    color="#93c5fd"
                    sizeAttenuation
                    transparent
                    opacity={0.5}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Soft core glow sphere */}
            <mesh>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshBasicMaterial
                    color="#1d4ed8"
                    transparent
                    opacity={0.08}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    )
}

export default function ParticleOrb() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
        >
            <OrbMesh />
        </Canvas>
    )
}

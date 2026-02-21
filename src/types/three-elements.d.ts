import { Object3DNode } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

declare module '@react-three/fiber' {
    interface ThreeElements {
        nebulaMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial> & {
            uTime?: number
            uColor1?: THREE.Color
            uColor2?: THREE.Color
            uColor3?: THREE.Color
            uMouse?: THREE.Vector2
            uResolution?: THREE.Vector2
        }
    }
}

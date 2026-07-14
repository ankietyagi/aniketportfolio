import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../ThemeContext'

function MorphingBlob({ dark }: { dark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { viewport, mouse } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3

      const targetX = (mouse.x * viewport.width) / 2
      const targetY = (mouse.y * viewport.height) / 2
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05
    }
  })

  const color = dark ? '#1e1b4b' : '#fff7ed'
  const wireColor = dark ? '#818cf8' : '#ea580c'

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.4}
          clearcoat={0.8}
          clearcoatRoughness={0}
          metalness={0.1}
          roughness={0.4}
          distort={0.4}
          speed={2}
          wireframe={false}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh scale={1.05}>
        <sphereGeometry args={[2, 32, 32]} />
        <MeshDistortMaterial
          color={wireColor}
          wireframe
          distort={0.45}
          speed={2.2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function InteractiveWebGL() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={dark ? 0.5 : 1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color={dark ? '#818cf8' : '#f97316'} />
      <MorphingBlob dark={dark} />
      <Environment preset={dark ? "night" : "sunset"} />
    </Canvas>
  )
}

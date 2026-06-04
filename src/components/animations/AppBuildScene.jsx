import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import * as THREE from 'three'

const CODE_SNIPPETS = [
  'const app = React()',
  'npm install react-icons',
  '<Route path="/" />',
  'git commit -m "feat"',
  'docker build -t cilegonit .',
  'async/await Promise',
  'useState(true)',
  'SELECT * FROM clients',
  'def deploy_app():',
  'kubectl apply -f yaml',
  '{ key: "cilegon-it" }',
  'import { useState } from "react"',
]

function FloatingCodeLine({ text, position, speed, color, delay }) {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * speed + delay) * 0.3
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2 + delay) * 0.05
      ref.current.material.opacity = 0.4 + Math.sin(s.clock.elapsedTime * 0.7 + delay) * 0.4
    }
  })
  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.12}
      color={color}
      font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjOlCndg.woff2"
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.8}
    >
      {text}
    </Text>
  )
}

function StackLayer({ y, label, color, width = 2.4, height = 0.15 }) {
  const ref = useRef()
  const borderRef = useRef()

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.18
      ref.current.position.y = y + Math.sin(s.clock.elapsedTime * 0.4 + y) * 0.08
    }
    if (borderRef.current) {
      borderRef.current.material.emissiveIntensity = 1.0 + Math.sin(s.clock.elapsedTime * 1.5 + y) * 0.4
    }
  })
  return (
    <group ref={ref} position={[0, y, 0]}>
      {/* Plate border wireframe (highly metallic glowing edge) */}
      <Box ref={borderRef} args={[width, height, 1.4]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.05} transparent opacity={0.6} wireframe emissive={color} emissiveIntensity={1} />
      </Box>
      {/* Plate solid center (semi-transparent tinted glass) */}
      <Box args={[width - 0.05, height - 0.01, 1.35]}>
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.01} transparent opacity={0.25} />
      </Box>
      {/* Small node pins on corners */}
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh key={`${x}-${z}`} position={[x * (width / 2 - 0.05), height / 2 + 0.02, z * 0.65]}>
            <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={1.0} roughness={0.1} />
          </mesh>
        ))
      )}
    </group>
  )
}

function HologramTerminal() {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.1
    }
  })
  return (
    <group ref={ref} position={[0, -0.1, 0.2]}>
      {/* Outer dark glass terminal frame */}
      <Box args={[2.0, 1.3, 0.08]}>
        <meshStandardMaterial color="#0A0D14" metalness={0.95} roughness={0.02} transparent opacity={0.88} />
      </Box>
      {/* Screen metallic border */}
      <Box args={[2.04, 1.34, 0.02]} position={[0, 0, -0.04]}>
        <meshStandardMaterial color="#3B82F6" metalness={0.9} roughness={0.1} transparent opacity={0.5} wireframe />
      </Box>
      {/* Window Title Bar */}
      <Box args={[1.98, 0.14, 0.02]} position={[0, 0.54, 0.04]}>
        <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Red, Yellow, Green Window Dots */}
      {[-0.88, -0.78, -0.68].map((x, i) => (
        <mesh key={i} position={[x, 0.54, 0.065]}>
          <circleGeometry args={[0.03, 10]} />
          <meshStandardMaterial color={['#EF4444', '#F59E0B', '#10B981'][i]} emissive={['#EF4444', '#F59E0B', '#10B981'][i]} emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  )
}

export default function AppBuildScene() {
  const snippets = useMemo(() => CODE_SNIPPETS.map((text, i) => ({
    text,
    position: [
      (Math.random() - 0.5) * 3.4,
      (Math.random() - 0.5) * 3.2,
      (Math.random() - 0.5) * 1.2,
    ],
    speed: 0.6 + Math.random() * 0.7,
    color: ['#38BDF8', '#34D399', '#A78BFA', '#FBBF24'][i % 4],
    delay: Math.random() * Math.PI * 2,
  })), [])

  return (
    <>
      {/* Cyberpunk Studio Lighting */}
      <ambientLight intensity={0.35} />
      <pointLight position={[2, 3, 2]} intensity={2.0} color="#3B82F6" />
      <pointLight position={[-2, -2, -2]} intensity={1.5} color="#8B5CF6" />
      <pointLight position={[0, 0, 4]} intensity={1.2} color="#10B981" />

      {/* Hologram Terminal */}
      <HologramTerminal />

      {/* 3D Stack Architecture Layers */}
      <StackLayer y={-1.3} label="Database" color="#F87171" width={2.4} />
      <StackLayer y={-0.8} label="Backend" color="#FBBF24" width={2.1} />
      <StackLayer y={-0.3} label="API Service" color="#34D399" width={1.8} />
      <StackLayer y={0.2} label="Frontend UI" color="#60A5FA" width={1.5} />

      {/* Matrices of code text */}
      {snippets.map((s, i) => (
        <FloatingCodeLine key={i} {...s} />
      ))}
    </>
  )
}

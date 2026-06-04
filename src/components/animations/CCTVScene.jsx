import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Sphere, Box, Cone } from '@react-three/drei'
import * as THREE from 'three'

function CCTVCamera({ mouse }) {
  const groupRef = useRef()
  const headRef = useRef()
  const ledRef = useRef()

  useFrame((state) => {
    // Blinking status LED (red)
    if (ledRef.current) {
      ledRef.current.color = Math.sin(state.clock.elapsedTime * 6) > 0 ? new THREE.Color('#EF4444') : new THREE.Color('#333')
    }

    // Sweep rotation default, override on mouse interaction
    const isMouseActive = Math.abs(mouse.current[0]) > 0.01 || Math.abs(mouse.current[1]) > 0.01
    
    if (headRef.current) {
      let targetX = mouse.current[1] * 0.4
      let targetY = -mouse.current[0] * 0.6
      
      if (!isMouseActive) {
        // Automatic slow pan sweep
        targetX = -0.1 // Tilt slightly down
        targetY = Math.sin(state.clock.elapsedTime * 0.5) * 0.4 // Sweep left/right
      }

      headRef.current.rotation.x += (targetX - headRef.current.rotation.x) * 0.06
      headRef.current.rotation.y += (targetY - headRef.current.rotation.y) * 0.06
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.7, 0]}>
      {/* Wall mount bracket plate */}
      <Box args={[0.3, 0.4, 0.05]} position={[0, 0, -0.6]}>
        <meshStandardMaterial color="#888a90" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Mounting arm with joints */}
      <Cylinder args={[0.04, 0.04, 0.6, 12]} position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.15} />
      </Cylinder>
      <Sphere args={[0.07, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} />
      </Sphere>

      {/* Camera head assembly */}
      <group ref={headRef}>
        {/* Bullet camera main body cylinder */}
        <Cylinder args={[0.16, 0.16, 0.5, 16]} position={[0, -0.15, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#e5e7eb" metalness={0.8} roughness={0.2} />
        </Cylinder>

        {/* Sun shield visor cover */}
        <Cylinder args={[0.18, 0.18, 0.52, 16, 1, true]} position={[0, -0.06, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.1} side={THREE.DoubleSide} />
        </Cylinder>

        {/* Dark faceplate */}
        <Cylinder args={[0.14, 0.14, 0.02, 16]} position={[0, -0.15, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#0b0c10" metalness={0.4} roughness={0.05} />
        </Cylinder>

        {/* Infrared LED Ring around the lens (8 small red spots) */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * Math.PI) / 4
          const r = 0.08
          return (
            <mesh key={i} position={[Math.sin(angle) * r, -0.15 + Math.cos(angle) * r, 0.37]}>
              <sphereGeometry args={[0.012, 6, 6]} />
              <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
            </mesh>
          )
        })}

        {/* Glass lens core */}
        <Cylinder args={[0.045, 0.045, 0.02, 12]} position={[0, -0.15, 0.372]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1e293b" metalness={1.0} roughness={0.0} emissive="#0284c7" emissiveIntensity={0.6} />
        </Cylinder>

        {/* Blinking status light on the side */}
        <mesh position={[0.13, -0.05, 0.2]}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial ref={ledRef} color="#333" emissive="#ef4444" emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  )
}

function ScanBeam() {
  const beamRef = useRef()
  const lightRef = useRef()

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.4
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <group ref={beamRef} position={[0, 0.5, 0.2]}>
      {/* FOV Cone light beam */}
      <Cone args={[0.7, 2.8, 16, 1, true]} position={[0, -1.5, 0.25]} rotation={[0.1, 0, 0]}>
        <meshStandardMaterial
          color="#3B82F6"
          transparent
          opacity={0.07}
          side={THREE.DoubleSide}
          emissive="#3B82F6"
          emissiveIntensity={0.2}
        />
      </Cone>
      <spotLight ref={lightRef} position={[0, 0, 0]} target-position={[0, -3, 0]}
        angle={0.4} penumbra={0.6} intensity={1.5} color="#3B82F6" />
    </group>
  )
}

function ScanFloor() {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.material.opacity = 0.08 + Math.abs(Math.sin(s.clock.elapsedTime * 1.5)) * 0.12
    }
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <ringGeometry args={[0, 1.4, 32]} />
      <meshStandardMaterial color="#3B82F6" transparent opacity={0.1} emissive="#3B82F6" emissiveIntensity={0.3} />
    </mesh>
  )
}

function GridFloor() {
  return (
    <group position={[0, -2.0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#070B14" metalness={0.2} roughness={0.8} />
      </mesh>
      <gridHelper args={[8, 16, '#1E3A5F', '#0E1420']} />
    </group>
  )
}

export default function CCTVScene() {
  const mouse = useRef([0, 0])

  const handlePointerMove = (e) => {
    mouse.current = [e.clientX / window.innerWidth * 2 - 1, -(e.clientY / window.innerHeight * 2 - 1)]
  }

  return (
    <group onPointerMove={handlePointerMove}>
      {/* Premium Studio Lighting */}
      <ambientLight intensity={0.25} />
      <pointLight position={[2, 6, 2]} intensity={2.0} color="#FFFFFF" />
      <pointLight position={[-2, 1, 3]} intensity={1.2} color="#3B82F6" />
      <pointLight position={[3, -2, -1]} intensity={0.8} color="#8B5CF6" />

      <GridFloor />
      <CCTVCamera mouse={mouse} />
      <ScanBeam />
      <ScanFloor />
    </group>
  )
}

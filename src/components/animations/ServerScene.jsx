import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

function ServerUnit({ position, index }) {
  const ledRefs = useRef([])

  useFrame((s) => {
    ledRefs.current.forEach((led, i) => {
      if (led) {
        // Multi-frequency organic blinking pattern
        const blink = Math.sin(s.clock.elapsedTime * (3 + i * 0.9) + index * 1.5 + i * 0.4)
        led.material.emissiveIntensity = blink > 0.1 ? 2.5 : 0.08
      }
    })
  })

  const LEDColors = ['#10B981', '#3B82F6', '#F59E0B', '#10B981', '#10B981']

  return (
    <group position={position}>
      {/* Brushed Titanium Server Chassis */}
      <Box args={[1.8, 0.2, 0.9]}>
        <meshStandardMaterial color="#1f2127" metalness={0.95} roughness={0.15} />
      </Box>

      {/* Front Faceplate panel (Polished obsidian look) */}
      <Box args={[0.04, 0.18, 0.85]} position={[-0.88, 0, 0]}>
        <meshStandardMaterial color="#0A0A0C" metalness={0.8} roughness={0.05} />
      </Box>

      {/* Slide-out Rack Handles */}
      <Cylinder args={[0.015, 0.015, 0.14, 8]} position={[-0.89, 0, 0.4]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#b0b5c0" metalness={0.95} roughness={0.1} />
      </Cylinder>
      <Cylinder args={[0.015, 0.015, 0.14, 8]} position={[-0.89, 0, -0.4]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#b0b5c0" metalness={0.95} roughness={0.1} />
      </Cylinder>

      {/* Hard Drive Trays (Detailed slots) */}
      {[-0.26, -0.06, 0.14, 0.34].map((z, j) => (
        <group key={j} position={[-0.885, 0, z]}>
          <Box args={[0.02, 0.12, 0.16]}>
            <meshStandardMaterial color="#141519" metalness={0.9} roughness={0.3} />
          </Box>
          {/* HDD tray handle release button */}
          <Box args={[0.022, 0.03, 0.03]} position={[0, -0.035, 0.05]}>
            <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.2} />
          </Box>
        </group>
      ))}

      {/* Status Indicators (LEDs) */}
      {LEDColors.map((color, i) => (
        <mesh
          key={i}
          ref={(el) => (ledRefs.current[i] = el)}
          position={[-0.89, 0.03, -0.22 - i * 0.04]}
        >
          <sphereGeometry args={[0.016, 6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
        </mesh>
      ))}

      {/* RJ45 Ports (Mockup on front) */}
      <group position={[-0.89, -0.04, -0.1]}>
        <Box args={[0.02, 0.05, 0.05]}>
          <meshStandardMaterial color="#888" metalness={0.9} />
        </Box>
        {/* Glowing link light */}
        <mesh position={[-0.01, 0.03, 0.015]}>
          <sphereGeometry args={[0.008, 4, 4]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  )
}

function RackFrame() {
  return (
    <group>
      {/* Heavy vertical steel support columns */}
      <Box args={[0.08, 3.8, 0.08]} position={[-0.96, 0, 0.48]}>
        <meshStandardMaterial color="#40434d" metalness={0.95} roughness={0.1} />
      </Box>
      <Box args={[0.08, 3.8, 0.08]} position={[0.96, 0, 0.48]}>
        <meshStandardMaterial color="#40434d" metalness={0.95} roughness={0.1} />
      </Box>
      <Box args={[0.08, 3.8, 0.08]} position={[-0.96, 0, -0.48]}>
        <meshStandardMaterial color="#40434d" metalness={0.95} roughness={0.1} />
      </Box>
      <Box args={[0.08, 3.8, 0.08]} position={[0.96, 0, -0.48]}>
        <meshStandardMaterial color="#40434d" metalness={0.95} roughness={0.1} />
      </Box>

      {/* Top & bottom steel reinforcement caps */}
      <Box args={[2.0, 0.08, 1.04]} position={[0, 1.88, 0]}>
        <meshStandardMaterial color="#1a1b1e" metalness={0.95} roughness={0.1} />
      </Box>
      <Box args={[2.0, 0.08, 1.04]} position={[0, -1.88, 0]}>
        <meshStandardMaterial color="#1a1b1e" metalness={0.95} roughness={0.1} />
      </Box>

      {/* Server Rack Identifier logo at top */}
      <Box args={[0.6, 0.06, 0.02]} position={[0, 1.88, 0.53]}>
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.6} />
      </Box>
    </group>
  )
}

export default function ServerScene() {
  const rackRef = useRef()
  useFrame((s) => {
    if (rackRef.current) {
      // Sweeping rotation to showcase front panels and sides
      rackRef.current.rotation.y = -Math.PI / 4 + Math.sin(s.clock.elapsedTime * 0.18) * 0.25
    }
  })

  // Stack of 10 rack server blade units
  const serverYOffsets = [-1.35, -1.05, -0.75, -0.45, -0.15, 0.15, 0.45, 0.75, 1.05, 1.35]

  return (
    <>
      {/* Professional Server Room Lighting */}
      <ambientLight intensity={0.28} />
      <pointLight position={[-3, 4, 3]} intensity={2.5} color="#0080FF" />
      <pointLight position={[3, -2, 3]} intensity={1.5} color="#D32F2F" />
      <directionalLight position={[-4, 2, -2]} intensity={1.5} color="#FFFFFF" />

      <group ref={rackRef} position={[0, 0, 0]}>
        <RackFrame />
        {serverYOffsets.map((y, i) => (
          <ServerUnit key={i} position={[0, y, 0]} index={i} />
        ))}
      </group>
    </>
  )
}

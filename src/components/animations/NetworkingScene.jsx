import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Tube, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

function DataPacket({ curve, speed = 0.12, offset = 0, color = '#38BDF8' }) {
  const ref = useRef()
  const t = useRef(offset)

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1
    const pt = curve.getPoint(t.current)
    if (ref.current) ref.current.position.copy(pt)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

function GlowingCable({ points, color = '#1E3A8A' }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  return (
    <group>
      {/* Outer transparent glass tube */}
      <Tube args={[curve, 80, 0.045, 8, false]}>
        <meshStandardMaterial
          color="#38BDF8"
          transparent
          opacity={0.15}
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </Tube>
      {/* Inner solid wire */}
      <Tube args={[curve, 80, 0.015, 6, false]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Tube>
    </group>
  )
}

function SwitchPort({ position }) {
  return (
    <group position={position}>
      {/* RJ45 port outer shield */}
      <Box args={[0.08, 0.06, 0.08]}>
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Inside connector gap */}
      <Box args={[0.06, 0.04, 0.02]} position={[0, -0.01, 0.035]}>
        <meshStandardMaterial color="#000" metalness={0.1} roughness={0.9} />
      </Box>
      {/* Copper pins mock */}
      <Box args={[0.04, 0.005, 0.02]} position={[0, -0.02, 0.03]}>
        <meshStandardMaterial color="#D4AF37" metalness={1.0} />
      </Box>
    </group>
  )
}

function RouterNode({ position, color = '#10B981', scale = 1 }) {
  const ref = useRef()
  const ledRef1 = useRef()
  const ledRef2 = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.06
    }
    // Blinking LEDs
    if (ledRef1.current) {
      ledRef1.current.color = Math.sin(state.clock.elapsedTime * 8) > 0 ? new THREE.Color(color) : new THREE.Color('#333')
    }
    if (ledRef2.current) {
      ledRef2.current.color = Math.sin(state.clock.elapsedTime * 12 + 1) > 0 ? new THREE.Color('#F59E0B') : new THREE.Color('#333')
    }
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Brushed aluminum chassis box */}
      <Box args={[0.9, 0.22, 0.55]}>
        <meshStandardMaterial color="#1a1c23" metalness={0.9} roughness={0.15} />
      </Box>
      {/* Front gloss faceplate */}
      <Box args={[0.86, 0.18, 0.02]} position={[0, 0, 0.28]}>
        <meshStandardMaterial color="#0b0c10" metalness={0.5} roughness={0.05} />
      </Box>

      {/* Row of RJ45 Ports */}
      {[-0.3, -0.18, -0.06, 0.06, 0.18, 0.3].map((x, i) => (
        <SwitchPort key={i} position={[x, -0.02, 0.26]} />
      ))}

      {/* Blinking Status LED units */}
      <mesh position={[-0.38, 0.05, 0.295]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial ref={ledRef1} color="#333" emissive="#10B981" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.34, 0.05, 0.295]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial ref={ledRef2} color="#333" emissive="#F59E0B" emissiveIntensity={2} />
      </mesh>

      {/* Ventilator holes decoration */}
      {[-0.4, 0.4].map((x, i) => (
        <Box key={i} args={[0.04, 0.14, 0.57]} position={[x, 0, 0]}>
          <meshStandardMaterial color="#111" metalness={0.3} roughness={0.7} />
        </Box>
      ))}
    </group>
  )
}

function DataCoreRing() {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.4
      ref.current.rotation.x = s.clock.elapsedTime * 0.2
    }
  })
  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Rotating fiber optics hub core */}
      <Cylinder args={[0.2, 0.2, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
      </Cylinder>
      <Cylinder args={[0.26, 0.26, 0.01, 16]} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#0EA5E9" metalness={0.9} />
      </Cylinder>
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[Math.sin((i * Math.PI) / 2) * 0.35, 0, Math.cos((i * Math.PI) / 2) * 0.35]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  )
}

function NeonFloorGrid() {
  return (
    <group position={[0, -2.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#05070d" metalness={0.8} roughness={0.8} />
      </mesh>
      <gridHelper args={[10, 12, '#3b82f6', '#1e293b']} />
    </group>
  )
}

export default function NetworkingScene() {
  const cablePoints1 = useMemo(() => [
    new THREE.Vector3(-2.2, 0.6, 0),
    new THREE.Vector3(-1.2, 0.9, 0.3),
    new THREE.Vector3(-0.4, 0.1, -0.2),
    new THREE.Vector3(0.4, 0.5, 0.2),
    new THREE.Vector3(1.2, 0.2, -0.3),
    new THREE.Vector3(2.2, 0.6, 0),
  ], [])

  const cablePoints2 = useMemo(() => [
    new THREE.Vector3(-2.2, -0.4, 0.4),
    new THREE.Vector3(-1.0, -0.7, -0.1),
    new THREE.Vector3(0, -0.2, 0.5),
    new THREE.Vector3(1.0, -0.6, -0.2),
    new THREE.Vector3(2.2, -0.4, 0.4),
  ], [])

  const cablePoints3 = useMemo(() => [
    new THREE.Vector3(0, 1.4, -0.8),
    new THREE.Vector3(0.6, 0.5, -0.4),
    new THREE.Vector3(0, -0.4, 0),
    new THREE.Vector3(-0.6, -1.1, 0.4),
    new THREE.Vector3(0, -1.6, 0.8),
  ], [])

  const curve1 = useMemo(() => new THREE.CatmullRomCurve3(cablePoints1), [cablePoints1])
  const curve2 = useMemo(() => new THREE.CatmullRomCurve3(cablePoints2), [cablePoints2])
  const curve3 = useMemo(() => new THREE.CatmullRomCurve3(cablePoints3), [cablePoints3])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 3]} intensity={2.5} color="#38BDF8" />
      <pointLight position={[-3, 1, 0]} intensity={1.2} color="#10B981" />
      <pointLight position={[3, 1, 0]} intensity={1.2} color="#8B5CF6" />

      <NeonFloorGrid />

      {/* Fiber cables */}
      <GlowingCable points={cablePoints1} color="#0284C7" />
      <GlowingCable points={cablePoints2} color="#059669" />
      <GlowingCable points={cablePoints3} color="#7C3AED" />

      {/* High intensity data packets */}
      {[0, 0.2, 0.4, 0.6, 0.8].map((offset) => (
        <DataPacket key={offset} curve={curve1} offset={offset} color="#38BDF8" speed={0.12} />
      ))}
      {[0.1, 0.35, 0.6, 0.85].map((offset) => (
        <DataPacket key={offset} curve={curve2} offset={offset} color="#34D399" speed={0.15} />
      ))}
      {[0, 0.33, 0.66].map((offset) => (
        <DataPacket key={offset} curve={curve3} offset={offset} color="#C084FC" speed={0.1} />
      ))}

      {/* Server switch/nodes */}
      <RouterNode position={[-2.2, 0.6, 0]} color="#10B981" />
      <RouterNode position={[2.2, 0.6, 0]} color="#10B981" />
      <RouterNode position={[-2.2, -0.4, 0.4]} color="#3B82F6" />
      <RouterNode position={[2.2, -0.4, 0.4]} color="#3B82F6" />

      {/* Data fiber hub core */}
      <group position={[0, 0, 0]}>
        <DataCoreRing />
      </group>
    </>
  )
}

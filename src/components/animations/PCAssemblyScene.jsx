import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Helper for RGB Color Cycling
function getRgbColor(time, offset = 0) {
  const r = Math.sin(time + offset) * 0.5 + 0.5
  const g = Math.sin(time + offset + 2) * 0.5 + 0.5
  const b = Math.sin(time + offset + 4) * 0.5 + 0.5
  return new THREE.Color(r, g, b)
}

function CPUChip({ positionY }) {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = positionY
    }
  })

  return (
    <group ref={ref} position={[-0.4, 0, 0.1]}>
      {/* Substrate */}
      <Box args={[0.7, 0.04, 0.7]}>
        <meshStandardMaterial color="#0A3E1E" metalness={0.2} roughness={0.7} />
      </Box>
      {/* Integrated Heat Spreader (IHS) */}
      <Box args={[0.55, 0.05, 0.55]} position={[0, 0.045, 0]}>
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.15} />
      </Box>
      {/* Gold Contacts (pins mockup on bottom) */}
      <Box args={[0.66, 0.01, 0.66]} position={[0, -0.025, 0]}>
        <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.1} />
      </Box>
    </group>
  )
}

function RAMStick({ position, assembleY, active }) {
  const ref = useRef()
  const rgbRef = useRef()

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = assembleY
    }
    if (rgbRef.current && active) {
      rgbRef.current.color = getRgbColor(s.clock.elapsedTime * 2, position[2] * 2)
    } else if (rgbRef.current) {
      rgbRef.current.color = new THREE.Color('#333')
    }
  })

  return (
    <group ref={ref} position={[position[0], 0, position[2]]}>
      {/* PCB */}
      <Box args={[0.04, 0.38, 1.4]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </Box>
      {/* Heat spreader shroud (dark metal) */}
      <Box args={[0.07, 0.32, 1.3]} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#222226" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Aluminum Accent Lines */}
      <Box args={[0.08, 0.06, 1.25]} position={[0, 0.06, 0]}>
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </Box>
      {/* RGB Light Bar on top */}
      <Box args={[0.06, 0.04, 1.35]} position={[0, 0.2, 0]}>
        <meshStandardMaterial ref={rgbRef} color="#444" emissive="#ffffff" emissiveIntensity={active ? 1.5 : 0.1} />
      </Box>
      {/* Gold pins at the bottom */}
      <Box args={[0.03, 0.05, 1.2]} position={[0, -0.21, 0]}>
        <meshStandardMaterial color="#FFD700" metalness={1.0} roughness={0.1} />
      </Box>
    </group>
  )
}

function GPUCard({ assembleY, active }) {
  const ref = useRef()
  const fan1Ref = useRef()
  const fan2Ref = useRef()
  const rgbRef = useRef()

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = assembleY
    }
    const speed = active ? s.clock.elapsedTime * 12 : s.clock.elapsedTime * 0.5
    if (fan1Ref.current) fan1Ref.current.rotation.y = speed
    if (fan2Ref.current) fan2Ref.current.rotation.y = speed
    
    if (rgbRef.current && active) {
      rgbRef.current.color = getRgbColor(s.clock.elapsedTime * 1.5, 5)
    } else if (rgbRef.current) {
      rgbRef.current.color = new THREE.Color('#333')
    }
  })

  return (
    <group ref={ref} position={[0.15, 0, -0.65]}>
      {/* PCIe Gold Connector */}
      <Box args={[1.5, 0.06, 0.03]} position={[-0.45, -0.25, 0.445]}>
        <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.1} />
      </Box>

      {/* GPU Shroud (Premium Metal) */}
      <Box args={[2.0, 0.45, 0.15]} position={[0, 0, 0.35]}>
        <meshStandardMaterial color="#141416" metalness={0.9} roughness={0.15} />
      </Box>
      <Box args={[2.0, 0.45, 0.7]} position={[0, 0, -0.08]}>
        <meshStandardMaterial color="#0A0A0B" metalness={0.8} roughness={0.25} />
      </Box>

      {/* Fans */}
      <group position={[-0.4, 0, 0.435]} rotation={[Math.PI / 2, 0, 0]}>
        <group ref={fan1Ref}>
          <Cylinder args={[0.08, 0.08, 0.02, 16]}>
            <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
          </Cylinder>
          {[...Array(9)].map((_, i) => (
            <Box key={i} args={[0.02, 0.01, 0.28]} rotation={[0.2, (i * Math.PI) / 4.5, 0]}>
              <meshStandardMaterial color="#111" metalness={0.4} />
            </Box>
          ))}
        </group>
      </group>

      <group position={[0.4, 0, 0.435]} rotation={[Math.PI / 2, 0, 0]}>
        <group ref={fan2Ref}>
          <Cylinder args={[0.08, 0.08, 0.02, 16]}>
            <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
          </Cylinder>
          {[...Array(9)].map((_, i) => (
            <Box key={i} args={[0.02, 0.01, 0.28]} rotation={[0.2, (i * Math.PI) / 4.5, 0]}>
              <meshStandardMaterial color="#111" metalness={0.4} />
            </Box>
          ))}
        </group>
      </group>

      {/* RGB side strip */}
      <Box args={[1.6, 0.04, 0.04]} position={[0, 0.21, 0.4]}>
        <meshStandardMaterial ref={rgbRef} color="#444" emissive="#ffffff" emissiveIntensity={active ? 1.5 : 0.1} />
      </Box>
    </group>
  )
}

function Motherboard() {
  return (
    <group>
      {/* Matte black PCB */}
      <Box args={[2.8, 0.05, 2.4]}>
        <meshStandardMaterial color="#11141a" metalness={0.3} roughness={0.8} />
      </Box>
      
      {/* CPU Socket frame (silver metal) */}
      <Box args={[0.8, 0.03, 0.8]} position={[-0.4, 0.03, 0.1]}>
        <meshStandardMaterial color="#8a909a" metalness={0.9} roughness={0.15} />
      </Box>
      <Box args={[0.6, 0.01, 0.6]} position={[-0.4, 0.042, 0.1]}>
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
      </Box>
      {/* CPU socket lever */}
      <Cylinder args={[0.01, 0.01, 0.7, 8]} position={[-0.83, 0.04, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#a0a5b0" metalness={0.9} />
      </Cylinder>

      {/* PCIe slots */}
      <Box args={[1.8, 0.06, 0.08]} position={[0.15, 0.04, -0.65]}>
        <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />
      </Box>
      <Box args={[1.8, 0.06, 0.08]} position={[0.15, 0.04, -1.05]}>
        <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />
      </Box>

      {/* RAM slots (Alternate colors) */}
      {[0.5, 0.62, 0.74, 0.86].map((z, i) => (
        <Box key={i} args={[0.06, 0.08, 1.5]} position={[0.6 + i * 0.12, 0.04, 0.2]}>
          <meshStandardMaterial color={i % 2 === 0 ? '#1b1b1f' : '#2d2d34'} metalness={0.7} />
        </Box>
      ))}

      {/* Detailed Capacitors */}
      {[...Array(12)].map((_, i) => (
        <group key={i} position={[-0.85 + (i % 3) * 0.18, 0.03, 0.6 + Math.floor(i / 3) * 0.16]}>
          <Cylinder args={[0.04, 0.04, 0.12, 10]}>
            <meshStandardMaterial color="#0E1420" metalness={0.8} roughness={0.2} />
          </Cylinder>
          <Cylinder args={[0.04, 0.04, 0.01, 10]} position={[0, 0.06, 0]}>
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
          </Cylinder>
        </group>
      ))}

      {/* Gold Circuits traces Mockup */}
      {[...Array(6)].map((_, i) => (
        <Box key={i} args={[1.2, 0.005, 0.01]} position={[-0.3, 0.026, -0.2 + i * 0.08]} rotation={[0, 0.2, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.0} emissive="#D4AF37" emissiveIntensity={0.2} />
        </Box>
      ))}
    </group>
  )
}

export default function PCAssemblyScene() {
  const cpuY = useRef(1.5)
  const ramY = useRef(1.5)
  const gpuY = useRef(1.5)
  const buildActive = useRef(false)
  const sceneRef = useRef()

  useFrame((state) => {
    // 12 seconds loop cycle
    const t = state.clock.elapsedTime % 12
    
    // Slow orbit rotation of the entire workbench
    if (sceneRef.current) {
      sceneRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }

    if (t < 2) {
      // Disassembled / Floating high state
      cpuY.current = THREE.MathUtils.lerp(cpuY.current, 1.2, 0.1)
      ramY.current = THREE.MathUtils.lerp(ramY.current, 1.0, 0.1)
      gpuY.current = THREE.MathUtils.lerp(gpuY.current, 1.3, 0.1)
      buildActive.current = false
    } else if (t < 4.5) {
      // Step 1: CPU installs
      cpuY.current = THREE.MathUtils.lerp(cpuY.current, 0.08, 0.12)
      ramY.current = THREE.MathUtils.lerp(ramY.current, 1.0, 0.1)
      gpuY.current = THREE.MathUtils.lerp(gpuY.current, 1.3, 0.1)
    } else if (t < 7) {
      // Step 2: RAM installs
      cpuY.current = 0.08
      ramY.current = THREE.MathUtils.lerp(ramY.current, 0.2, 0.12)
      gpuY.current = THREE.MathUtils.lerp(gpuY.current, 1.3, 0.1)
    } else if (t < 9.5) {
      // Step 3: GPU installs
      cpuY.current = 0.08
      ramY.current = 0.2
      gpuY.current = THREE.MathUtils.lerp(gpuY.current, 0.25, 0.12)
    } else if (t < 11.5) {
      // Completed build: All parts fully assembled, RGB fully active
      cpuY.current = 0.08
      ramY.current = 0.2
      gpuY.current = 0.25
      buildActive.current = true
    } else {
      // Lift back up before cycle resets
      cpuY.current = THREE.MathUtils.lerp(cpuY.current, 1.2, 0.15)
      ramY.current = THREE.MathUtils.lerp(ramY.current, 1.0, 0.15)
      gpuY.current = THREE.MathUtils.lerp(gpuY.current, 1.3, 0.15)
      buildActive.current = false
    }
  })

  const ramYVal = ramY.current
  const gpuYVal = gpuY.current
  const cpuYVal = cpuY.current
  const active = buildActive.current

  return (
    <group ref={sceneRef} position={[0, -0.4, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 5, 2]} intensity={2.5} color="#3B82F6" />
      <pointLight position={[-3, 4, -2]} intensity={1.5} color="#8B5CF6" />
      <directionalLight position={[0, 8, 0]} intensity={2.0} color="#FFFFFF" castShadow />

      {/* Motherboard Base */}
      <Motherboard />

      {/* CPU */}
      <CPUChip positionY={cpuYVal} />

      {/* 3 RAM Sticks */}
      <RAMStick position={[0.62, 0, 0.2]} assembleY={ramYVal} active={active} />
      <RAMStick position={[0.74, 0, 0.2]} assembleY={ramYVal} active={active} />
      <RAMStick position={[0.86, 0, 0.2]} assembleY={ramYVal} active={active} />

      {/* GPU */}
      <GPUCard assembleY={gpuYVal} active={active} />
    </group>
  )
}

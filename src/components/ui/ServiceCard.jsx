import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { TbCheck } from 'react-icons/tb'
import './ServiceCard.css'

function SceneFallback() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="scene-loader" />
    </div>
  )
}

export default function ServiceCard({ icon: Icon, title, desc, features, scene: Scene, delay = 0, id }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`service-card ${hovered ? 'hovered' : ''}`}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="scene-preview">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            {Scene && <Scene />}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={hovered ? 2.5 : 0.8} />
          </Suspense>
        </Canvas>
        <div className="scene-overlay" />
      </div>

      <div className="service-info">
        <div className="service-icon">
          {Icon && <Icon size={24} />}
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
        {features && (
          <ul className="feature-list">
            {features.map((f, i) => (
              <li key={i}>
                <span className="feature-tick">
                  <TbCheck size={14} />
                </span>{' '}
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

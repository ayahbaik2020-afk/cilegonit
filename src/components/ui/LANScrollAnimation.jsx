import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TbBrandWhatsapp, TbNetwork, TbAlertCircle, TbCheck } from 'react-icons/tb'
import './LANScrollAnimation.css'

function RJ45Plug({ status }) {
  return (
    <svg width="70" height="280" viewBox="0 0 70 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Polycarbonate Glass Gradients */}
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#93c5fd" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
        </linearGradient>
        
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        
        <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="50%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>

        <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Glow effect for data flow */}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Cable Tail (UTP Cable) extending down */}
      <path d="M 35 110 L 35 280" stroke="url(#cableGrad)" strokeWidth="16" strokeLinecap="round" />
      
      {/* Dynamic Data flow pulses when connected */}
      {status === 'connected' && (
        <>
          {/* Glowing background line */}
          <path d="M 35 110 L 35 280" stroke="#34d399" strokeWidth="6" strokeLinecap="round" opacity="0.3" filter="url(#glow)" />
          {/* Data pulses flowing down */}
          <path 
            d="M 35 110 L 35 280" 
            stroke="#60a5fa" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeDasharray="16 32" 
            className="data-flow-line" 
          />
        </>
      )}

      {/* 2. Strain Relief Boot (Rubber sleeve) */}
      <path d="M16 80 L54 80 L46 112 L24 112 Z" fill="url(#bootGrad)" stroke="#111827" strokeWidth="1" />
      <line x1="18" y1="88" x2="52" y2="88" stroke="#374151" strokeWidth="2" />
      <line x1="20" y1="96" x2="50" y2="96" stroke="#374151" strokeWidth="2" />
      <line x1="22" y1="104" x2="48" y2="104" stroke="#374151" strokeWidth="2" />

      {/* 3. Main Plug Body (Transparent Plastic) */}
      <rect x="10" y="24" width="50" height="56" rx="4" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.6" />
      
      {/* 4. Front Nose (Clear Plastic tip) */}
      <path d="M14 8 H56 V24 H14 Z" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.5" />

      {/* 5. 8 Golden Contacts at the top tip */}
      <rect x="18" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />
      <rect x="23" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />
      <rect x="28" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />
      <rect x="33" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />
      <rect x="38" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />
      <rect x="43" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />
      <rect x="48" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />
      <rect x="53" y="0" width="2.5" height="10" rx="0.5" fill="url(#goldGrad)" />

      {/* 6. Internal Colored Wires (T568B Standard) */}
      <line x1="19.25" y1="10" x2="19.25" y2="78" stroke="#fbbf24" strokeWidth="2.2" /> {/* Orange-White */}
      <line x1="24.25" y1="10" x2="24.25" y2="78" stroke="#ea580c" strokeWidth="2.2" /> {/* Orange */}
      <line x1="29.25" y1="10" x2="29.25" y2="78" stroke="#a7f3d0" strokeWidth="2.2" /> {/* Green-White */}
      <line x1="34.25" y1="10" x2="34.25" y2="78" stroke="#2563eb" strokeWidth="2.2" /> {/* Blue */}
      <line x1="39.25" y1="10" x2="39.25" y2="78" stroke="#93c5fd" strokeWidth="2.2" /> {/* Blue-White */}
      <line x1="44.25" y1="10" x2="44.25" y2="78" stroke="#059669" strokeWidth="2.2" /> {/* Green */}
      <line x1="49.25" y1="10" x2="49.25" y2="78" stroke="#fed7aa" strokeWidth="2.2" /> {/* Brown-White */}
      <line x1="54.25" y1="10" x2="54.25" y2="78" stroke="#78350f" strokeWidth="2.2" /> {/* Brown */}

      {/* 7. Locking Clip Latch */}
      <path d="M26 30 C26 30 18 45 18 55 C18 60 22 62 35 62 C48 62 52 60 52 55 C52 45 44 30 44 30 Z" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
    </svg>
  )
}

export default function LANScrollAnimation() {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('connecting') // connecting, connected, disconnected

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress to the Y position of the LAN Plug
  // - Starts at 280px (bottom)
  // - Reaches 0px (plugged into Switch) from 0.35 to 0.72 progress
  // - Reaches 280px (plugged out) from 0.72 to 0.9 progress
  // - Remains at 280px (exit) from 0.9 to 1.0 progress
  const plugY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.72, 0.88, 1],
    [280, 200, 0, 0, 200, 280]
  )

  // Map opacity so it is solid during connection, and slightly fades out when out of range
  const plugOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.88, 0.98],
    [0.4, 1, 1, 0.4]
  )

  // Listen to progress changes to trigger state updates
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.4) {
        setStatus('connecting')
      } else if (latest >= 0.4 && latest <= 0.72) {
        setStatus('connected')
      } else {
        setStatus('disconnected')
      }
    })
  }, [scrollYProgress])

  return (
    <section ref={containerRef} className="lan-scroll-section">
      <div className="lan-sticky-container">
        <div className="container">
          <div className="lan-grid">
            
            {/* Text & Dashboard Column */}
            <div className="lan-text-col">
              
              {/* Dynamic Status Pill */}
              <div className={`lan-status-pill ${status}`}>
                <span className="lan-status-dot" />
                <span>
                  {status === 'connecting' && 'Menghubungkan Jaringan...'}
                  {status === 'connected' && 'Jaringan Aktif (Connected)'}
                  {status === 'disconnected' && 'Koneksi Dilepas (Plug Out)'}
                </span>
              </div>

              <h2>Koneksi Jaringan <span className="gradient-text">Rapi & Stabil</span></h2>
              <p>
                Instalasi kabel LAN terstruktur (structured cabling) untuk menjamin transmisi data berkecepatan tinggi tanpa hambatan. Kami menata kabel rapi di dalam conduit/tray, memberi label port, dan melakukan sertifikasi link.
              </p>

              {/* Dynamic Dashboard Metrics */}
              <div 
                className="card" 
                style={{ 
                  background: 'var(--bg-main)', 
                  border: '1.5px solid var(--border-color)',
                  transition: 'all 0.4s ease',
                  borderColor: status === 'connected' ? 'var(--primary)' : 'var(--border-color)',
                  boxShadow: status === 'connected' ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  textAlign: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Bandwidth</div>
                  <div 
                    style={{ 
                      fontSize: '1.3rem', 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700, 
                      color: status === 'connected' ? 'var(--primary)' : 'var(--text-subtle)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {status === 'connected' ? '1 Gbps' : '0 Kbps'}
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Latency</div>
                  <div 
                    style={{ 
                      fontSize: '1.3rem', 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700, 
                      color: status === 'connected' ? 'var(--success)' : 'var(--text-subtle)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {status === 'connected' ? '2 ms' : '--'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Packet Loss</div>
                  <div 
                    style={{ 
                      fontSize: '1.3rem', 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700, 
                      color: status === 'connected' ? 'var(--success)' : 'var(--text-subtle)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {status === 'connected' ? '0.00%' : '--'}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                <a href="https://wa.me/6285337016608?text=Saya%20ingin%20instalasi%20jaringan%20LAN" target="_blank" rel="noreferrer" className="btn btn-primary">
                  <TbBrandWhatsapp size={16} /> Konsultasi Jaringan
                </a>
              </div>
            </div>

            {/* Visual Animation Column */}
            <div className="lan-visual-col">
              <div className="lan-animation-box">
                
                {/* Visual grid / background pattern */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(var(--border-color) 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                    opacity: 0.2,
                    zIndex: 0
                  }}
                />

                {/* Rackmount Network Switch Chassis */}
                <div className="lan-switch-chassis">
                  <div className="lan-switch-ear left">
                    <div className="rack-screw" />
                  </div>
                  <div className="lan-switch-ear right">
                    <div className="rack-screw" />
                  </div>

                  <div className="lan-switch-faceplate">
                    {/* Brand */}
                    <div className="lan-switch-brand">
                      <div className="brand-logo"><TbNetwork size={12} /></div>
                      <span className="brand-name">CILEGON-IT 10G SW</span>
                    </div>

                    {/* Ports Bank (Centered) */}
                    <div className="lan-switch-ports">
                      <div className="lan-switch-port plugged">
                        <div className="port-led active-blink-green" />
                        <div className="port-socket">
                          <div className="port-pins" />
                          <div className="static-plug-boot" />
                        </div>
                        <span className="port-num">1</span>
                      </div>

                      <div className="lan-switch-port plugged">
                        <div className="port-led active-blink-orange" />
                        <div className="port-socket">
                          <div className="port-pins" />
                          <div className="static-plug-boot" />
                        </div>
                        <span className="port-num">2</span>
                      </div>

                      <div className="lan-switch-port plugged">
                        <div className="port-led active-blink-green" />
                        <div className="port-socket">
                          <div className="port-pins" />
                          <div className="static-plug-boot" />
                        </div>
                        <span className="port-num">3</span>
                      </div>

                      {/* Port 4 (Target Port) */}
                      <div className={`lan-switch-port target ${status === 'connected' ? 'active' : ''}`}>
                        <div className={`port-led ${
                          status === 'connected' 
                            ? 'active-blink-green' 
                            : status === 'connecting' 
                            ? 'active-orange' 
                            : ''
                        }`} />
                        <div className={`port-socket active-target ${status === 'connected' ? 'active' : ''}`}>
                          <div className="port-pins" />
                        </div>
                        <span className="port-num">4</span>
                      </div>

                      <div className="lan-switch-port empty">
                        <div className="port-led" />
                        <div className="port-socket">
                          <div className="port-pins" />
                        </div>
                        <span className="port-num">5</span>
                      </div>

                      <div className="lan-switch-port empty">
                        <div className="port-led" />
                        <div className="port-socket">
                          <div className="port-pins" />
                        </div>
                        <span className="port-num">6</span>
                      </div>

                      <div className="lan-switch-port plugged">
                        <div className="port-led active-blink-green" />
                        <div className="port-socket">
                          <div className="port-pins" />
                          <div className="static-plug-boot" />
                        </div>
                        <span className="port-num">7</span>
                      </div>
                    </div>

                    {/* LCD Status Screen */}
                    <div className={`lan-switch-lcd ${status}`}>
                      <div className="lcd-line-1">PORT 04 STATUS</div>
                      <div className="lcd-line-2">
                        {status === 'connecting' && 'LINKING...'}
                        {status === 'connected' && '10G ACTIVE'}
                        {status === 'disconnected' && 'NO CARRIER'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RJ45 Cable Plug */}
                <motion.div
                  className="lan-cable-plug"
                  style={{
                    y: plugY,
                    opacity: plugOpacity,
                  }}
                >
                  <RJ45Plug status={status} />
                </motion.div>

                {/* Interactive info overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    zIndex: 15,
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {status === 'connecting' && (
                    <>
                      <TbAlertCircle style={{ color: 'var(--warning)' }} size={12} />
                      <span>Scroll kebawah untuk mencolok kabel LAN</span>
                    </>
                  )}
                  {status === 'connected' && (
                    <>
                      <TbCheck style={{ color: 'var(--success)' }} size={12} />
                      <span>Koneksi aktif! Scroll terus untuk melepas</span>
                    </>
                  )}
                  {status === 'disconnected' && (
                    <>
                      <TbAlertCircle style={{ color: 'var(--text-subtle)' }} size={12} />
                      <span>Kabel dilepas. Jaringan non-aktif</span>
                    </>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

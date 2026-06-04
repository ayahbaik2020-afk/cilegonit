import { useRef, useEffect } from 'react'
import { useScroll } from 'framer-motion'
import './HeroCableAnimation.css'

// ─── SVG Constants ────────────────────────────────────────────────────────────
const VW = 1920, VH = 1080

// Paper plane launch — from baby's raised hand (upper-left of the baby image).
// Baby wrapper: bottom:0 right:4%. At 1920px: baby width≈38vw≈730px, bottom at 1080.
// Baby image height ≈ 730px so top of image ≈ 350px.
// Baby's paper plane in hand: roughly 38% from left, 18% from top of image.
// x = (1920 - 77 - 730) + 730*0.38 ≈ 1390px, y = 350 + 730*0.18 ≈ 480px
const START_X = 1380
const START_Y = 470

// Flight path — the plane is thrown upper-left from baby's hand and glides across page.
// Initial tangent must go upper-left (negative x, negative y) to match a natural throw.
const PATH = `M ${START_X} ${START_Y}
  C 1180 280, 820 200, 560 300
  C 300 400, 160 560, 220 700
  C 280 840, 1340 820, 1360 950
  C 1380 1030, 640 1080, 600 1110`

// ─── Realistic Paper Plane SVG ────────────────────────────────────────────────
// Nose points to the RIGHT (+x). Use rotate(angle) for correct heading tracking.
// Matches the classic dart / paper airplane silhouette as seen in the reference photo.
function PaperPlane() {
  return (
    <g>
      {/* ── Top wing (upper half, main body) ── */}
      {/* Nose → back-top sweep */}
      <path
        d="M 52 0 L -42 -36 L -18 0 Z"
        fill="url(#planeTopWing)"
        stroke="rgba(200,215,255,0.9)"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* ── Bottom wing (lower half) ── */}
      <path
        d="M 52 0 L -42 36 L -18 0 Z"
        fill="url(#planeBotWing)"
        stroke="rgba(200,215,255,0.9)"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* ── Top tail flap (inner fold) ── */}
      <path
        d="M -42 -36 L -18 -12 L -18 0 Z"
        fill="url(#planeTailTop)"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* ── Bottom tail flap (inner fold) ── */}
      <path
        d="M -42 36 L -18 12 L -18 0 Z"
        fill="url(#planeTailBot)"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* ── Center fold crease (spine) ── */}
      <line
        x1="52" y1="0" x2="-42" y2="0"
        stroke="rgba(147,197,253,0.95)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* ── Wing crease highlight on top ── */}
      <path
        d="M 52 0 L 10 -18"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* ── Wing crease highlight on bottom ── */}
      <path
        d="M 52 0 L 10 18"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </g>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroCableAnimation() {
  const pathRef  = useRef(null)
  const planeRef = useRef(null)

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const path  = pathRef.current
    const plane = planeRef.current
    if (!path || !plane) return

    const length = path.getTotalLength()

    const unsub = scrollYProgress.on('change', v => {
      const dist = v * length
      const safe = Math.min(length, Math.max(0, dist))

      // Move + rotate plane along path
      // Nose points RIGHT (+x) in local coords → use rotate(angle) directly
      const p  = path.getPointAtLength(safe)
      const p1 = path.getPointAtLength(Math.max(0, safe - 6))
      const p2 = path.getPointAtLength(Math.min(length, safe + 6))
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
      plane.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${angle})`)
      plane.style.opacity = v < 0.006 ? 0 : 1
    })

    return () => unsub()
  }, [scrollYProgress])

  return (
    <>
      {/* Light gradient background + dot grid */}
      <div className="hero-cable-bg-container">
        <div className="tech-grid-overlay" />
      </div>

      {/* Baby + laptop mascot */}
      <div className="hero-baby-wrapper">
        <img
          src="/baby-hero.png"
          alt="Baby with laptop"
          className="hero-baby-img"
          draggable={false}
        />
      </div>

      {/* Fixed full-page SVG — invisible guide path + paper plane */}
      <svg
        className="hero-cable-fixed-overlay"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMin meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top wing — lighter at nose, slightly blue-tinted at tail */}
          <linearGradient id="planeTopWing" x1="52" y1="0" x2="-42" y2="-36" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#f0f7ff" />
            <stop offset="60%"  stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
          {/* Bottom wing — slightly darker (shadow side) */}
          <linearGradient id="planeBotWing" x1="52" y1="0" x2="-42" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#e0effe" />
            <stop offset="60%"  stopColor="#c8dffe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          {/* Inner tail folds */}
          <linearGradient id="planeTailTop" x1="-42" y1="-36" x2="-18" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
          <linearGradient id="planeTailBot" x1="-42" y1="36" x2="-18" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>

          {/* Drop shadow */}
          <filter id="planeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="4" stdDeviation="7" floodColor="#1e3a8a" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Invisible guide path */}
        <path
          ref={pathRef}
          d={PATH}
          stroke="none"
          fill="none"
          style={{ visibility: 'hidden' }}
        />

        {/* Paper plane — follows scroll, rotates to face direction of travel */}
        <g ref={planeRef} style={{ opacity: 0 }} filter="url(#planeShadow)">
          <PaperPlane />
        </g>
      </svg>
    </>
  )
}

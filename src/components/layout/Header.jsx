import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './Header.css'

// Inline SVG logo — same style as prosthetics hero
function LogoMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="48" fill="#2563EB" />
      <text x="128" y="178" fontFamily="monospace" fontSize="148" fontWeight="bold" fill="white" textAnchor="middle">C</text>
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/about', label: 'Tentang' },
  { to: '/services', label: 'Layanan' },
  { to: '/portfolio', label: 'Portofolio' },
  { to: '/articles', label: 'Artikel' },
  { to: '/contact', label: 'Kontak' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="pill-nav">
        {/* Left — logo pill */}
        <Link to="/" className="logo-pill" aria-label="CilegonIT Home">
          <LogoMark />
        </Link>

        {/* Right — links pill */}
        <div className="links-pill desktop-only">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `pill-link ${isActive ? 'active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right — CTA pill (desktop) */}
        <Link to="/contact" className="cta-pill desktop-only">
          Konsultasi Gratis
        </Link>

        {/* Mobile hamburger */}
        <button
          className="menu-pill mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`ham ${menuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mobile-cta"
              onClick={() => setMenuOpen(false)}
            >
              Konsultasi Gratis →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

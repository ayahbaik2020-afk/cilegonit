import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TbCpu, TbNetwork, TbDeviceCctv, TbCode, TbServer, TbBrandWhatsapp, TbSettings, TbTrophy, TbDeviceAnalytics, TbMapPin, TbCheck } from 'react-icons/tb'
import ShopStatus from '../components/ui/ShopStatus'
import StatsCounter from '../components/ui/StatsCounter'
import DiagnosisQuiz from '../components/ui/DiagnosisQuiz'
import ServiceAnimation from '../components/ui/ServiceAnimation'
import HeroCableAnimation from '../components/ui/HeroCableAnimation'
import './Home.css'

// ─── Video background hero (prosthetics-style) ──────────────────────────────
// Replace VIDEO_URL with a relevant IT/tech video for production.
// Free suggestion: https://www.pexels.com/video/ search "server room" or "networking"
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '500', suffix: '+', label: 'Pelanggan Puas' },
  { value: '8', suffix: ' Thn', label: 'Pengalaman' },
  { value: '98', suffix: '%', label: 'Kepuasan' },
  { value: '24', suffix: '/7', label: 'Support' },
]

const SERVICES = [
  {
    id: 'pc', icon: TbCpu, title: 'Servis & Rakit PC',
    desc: 'Diagnosa akurat, upgrade komponen, install ulang OS, hingga rakit PC custom sesuai kebutuhan & budget Anda.',
    features: ['Diagnosa gratis', 'Garansi servis 30 hari', 'Spare part original'],
  },
  {
    id: 'network', icon: TbNetwork, title: 'Instalasi Jaringan',
    desc: 'Pasang LAN, WiFi enterprise, fiber optik, konfigurasi Mikrotik untuk rumah, kantor, dan industri.',
    features: ['Survey lokasi gratis', 'Kabel CAT6 premium', 'Konfigurasi firewall'],
  },
  {
    id: 'cctv', icon: TbDeviceCctv, title: 'Pasang CCTV',
    desc: 'CCTV HD & 4K indoor/outdoor dengan remote monitoring via smartphone 24 jam, anti-petir, dan garansi.',
    features: ['Resolusi HD–4K', 'Night vision', 'Remote monitoring'],
  },
  {
    id: 'software', icon: TbCode, title: 'Pengembangan Software',
    desc: 'Website, toko online, sistem informasi, hingga aplikasi mobile custom untuk bisnis Anda.',
    features: ['Desain responsif', 'SEO-friendly', 'Dukungan 6 bulan'],
  },
  {
    id: 'server', icon: TbServer, title: 'Solusi Server',
    desc: 'Instalasi server lokal, NAS, cloud backup, manajemen domain dan hosting profesional.',
    features: ['Setup server lokal', 'Cloud backup', 'Monitoring 24/7'],
  },
]

const PORTFOLIO_HIGHLIGHTS = [
  { category: 'Jaringan', title: 'LAN 60 Node PT. Krakatau', desc: 'Instalasi jaringan LAN 60 titik di kawasan industri Cilegon.' },
  { category: 'CCTV', title: 'CCTV 32 Kamera Pabrik', desc: 'Monitoring penuh area produksi dengan CCTV IP 4K.' },
  { category: 'Software', title: 'Sistem Absensi RFID', desc: 'Aplikasi absensi RFID terintegrasi database cloud.' },
  { category: 'PC', title: 'Rakit 20 Unit Gaming PC', desc: 'Rakit PC gaming premium untuk warnet skala menengah.' },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState('pc')
  const activeService = SERVICES.find(s => s.id === activeTab) || SERVICES[0]

  return (
    <main>

      {/* ══════════════════════════════════════════════════════
          HERO — Video background (prosthetics-style layout)
          Pill navbar is in Header.jsx (fixed, above this)
      ═══════════════════════════════════════════════════════ */}
      <section className="hero-section">
        {/* Scroll-driven LAN cable animation background */}
        <HeroCableAnimation />

        {/* Subtle light overlay so text stays readable over the animation */}
        <div className="hero-overlay" />

        {/* Bottom-left content — prosthetics style */}
        <div className="hero-content">
          <motion.div
            className="hero-inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="hero-badges">
              <ShopStatus />
              <span className="hero-badge-mono">
                <TbMapPin size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Cilegon, Banten
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-h1">
              Solusi Teknologi IT<br />
              <span className="hero-accent">Terpercaya di Cilegon</span>
            </h1>

            {/* Subtext */}
            <p className="hero-sub">
              Servis PC, jaringan, CCTV, dan software — ditangani profesional.
            </p>

            {/* CTA row */}
            <div className="hero-cta">
              <Link to="/services" className="cta-primary">
                Lihat Layanan →
              </Link>
              <a
                href="https://wa.me/6285337016608"
                target="_blank"
                rel="noreferrer"
                className="cta-ghost"
              >
                <TbBrandWhatsapp size={16} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint"><span /></div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════ */}
      <section className="stats-section">
        <div className="container">
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES — Tabbed Layout
      ═══════════════════════════════════════════════════════ */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="pre-label">
              <TbSettings size={14} /> Apa yang Kami Kerjakan
            </span>
            <h2>Layanan <span className="gradient-text">Unggulan</span> Kami</h2>
            <p>Pilih layanan untuk melihat detail dan animasi 3D interaktif.</p>
          </div>

          {/* ── Tab Bar ── */}
          <div className="svc-tabs">
            {SERVICES.map((svc) => {
              const Icon = svc.icon
              return (
                <button
                  key={svc.id}
                  className={`svc-tab-btn ${activeTab === svc.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(svc.id)}
                >
                  <Icon size={20} />
                  <span>{svc.title}</span>
                </button>
              )
            })}
          </div>

          {/* ── Tab Content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="svc-tab-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* CSS Animation Scene */}
              <div className="svc-scene-panel">
                <ServiceAnimation serviceId={activeTab} />
                <div className="svc-scene-fade" />
              </div>


              {/* Info Panel */}
              <div className="svc-info-panel">
                <div className="svc-info-icon">
                  {activeService.icon && <activeService.icon size={28} />}
                </div>
                <h3>{activeService.title}</h3>
                <p>{activeService.desc}</p>
                {activeService.features && (
                  <ul className="svc-feature-list">
                    {activeService.features.map((f, i) => (
                      <li key={i}>
                        <TbCheck size={15} className="svc-tick" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <Link to="/services" className="btn btn-primary" style={{ marginTop: '1.75rem', alignSelf: 'flex-start' }}>
                  Lihat Detail Layanan →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PORTFOLIO HIGHLIGHTS
      ═══════════════════════════════════════════════════════ */}
      <section className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="pre-label">
              <TbTrophy size={14} /> Rekam Jejak
            </span>
            <h2>Proyek <span className="gradient-text">Pilihan</span></h2>
            <p>Sebagian dari ratusan proyek yang telah kami selesaikan dengan sukses.</p>
          </div>
          <div className="grid-4">
            {PORTFOLIO_HIGHLIGHTS.map((p, i) => (
              <motion.div
                key={i}
                className="card portfolio-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <span className="port-category">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/portfolio" className="btn btn-secondary">Lihat Semua Portofolio</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DIAGNOSIS QUIZ
      ═══════════════════════════════════════════════════════ */}
      <section className="section quiz-section">
        <div className="container">
          <div className="section-header">
            <span className="pre-label">
              <TbDeviceAnalytics size={14} /> Tidak Yakin Butuh Apa?
            </span>
            <h2>Diagnosis <span className="gradient-text">IT Gratis</span></h2>
            <p>Jawab 2 pertanyaan singkat — kami rekomendasikan solusi terbaik dalam 30 detik.</p>
          </div>
          <DiagnosisQuiz />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BAND
      ═══════════════════════════════════════════════════════ */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2>Siap Memulai Proyek Anda?</h2>
              <p>Hubungi kami sekarang untuk konsultasi gratis. Tim kami siap membantu!</p>
            </div>
            <div className="cta-actions">
              <a href="https://wa.me/6285337016608" target="_blank" rel="noreferrer" className="btn btn-success">
                <TbBrandWhatsapp size={18} /> Konsultasi via WhatsApp
              </a>
              <Link to="/contact" className="btn btn-secondary">Kirim Pesan</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbCpu,
  TbNetwork,
  TbDeviceCctv,
  TbCode,
  TbServer,
  TbShoppingCart,
  TbWifi,
  TbBuildingWarehouse,
  TbDeviceFloppy,
  TbReceipt,
  TbCloud,
  TbTrophy,
} from 'react-icons/tb'
import './Portfolio.css'

const ALL_PROJECTS = [
  { id: 1, cat: 'Jaringan', title: 'LAN 60 Node PT. Krakatau Steel', desc: 'Instalasi jaringan CAT6 60 titik + konfigurasi Mikrotik di kawasan industri Krakatau.', icon: TbNetwork, year: '2024' },
  { id: 2, cat: 'CCTV', title: 'CCTV 32 Kamera Pabrik Baja', desc: 'Monitoring area produksi 24 jam dengan kamera 4K IP + DVR 16TB.', icon: TbDeviceCctv, year: '2024' },
  { id: 3, cat: 'Software', title: 'Sistem Absensi RFID Online', desc: 'Web app absensi kartu RFID terintegrasi database MySQL & notifikasi WhatsApp.', icon: TbCode, year: '2023' },
  { id: 4, cat: 'PC', title: 'Rakit 20 Unit Gaming PC', desc: 'Rakit PC gaming Ryzen 5 + RTX 4060 untuk warnet di Cilegon Kota.', icon: TbCpu, year: '2024' },
  { id: 5, cat: 'Software', title: 'Website Toko Online', desc: 'Platform e-commerce dengan fitur cart, payment gateway, dan dashboard admin.', icon: TbShoppingCart, year: '2023' },
  { id: 6, cat: 'Jaringan', title: 'WiFi Apartment 120 Unit', desc: 'Deployment WiFi enterprise Ubiquiti di apartemen 8 lantai, 120 unit.', icon: TbWifi, year: '2023' },
  { id: 7, cat: 'CCTV', title: 'Monitoring Gudang Logistik', desc: 'CCTV 16 titik dengan motion alert + backup cloud untuk gudang 2000m².', icon: TbBuildingWarehouse, year: '2022' },
  { id: 8, cat: 'Server', title: 'Server NAS Perusahaan', desc: 'Setup NAS Synology 20TB + backup otomatis untuk kantor distribusi.', icon: TbServer, year: '2023' },
  { id: 9, cat: 'PC', title: 'Servis 50 Laptop Kantor', desc: 'Tune-up, upgrade SSD, dan reinstall OS untuk 50 laptop karyawan pabrik.', icon: TbDeviceFloppy, year: '2024' },
  { id: 10, cat: 'Software', title: 'Aplikasi Kasir UMKM', desc: 'Point of Sale berbasis web dengan laporan harian, stok, dan cetak struk thermal.', icon: TbReceipt, year: '2022' },
  { id: 11, cat: 'Jaringan', title: 'Fiber Optik 500m Pabrik', desc: 'Penarikan kabel fiber optik 500 meter antar gedung dalam 1 komplek pabrik.', icon: TbNetwork, year: '2023' },
  { id: 12, cat: 'Server', title: 'Cloud Hosting Setup', desc: 'Konfigurasi VPS, DNS, SSL, dan email server untuk 5 domain bisnis.', icon: TbCloud, year: '2024' },
]

const CATS = ['Semua', 'PC', 'Jaringan', 'CCTV', 'Software', 'Server']

export default function Portfolio() {
  const [active, setActive] = useState('Semua')
  const filtered = active === 'Semua' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === active)

  return (
    <main className="portfolio-page">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pre-label">
              <TbTrophy size={14} /> Rekam Jejak
            </span>
            <h1>Portofolio <span className="gradient-text">Proyek</span></h1>
            <p className="page-hero-desc">Lebih dari 500 proyek selesai dengan tingkat kepuasan pelanggan 98%. Berikut sebagian pilihan terbaik kami.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className="filter-bar">
            {CATS.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => {
                const ItemIcon = p.icon
                return (
                  <motion.div
                    key={p.id}
                    layout
                    className="portfolio-item"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="port-icon">
                      {ItemIcon && <ItemIcon size={24} />}
                    </div>
                    <div className="port-meta">
                      <span className="port-cat">{p.cat}</span>
                      <span className="port-year">{p.year}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

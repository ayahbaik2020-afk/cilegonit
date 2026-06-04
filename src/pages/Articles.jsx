import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbCpu,
  TbWifi,
  TbDeviceCctv,
  TbCode,
  TbDeviceFloppy,
  TbLock,
  TbClock,
  TbBook,
} from 'react-icons/tb'
import './Articles.css'

const ARTICLES = [
  {
    id: 1, cat: 'PC & Laptop', title: 'Tanda-Tanda PC Anda Butuh Upgrade RAM Segera',
    excerpt: 'Komputer sering hang, loading lama, dan tidak bisa multitasking? Mungkin saatnya upgrade RAM. Simak panduan lengkapnya.',
    readTime: '4 menit', date: '28 Mei 2024', icon: TbCpu,
  },
  {
    id: 2, cat: 'Jaringan', title: 'Perbedaan WiFi 2.4GHz vs 5GHz: Mana yang Cocok untuk Anda?',
    excerpt: 'Banyak yang masih bingung antara dua frekuensi WiFi ini. Kami jelaskan perbedaan, kelebihan, dan kekurangan masing-masing.',
    readTime: '5 menit', date: '20 Mei 2024', icon: TbWifi,
  },
  {
    id: 3, cat: 'CCTV', title: 'Tips Memilih CCTV yang Tepat untuk Rumah atau Kantor',
    excerpt: 'Banyak pilihan CCTV di pasaran. Dari resolusi, jenis kamera, hingga kapasitas storage — panduan ini membantu Anda memilih.',
    readTime: '6 menit', date: '15 Mei 2024', icon: TbDeviceCctv,
  },
  {
    id: 4, cat: 'Software', title: 'Kenapa Bisnis UMKM Wajib Punya Website di 2024',
    excerpt: 'Di era digital ini, website bukan lagi kemewahan — melainkan kebutuhan. Simak 7 alasan kenapa UMKM Anda perlu website sekarang.',
    readTime: '5 menit', date: '10 Mei 2024', icon: TbCode,
  },
  {
    id: 5, cat: 'PC & Laptop', title: 'SSD vs HDD: Mana yang Lebih Baik untuk PC Kerja?',
    excerpt: 'Perbandingan lengkap antara SSD dan HDD dari segi kecepatan, ketahanan, dan harga agar Anda bisa memilih dengan tepat.',
    readTime: '4 menit', date: '5 Mei 2024', icon: TbDeviceFloppy,
  },
  {
    id: 6, cat: 'Keamanan', title: 'Cara Melindungi Jaringan Kantor dari Serangan Hacker',
    excerpt: 'Ancaman keamanan siber semakin nyata. Pelajari langkah-langkah sederhana untuk mengamankan jaringan kantor Anda.',
    readTime: '7 menit', date: '1 Mei 2024', icon: TbLock,
  },
]

const CATS = ['Semua', 'PC & Laptop', 'Jaringan', 'CCTV', 'Software', 'Keamanan']

export default function Articles() {
  const [active, setActive] = useState('Semua')
  const filtered = active === 'Semua' ? ARTICLES : ARTICLES.filter(a => a.cat === active)

  return (
    <main className="articles-page">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pre-label">
              <TbBook size={14} /> Tips & Edukasi
            </span>
            <h1>Artikel <span className="gradient-text">IT Cilegon</span></h1>
            <p className="page-hero-desc">Konten edukatif seputar teknologi, tips perawatan perangkat, dan panduan memilih layanan IT yang tepat.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {CATS.map(cat => (
              <button key={cat} className={`filter-btn ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {filtered.map((art, i) => {
              const ArtIcon = art.icon
              return (
                <motion.article
                  key={art.id}
                  className="article-card"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="article-icon-wrap">
                    <span className="article-icon">
                      {ArtIcon && <ArtIcon size={24} />}
                    </span>
                  </div>
                  <div className="article-meta">
                    <span className="article-cat">{art.cat}</span>
                    <span className="article-date">{art.date}</span>
                  </div>
                  <h3>{art.title}</h3>
                  <p>{art.excerpt}</p>
                  <div className="article-footer">
                    <span className="read-time">
                      <TbClock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      {art.readTime} baca
                    </span>
                    <button className="read-btn">Baca →</button>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

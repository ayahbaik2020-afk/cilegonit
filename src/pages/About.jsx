import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  TbCpu,
  TbNetwork,
  TbDeviceCctv,
  TbCode,
  TbTool,
  TbServer,
  TbTarget,
  TbBolt,
  TbShieldCheck,
  TbDiamond,
  TbUsers,
  TbHistory,
  TbBulb,
  TbInfoCircle,
} from 'react-icons/tb'
import StatsCounter from '../components/ui/StatsCounter'
import './About.css'

const TEAM = [
  { name: 'Ahmad Fauzi', role: 'Founder & Network Engineer', exp: '10 Tahun', icon: TbNetwork },
  { name: 'Rizky Pratama', role: 'PC & Hardware Specialist', exp: '8 Tahun', icon: TbTool },
  { name: 'Dewi Sartika', role: 'Software Developer', exp: '6 Tahun', icon: TbCode },
  { name: 'Budi Santoso', role: 'CCTV & Security Expert', exp: '7 Tahun', icon: TbDeviceCctv },
]

const VALUES = [
  { icon: TbTarget, title: 'Tepat Sasaran', desc: 'Kami mendengarkan kebutuhan Anda dan memberikan solusi yang sesuai, bukan yang berlebihan.' },
  { icon: TbBolt, title: 'Cepat & Efisien', desc: 'Respons cepat dan pengerjaan tepat waktu karena kami tahu waktu Anda sangat berharga.' },
  { icon: TbShieldCheck, title: 'Bergaransi', desc: 'Setiap pekerjaan kami berikan garansi resmi agar Anda bisa beristirahat dengan tenang.' },
  { icon: TbDiamond, title: 'Kualitas Premium', desc: 'Menggunakan spare part original dan teknisi bersertifikat untuk hasil terbaik.' },
]

const STATS = [
  { value: '500', suffix: '+', label: 'Pelanggan' },
  { value: '8', suffix: ' Thn', label: 'Pengalaman' },
  { value: '4', suffix: '', label: 'Spesialis IT' },
  { value: '98', suffix: '%', label: 'Kepuasan' },
]

const STORY_ICONS = [TbCpu, TbNetwork, TbDeviceCctv, TbCode, TbTool, TbServer]

export default function About() {
  return (
    <main className="about-page">
      {/* PAGE HEADER */}
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pre-label">
              <TbInfoCircle size={14} /> Siapa Kami
            </span>
            <h1>Tentang <span className="gradient-text">Cilegon IT</span></h1>
            <p className="page-hero-desc">Kami adalah tim teknisi IT profesional yang berkomitmen menghadirkan solusi teknologi berkualitas tinggi untuk masyarakat dan bisnis di Cilegon dan sekitarnya.</p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container story-grid">
          <motion.div
            className="story-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="story-img-box">
              <div className="story-badge">Est. 2016</div>
              <div className="story-emoji-grid">
                {STORY_ICONS.map((Icon, i) => (
                  <div key={i} className="emoji-card">
                    <Icon size={32} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="story-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="pre-label">
              <TbHistory size={14} /> Cerita Kami
            </span>
            <h2>Lahir dari Semangat <span className="gradient-text">Membangun</span> Cilegon</h2>
            <p style={{ marginBottom: '1rem' }}>Cilegon IT didirikan pada tahun 2016 oleh Ahmad Fauzi, seorang teknisi IT yang berpengalaman di industri selama lebih dari satu dekade. Bermula dari toko kecil servis komputer, kini kami telah berkembang menjadi penyedia layanan IT lengkap.</p>
            <p style={{ marginBottom: '1.5rem' }}>Dengan tim yang solid dan berdedikasi, kami telah melayani lebih dari 500 pelanggan — dari rumah tangga, UMKM, hingga perusahaan besar di kawasan industri Cilegon.</p>
            <Link to="/contact" className="btn btn-primary">Hubungi Kami</Link>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="pre-label">
              <TbBulb size={14} /> Prinsip Kerja Kami
            </span>
            <h2>Mengapa Memilih <span className="gradient-text">Kami?</span></h2>
          </div>
          <div className="grid-4">
            {VALUES.map((v, i) => {
              const ValueIcon = v.icon
              return (
                <motion.div
                  key={i}
                  className="card value-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="value-icon">
                    {ValueIcon && <ValueIcon size={24} />}
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="pre-label">
              <TbUsers size={14} /> Tim Kami
            </span>
            <h2>Para <span className="gradient-text">Ahli</span> di Balik Layanan</h2>
            <p>Setiap anggota tim kami adalah spesialis bersertifikat di bidangnya masing-masing.</p>
          </div>
          <div className="grid-4">
            {TEAM.map((member, i) => {
              const AvatarIcon = member.icon
              return (
                <motion.div
                  key={i}
                  className="card team-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="team-avatar">
                    {AvatarIcon && <AvatarIcon size={32} />}
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <span className="team-exp">{member.exp} Pengalaman</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

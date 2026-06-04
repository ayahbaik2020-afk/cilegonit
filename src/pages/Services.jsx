import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TbCpu, TbNetwork, TbDeviceCctv, TbCode, TbServer, TbBrandWhatsapp, TbSettings, TbCheck } from 'react-icons/tb'
import ServiceAnimation from '../components/ui/ServiceAnimation'
import './Services.css'

const SERVICES_DETAIL = [
  {
    id: 'pc',
    icon: TbCpu,
    title: 'Servis & Rakit PC',
    tagline: 'Dari diagnosa hingga rakitan custom',
    desc: 'Tim teknisi kami siap menangani semua masalah PC Anda — dari yang lambat hingga mati total. Kami juga melayani rakit PC custom sesuai kebutuhan gaming, desain grafis, atau kebutuhan kantor.',
    items: [
      'Diagnosa & tune-up PC/laptop',
      'Upgrade RAM, SSD, VGA',
      'Install ulang Windows / Linux',
      'Rakit PC custom gaming & workstation',
      'Cleaning hardware & thermal paste',
      'Perbaikan motherboard & power supply',
    ],
    wa: 'Saya ingin servis/rakit PC',
  },
  {
    id: 'network',
    icon: TbNetwork,
    title: 'Instalasi Jaringan',
    tagline: 'LAN, WiFi, Fiber Optik, Mikrotik',
    desc: 'Kami merancang dan membangun infrastruktur jaringan yang handal untuk rumah, kantor, maupun skala industri. Mulai dari instalasi kabel CAT6, konfigurasi router Mikrotik, hingga tarik fiber optik.',
    items: [
      'Pasang jaringan LAN CAT5/6',
      'WiFi enterprise (Ubiquiti, TP-Link)',
      'Konfigurasi router & Mikrotik',
      'Tarik kabel fiber optik',
      'VLAN & network security',
      'Internet sharing & bandwidth management',
    ],
    wa: 'Saya ingin konsultasi instalasi jaringan',
  },
  {
    id: 'cctv',
    icon: TbDeviceCctv,
    title: 'Pasang CCTV',
    tagline: 'Keamanan 24 jam via smartphone',
    desc: 'Lindungi aset Anda dengan sistem CCTV profesional. Kami menyediakan kamera HD hingga 4K dengan kemampuan night vision, motion detection, dan pemantauan jarak jauh melalui smartphone.',
    items: [
      'CCTV HD & 4K indoor/outdoor',
      'Night vision & wide angle',
      'Remote monitoring via smartphone',
      'DVR / NVR recording',
      'Anti-petir & weatherproof',
      'Garansi unit & pemasangan',
    ],
    wa: 'Saya ingin pasang CCTV',
  },
  {
    id: 'software',
    icon: TbCode,
    title: 'Pengembangan Software',
    tagline: 'Website & aplikasi sesuai kebutuhan bisnis',
    desc: 'Tim developer kami siap membantu mewujudkan ide digital Anda — dari website company profile, toko online, sistem informasi perusahaan, hingga aplikasi mobile Android/iOS.',
    items: [
      'Website company profile & landing page',
      'Toko online (e-commerce)',
      'Sistem informasi & ERP',
      'Aplikasi mobile Android/iOS',
      'Sistem absensi & HR',
      'Integrasi API & database',
    ],
    wa: 'Saya ingin diskusikan proyek software/website',
  },
  {
    id: 'server',
    icon: TbServer,
    title: 'Solusi Server & Hosting',
    tagline: 'Infrastruktur IT yang andal dan scalable',
    desc: 'Kami membantu bisnis Anda memiliki infrastruktur server yang handal — dari server lokal, NAS, cloud hosting, hingga manajemen domain dan SSL.',
    items: [
      'Instalasi & konfigurasi server',
      'NAS (Network Attached Storage)',
      'Cloud backup & disaster recovery',
      'Domain & SSL management',
      'Server monitoring 24/7',
      'Virtualisasi (VMware, Proxmox)',
    ],
    wa: 'Saya ingin konsultasi solusi server',
  },
]

export default function Services() {
  return (
    <main className="services-page">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pre-label">
              <TbSettings size={14} /> Yang Kami Kerjakan
            </span>
            <h1>Layanan <span className="gradient-text">IT Lengkap</span></h1>
            <p className="page-hero-desc">Semua kebutuhan teknologi Anda, kami tangani dengan profesional, bergaransi, dan harga transparan.</p>
          </motion.div>
        </div>
      </section>

      {SERVICES_DETAIL.map((svc, i) => {
        const IconComponent = svc.icon
        return (
          <section key={svc.id} id={svc.id} className={`section service-detail-section ${i % 2 === 1 ? 'alt-bg' : ''}`}>
            <div className="container">
              <div className={`service-detail-grid ${i % 2 === 1 ? 'reverse' : ''}`}>
                <motion.div
                  className="service-3d-box"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ServiceAnimation serviceId={svc.id} />
                </motion.div>

                <motion.div
                  className="service-detail-text"
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="service-detail-icon">
                    {IconComponent && <IconComponent size={32} />}
                  </div>
                  <span className="pre-label">{svc.tagline}</span>
                  <h2>{svc.title}</h2>
                  <p className="service-detail-desc">{svc.desc}</p>
                  <ul className="service-items">
                    {svc.items.map((item, j) => (
                      <li key={j}>
                        <span className="tick">
                          <TbCheck size={14} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/6285337016608?text=${encodeURIComponent(svc.wa)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    <TbBrandWhatsapp size={16} /> Konsultasi Gratis
                  </a>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}
    </main>
  )
}

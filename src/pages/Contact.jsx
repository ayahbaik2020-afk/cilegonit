import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbMapPin,
  TbBrandWhatsapp,
  TbClock,
  TbMail,
  TbPhoneCall,
  TbSend,
  TbCircleCheck,
} from 'react-icons/tb'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const msg = `Halo CilegonIT!%0A%0ANama: ${form.name}%0ANo. HP: ${form.phone}%0ALayanan: ${form.service}%0APesan: ${form.message}`
    window.open(`https://wa.me/6285337016608?text=${msg}`, '_blank')
    setSent(true)
  }

  const CONTACT_INFO = [
    { icon: TbMapPin, label: 'Lokasi', value: 'Cilegon, Banten, Indonesia', sub: 'Area layanan: Cilegon, Serang, Anyer' },
    { icon: TbBrandWhatsapp, label: 'WhatsApp', value: '+62 853-3701-6608', sub: 'Respons cepat via chat' },
    { icon: TbClock, label: 'Jam Operasional', value: 'Senin – Sabtu', sub: '08.00 – 20.00 WIB' },
    { icon: TbMail, label: 'Email', value: 'info@cilegonit.com', sub: 'Balasan dalam 24 jam' },
  ]

  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pre-label">
              <TbPhoneCall size={14} /> Hubungi Kami
            </span>
            <h1>Mari <span className="gradient-text">Berkolaborasi</span></h1>
            <p className="page-hero-desc">Punya pertanyaan atau butuh solusi IT? Tim kami siap membantu Anda 6 hari seminggu.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Informasi <span className="gradient-text">Kontak</span></h2>
            <p style={{ marginBottom: '2rem' }}>Jangan ragu untuk menghubungi kami. Kami senang mendiskusikan kebutuhan teknologi Anda.</p>

            <div className="contact-cards">
              {CONTACT_INFO.map((c, i) => {
                const CardIcon = c.icon
                return (
                  <div key={i} className="contact-info-card">
                    <div className="contact-icon">
                      {CardIcon && <CardIcon size={20} />}
                    </div>
                    <div>
                      <div className="contact-label">{c.label}</div>
                      <div className="contact-value">{c.value}</div>
                      <div className="contact-sub">{c.sub}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <a
              href="https://wa.me/6285337016608"
              target="_blank"
              rel="noreferrer"
              className="btn btn-success wa-big-btn"
            >
              <TbBrandWhatsapp size={18} /> Langsung Chat WhatsApp
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {sent ? (
              <div className="success-box">
                <div className="success-icon">
                  <TbCircleCheck size={48} />
                </div>
                <h3>Pesan Terkirim!</h3>
                <p>Anda akan diarahkan ke WhatsApp. Kami akan segera merespons pesan Anda.</p>
                <button className="btn btn-secondary" onClick={() => setSent(false)}>Kirim Pesan Lain</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Kirim Pesan</h3>
                <p style={{ marginBottom: '1.5rem' }}>Isi formulir ini dan kami akan menghubungi Anda via WhatsApp.</p>

                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap *</label>
                  <input id="name" name="name" type="text" placeholder="Masukkan nama Anda" value={form.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Nomor WhatsApp *</label>
                  <input id="phone" name="phone" type="tel" placeholder="Contoh: 08123456789" value={form.phone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Layanan yang Dibutuhkan</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">-- Pilih Layanan --</option>
                    <option value="Servis & Rakit PC">Servis & Rakit PC</option>
                    <option value="Instalasi Jaringan">Instalasi Jaringan</option>
                    <option value="Pasang CCTV">Pasang CCTV</option>
                    <option value="Pengembangan Software/Website">Pengembangan Software/Website</option>
                    <option value="Solusi Server">Solusi Server</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Ceritakan Kebutuhan Anda *</label>
                  <textarea id="message" name="message" rows={5} placeholder="Jelaskan masalah atau kebutuhan IT Anda secara singkat..." value={form.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <TbSend size={16} /> Kirim via WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

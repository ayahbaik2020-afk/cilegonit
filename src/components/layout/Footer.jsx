import { Link } from 'react-router-dom'
import {
  TbMapPin,
  TbPhone,
  TbClock,
  TbBrandWhatsapp,
  TbBrandInstagram,
  TbBrandFacebook,
  TbHeart,
} from 'react-icons/tb'
import './Footer.css'

const LINKS = {
  Layanan: [
    { label: 'Servis & Rakit PC', to: '/services#pc' },
    { label: 'Instalasi Jaringan', to: '/services#network' },
    { label: 'Pasang CCTV', to: '/services#cctv' },
    { label: 'Pengembangan Software', to: '/services#software' },
  ],
  Navigasi: [
    { label: 'Beranda', to: '/' },
    { label: 'Tentang Kami', to: '/about' },
    { label: 'Portofolio', to: '/portfolio' },
    { label: 'Artikel', to: '/articles' },
    { label: 'Kontak', to: '/contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">⟨C⟩</span>
            <span className="logo-text">Cilegon<span className="logo-accent">IT</span></span>
          </div>
          <p>Solusi teknologi terpercaya di Cilegon & sekitarnya. Profesional, cepat, bergaransi.</p>
          <div className="footer-contact-info">
            <div className="contact-item">
              <TbMapPin size={16} />
              <span>Cilegon, Banten, Indonesia</span>
            </div>
            <div className="contact-item">
              <TbPhone size={16} />
              <a href="https://wa.me/6285337016608" target="_blank" rel="noreferrer">+62 853-3701-6608</a>
            </div>
            <div className="contact-item">
              <TbClock size={16} />
              <span>Senin – Sabtu: 08.00 – 20.00 WIB</span>
            </div>
          </div>
        </div>

        {Object.entries(LINKS).map(([title, links]) => (
          <div key={title} className="footer-col">
            <h4>{title}</h4>
            <ul>
              {links.map(({ label, to }) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col">
          <h4>Sosial Media</h4>
          <div className="social-links">
            <a href="https://wa.me/6285337016608" target="_blank" rel="noreferrer" className="social-btn whatsapp">
              <TbBrandWhatsapp size={14} /> WhatsApp
            </a>
            <a href="https://instagram.com/cilegonit" target="_blank" rel="noreferrer" className="social-btn instagram">
              <TbBrandInstagram size={14} /> Instagram
            </a>
            <a href="https://facebook.com/cilegonit" target="_blank" rel="noreferrer" className="social-btn facebook">
              <TbBrandFacebook size={14} /> Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {year} CilegonIT. Hak Cipta Dilindungi.</p>
          <p>
            Dibuat dengan{' '}
            <TbHeart
              size={12}
              style={{ color: '#EF4444', fill: '#EF4444', verticalAlign: 'middle', margin: '0 2px' }}
            />{' '}
            di Cilegon, Banten
          </p>
        </div>
      </div>
    </footer>
  )
}

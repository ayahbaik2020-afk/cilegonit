import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbTool,
  TbNetwork,
  TbDeviceCctv,
  TbCode,
  TbBolt,
  TbBulb,
  TbBrandWhatsapp,
} from 'react-icons/tb'
import './DiagnosisQuiz.css'

const QUESTIONS = [
  {
    id: 'issue',
    question: 'Apa masalah utama yang Anda hadapi?',
    options: [
      { label: 'Komputer lambat / sering hang', value: 'pc-slow' },
      { label: 'Internet / jaringan bermasalah', value: 'network' },
      { label: 'Butuh CCTV atau keamanan', value: 'cctv' },
      { label: 'Butuh aplikasi / website', value: 'software' },
      { label: 'Komputer mati / kerusakan hardware', value: 'pc-dead' },
    ],
  },
  {
    id: 'urgency',
    question: 'Seberapa mendesak kebutuhan Anda?',
    options: [
      { label: 'Sangat mendesak (hari ini / besok)', value: 'urgent' },
      { label: 'Dalam minggu ini', value: 'week' },
      { label: 'Dalam bulan ini', value: 'month' },
      { label: 'Saya masih survei', value: 'survey' },
    ],
  },
]

const RESULTS = {
  'pc-slow': {
    icon: TbTool,
    title: 'Servis & Optimasi PC',
    desc: 'PC Anda butuh tune-up! Kami bisa membersihkan, upgrade RAM/SSD, dan re-install OS agar performa kembali prima.',
    action: 'Jadwalkan Servis',
    href: 'https://wa.me/6285337016608?text=Saya%20ingin%20servis%20PC%20yang%20lambat',
  },
  'network': {
    icon: TbNetwork,
    title: 'Instalasi Jaringan',
    desc: 'Kami siap instalasi LAN, WiFi enterprise, or fiber optic untuk rumah & kantor Anda.',
    action: 'Konsultasi Jaringan',
    href: 'https://wa.me/6285337016608?text=Saya%20butuh%20konsultasi%20jaringan',
  },
  'cctv': {
    icon: TbDeviceCctv,
    title: 'Pasang CCTV',
    desc: 'Pasang CCTV HD indoor/outdoor dengan monitoring jarak jauh lewat smartphone.',
    action: 'Pasang CCTV Sekarang',
    href: 'https://wa.me/6285337016608?text=Saya%20ingin%20pasang%20CCTV',
  },
  'software': {
    icon: TbCode,
    title: 'Pengembangan Software',
    desc: 'Butuh website, sistem kasir, atau aplikasi custom? Tim developer kami siap membantu.',
    action: 'Diskusikan Proyek',
    href: 'https://wa.me/6285337016608?text=Saya%20ingin%20buat%20software%20atau%20website',
  },
  'pc-dead': {
    icon: TbBolt,
    title: 'Perbaikan Hardware',
    desc: 'Dari ganti motherboard, PSU, hingga recovery data — kami tangani dengan diagnosa akurat.',
    action: 'Bawa ke Bengkel',
    href: 'https://wa.me/6285337016608?text=PC%20saya%20mati%20total,%20butuh%20perbaikan',
  },
}

export default function DiagnosisQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const currentQ = QUESTIONS[step]

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setResult(RESULTS[newAnswers.issue] || RESULTS['pc-slow'])
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setResult(null) }

  return (
    <div className="quiz-wrapper">
      <div className="quiz-header">
        <span className="quiz-badge">
          <TbBulb size={12} /> Tools Gratis
        </span>
        <h3>Diagnosis IT Mandiri</h3>
        <p>Jawab 2 pertanyaan singkat — kami rekomendasikan solusi terbaik untuk Anda.</p>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={step}
            className="quiz-body"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="quiz-progress">
              <div className="progress-bar" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
            </div>
            <p className="quiz-step">Pertanyaan {step + 1} dari {QUESTIONS.length}</p>
            <h4 className="quiz-question">{currentQ.question}</h4>
            <div className="quiz-options">
              {currentQ.options.map((opt) => (
                <button key={opt.value} className="quiz-option" onClick={() => handleAnswer(opt.value)}>
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className="quiz-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              const ResultIcon = result.icon
              return (
                <h4>
                  {ResultIcon && <ResultIcon size={20} style={{ color: 'var(--primary)' }} />}
                  {result.title}
                </h4>
              )
            })()}
            <p>{result.desc}</p>
            <div className="quiz-result-actions">
              <a href={result.href} target="_blank" rel="noreferrer" className="btn btn-success">
                <TbBrandWhatsapp size={16} /> {result.action}
              </a>
              <button className="btn btn-secondary" onClick={reset}>Ulangi Quiz</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useRef } from 'react'

export default function StatsCounter({ stats }) {
  const refs = useRef([])
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          stats.forEach((stat, i) => {
            const el = refs.current[i]
            if (!el) return
            const target = parseInt(stat.value)
            let start = 0
            const step = Math.ceil(target / 60)
            const interval = setInterval(() => {
              start += step
              if (start >= target) { start = target; clearInterval(interval) }
              el.textContent = start + (stat.suffix || '')
            }, 25)
          })
        }
      },
      { threshold: 0.5 }
    )
    if (refs.current[0]) observer.observe(refs.current[0].parentElement.parentElement)
    return () => observer.disconnect()
  }, [stats])

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div key={i} className="stat-item">
          <div className="stat-value" ref={(el) => (refs.current[i] = el)}>
            0{stat.suffix || ''}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

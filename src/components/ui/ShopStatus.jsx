import { useState, useEffect } from 'react'
import './ShopStatus.css'

const OPEN_HOUR  = 8
const CLOSE_HOUR = 20

export default function ShopStatus() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const check = () => {
      const now  = new Date()
      const day  = now.getDay()
      const hour = now.getHours()
      const isWeekday = day >= 1 && day <= 6
      setStatus(isWeekday && hour >= OPEN_HOUR && hour < CLOSE_HOUR)
    }
    check()
    const timer = setInterval(check, 60000)
    return () => clearInterval(timer)
  }, [])

  if (status === null) return null

  return (
    <div className={`shop-sign-wrapper ${status ? 'open' : 'closed'}`}>
      {/* Hanging chain/hook */}
      <div className="shop-sign-chain">
        <span className="chain-link" />
        <span className="chain-link" />
        <span className="chain-link" />
      </div>

      {/* The sign board */}
      <div className="shop-sign-board">
        {/* Screw top-left */}
        <span className="sign-screw tl" />
        {/* Screw top-right */}
        <span className="sign-screw tr" />

        <div className="sign-inner">
          {/* Status indicator dot */}
          <span className="sign-dot" />
          <div className="sign-text-block">
            <span className="sign-label">
              {status ? 'OPEN' : 'CLOSED'}
            </span>
            <span className="sign-sublabel">
              {status ? 'NOW · 08:00–20:00' : 'Buka Sen–Sab 08–20'}
            </span>
          </div>
        </div>

        {/* Screw bottom-left */}
        <span className="sign-screw bl" />
        {/* Screw bottom-right */}
        <span className="sign-screw br" />
      </div>
    </div>
  )
}

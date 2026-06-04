import './ServiceAnimation.css'

/* ─── PC / Servis & Rakit PC ─────────────────────────────────────────────── */
function PCAnimation() {
  return (
    <div className="svc-anim pc-anim">
      {/* Monitor */}
      <div className="pc-monitor">
        <div className="pc-screen">
          <div className="pc-screen-line l1" />
          <div className="pc-screen-line l2" />
          <div className="pc-screen-line l3" />
          <div className="pc-screen-cursor" />
          <div className="pc-bar-row">
            <div className="pc-bar b1" />
            <div className="pc-bar b2" />
            <div className="pc-bar b3" />
          </div>
        </div>
        <div className="pc-stand" />
        <div className="pc-base" />
      </div>
      {/* Tower */}
      <div className="pc-tower">
        <div className="pc-tower-stripe" />
        <div className="pc-power-btn" />
        <div className="pc-usb-row">
          <div className="pc-usb-slot" />
          <div className="pc-usb-slot" />
        </div>
        <div className="pc-disk-slot" />
        <div className="pc-fan">
          <div className="fan-blade b1" />
          <div className="fan-blade b2" />
          <div className="fan-blade b3" />
          <div className="fan-hub" />
        </div>
      </div>
      {/* Floating components */}
      <div className="float-chip chip1">CPU</div>
      <div className="float-chip chip2">RAM</div>
      <div className="float-chip chip3">GPU</div>
      {/* Tools */}
      <div className="pc-wrench" />
    </div>
  )
}

/* ─── Network / Instalasi Jaringan ──────────────────────────────────────── */
function NetworkAnimation() {
  return (
    <div className="svc-anim net-anim">
      {/* Central router */}
      <div className="router">
        <div className="router-body">
          <div className="router-led r1" />
          <div className="router-led r2" />
          <div className="router-led r3" />
        </div>
        <div className="router-ant a1" />
        <div className="router-ant a2" />
        <div className="router-ant a3" />
        {/* WiFi rings */}
        <div className="wifi-ring ring1" />
        <div className="wifi-ring ring2" />
        <div className="wifi-ring ring3" />
      </div>
      {/* Connected nodes */}
      <div className="net-node n1"><span>PC</span></div>
      <div className="net-node n2"><span>📱</span></div>
      <div className="net-node n3"><span>🖨</span></div>
      <div className="net-node n4"><span>TV</span></div>
      {/* Data packets on lines */}
      <svg className="net-lines" viewBox="0 0 320 240" fill="none">
        <line x1="160" y1="105" x2="60"  y2="50"  stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="160" y1="105" x2="260" y2="50"  stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="160" y1="105" x2="60"  y2="190" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="160" y1="105" x2="260" y2="190" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Animated packets */}
        <circle className="pkt pkt1" r="4" fill="#60a5fa" />
        <circle className="pkt pkt2" r="4" fill="#818cf8" />
        <circle className="pkt pkt3" r="4" fill="#34d399" />
        <circle className="pkt pkt4" r="4" fill="#f472b6" />
      </svg>
    </div>
  )
}

/* ─── CCTV / Pasang CCTV ─────────────────────────────────────────────────── */
function CCTVAnimation() {
  return (
    <div className="svc-anim cctv-anim">
      {/* Camera on bracket */}
      <div className="cctv-bracket">
        <div className="cctv-arm" />
        <div className="cctv-camera">
          <div className="cctv-lens">
            <div className="cctv-lens-inner" />
          </div>
          <div className="cctv-ir-row">
            <span className="cctv-ir" />
            <span className="cctv-ir" />
            <span className="cctv-ir" />
            <span className="cctv-ir" />
          </div>
        </div>
      </div>
      {/* Scan cone / area */}
      <div className="cctv-scan-cone" />
      {/* Monitor preview */}
      <div className="cctv-monitor">
        <div className="cctv-feed">
          <div className="feed-grid">
            <div className="feed-cell active" />
            <div className="feed-cell" />
            <div className="feed-cell" />
            <div className="feed-cell" />
          </div>
          <div className="feed-rec"><span className="rec-dot" />REC</div>
          <div className="feed-time">00:00</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Software / Pengembangan Software ──────────────────────────────────── */
function SoftwareAnimation() {
  return (
    <div className="svc-anim sw-anim">
      {/* Browser window */}
      <div className="browser-window">
        <div className="browser-bar">
          <div className="browser-dots">
            <span className="bd red" /><span className="bd yellow" /><span className="bd green" />
          </div>
          <div className="browser-url">cilegonit.com/app</div>
        </div>
        <div className="browser-body">
          {/* Code lines */}
          <div className="code-line cl1"><span className="kw">const</span> <span className="fn">app</span> = <span className="str">"CilegonIT"</span></div>
          <div className="code-line cl2"><span className="kw">function</span> <span className="fn">build</span>() {'{'}</div>
          <div className="code-line cl3 indent"><span className="kw">return</span> <span className="str">&lt;App /&gt;</span></div>
          <div className="code-line cl4">{'}'}</div>
          <div className="code-cursor" />
          {/* Build progress */}
          <div className="build-bar-wrap">
            <span className="build-label">Building…</span>
            <div className="build-bar"><div className="build-fill" /></div>
          </div>
        </div>
      </div>
      {/* Floating tech badges */}
      <div className="tech-badge tb1">React</div>
      <div className="tech-badge tb2">Node</div>
      <div className="tech-badge tb3">DB</div>
    </div>
  )
}

/* ─── Server / Solusi Server ─────────────────────────────────────────────── */
function ServerAnimation() {
  return (
    <div className="svc-anim srv-anim">
      {/* Rack cabinet */}
      <div className="rack">
        <div className="rack-top-rail" />
        {[0,1,2,3,4].map(i => (
          <div key={i} className={`rack-unit ru${i}`}>
            <div className="ru-brand" />
            <div className="ru-leds">
              <span className={`ru-led green ${i%2===0?'pulse':''}`} />
              <span className={`ru-led ${i===2?'orange blink':'green'}`} />
              <span className="ru-led green" />
            </div>
            <div className="ru-bars">
              <div className="ru-bar" style={{width:`${55+i*8}%`}} />
            </div>
            <div className="ru-ports">
              <span className="ru-port" /><span className="ru-port" />
            </div>
          </div>
        ))}
        <div className="rack-bottom-rail" />
      </div>
      {/* Activity metrics */}
      <div className="srv-metrics">
        <div className="srv-metric">
          <span className="srv-metric-label">CPU</span>
          <div className="srv-metric-bar"><div className="srv-fill cpu-fill" /></div>
        </div>
        <div className="srv-metric">
          <span className="srv-metric-label">RAM</span>
          <div className="srv-metric-bar"><div className="srv-fill ram-fill" /></div>
        </div>
        <div className="srv-metric">
          <span className="srv-metric-label">NET</span>
          <div className="srv-metric-bar"><div className="srv-fill net-fill" /></div>
        </div>
      </div>
    </div>
  )
}

/* ─── Dispatcher ─────────────────────────────────────────────────────────── */
const ANIM_MAP = {
  pc:       PCAnimation,
  network:  NetworkAnimation,
  cctv:     CCTVAnimation,
  software: SoftwareAnimation,
  server:   ServerAnimation,
}

export default function ServiceAnimation({ serviceId }) {
  const Anim = ANIM_MAP[serviceId] || PCAnimation
  return (
    <div className="svc-anim-container">
      <Anim />
    </div>
  )
}

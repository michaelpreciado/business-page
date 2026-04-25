const ITEMS = [
  'OpenClaw', 'F.R.I.D.A.Y.', 'AI Workflows', 'Robotics',
  '@preciado.tech', 'Local LLM', 'Automation', 'Robot Arm',
  'Maker', 'AI Consultant', 'Open Source', 'TikTok',
]

export default function Marquee() {
  return (
    <div className="marquee-outer" aria-hidden="true">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-sep" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

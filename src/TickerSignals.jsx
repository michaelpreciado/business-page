import { useRef, useEffect } from 'react'
import EmailCapture from './EmailCapture.jsx'

const Icon = ({ d, size = 18, stroke = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)
const ArrowRight = (p) => <Icon {...p} d={<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>} />
const ArrowUpRight = (p) => <Icon {...p} d={<><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>} />

/* ─── Signal card mock ─── */
const SIGNAL_MOCK = {
  ticker: 'NVDA',
  price: 198.94,
  change: -0.65,
  changePct: -0.32,
  signal: 'MOMENTUM PULLBACK',
  description: 'Pulling back to 20-day MA support ($197.25), RSI 58.6 gives room to run. Above both MAs, trend intact.',
  entry: '$198.50 - $199.50',
  stop: '$195.00',
  target: '$210.00',
  confidence: 72,
  horizon: '3-7 days',
  badge: 'Long',
}

const SignalBadge = ({ type }) => (
  <span className={`signal-badge signal-badge--${type.toLowerCase()}`}>{type}</span>
)

const TrendArrow = ({ pct }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: pct >= 0 ? 'oklch(0.78 0.18 145)' : 'oklch(0.65 0.2 25)' }}>
    {pct >= 0
      ? <><polyline points="18 15 12 9 6 15" /><line x1="12" y1="9" x2="12" y2="21"/></>
      : <><polyline points="6 9 12 15 18 9" /><line x1="12" y1="3" x2="12" y2="15"/></>
    }
  </svg>
)

const SignalCard = ({ signal }) => (
  <div className="ticker-signal-card">
    <div className="ticker-signal-header">
      <div className="ticker-signal-identity">
        <span className="ticker-symbol">{signal.ticker}</span>
        <SignalBadge type={signal.badge} />
      </div>
      <div className="ticker-signal-price-block">
        <span className="ticker-price">${signal.price.toFixed(2)}</span>
        <span className="ticker-change" style={{ color: signal.change >= 0 ? 'oklch(0.78 0.18 145)' : 'oklch(0.65 0.2 25)' }}>
          <TrendArrow pct={signal.change} />
          {signal.change >= 0 ? '+' : ''}{signal.change.toFixed(2)} ({signal.changePct.toFixed(2)}%)
        </span>
      </div>
    </div>

    <div className="ticker-signal-body">
      <div className="ticker-signal-tag">{signal.signal}</div>
      <p className="ticker-signal-desc">{signal.description}</p>
    </div>

    <div className="ticker-signal-levels">
      <div className="ticker-level">
        <span className="level-label">Entry</span>
        <span className="level-value">{signal.entry}</span>
      </div>
      <div className="ticker-level">
        <span className="level-label">Stop</span>
        <span className="level-value level-stop">{signal.stop}</span>
      </div>
      <div className="ticker-level">
        <span className="level-label">Target</span>
        <span className="level-value level-target">{signal.target}</span>
      </div>
    </div>

    <div className="ticker-signal-footer">
      <div className="ticker-confidence">
        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: `${signal.confidence}%` }} />
        </div>
        <span className="confidence-label">{signal.confidence}% confidence</span>
      </div>
      <div className="ticker-horizon">Horizon: {signal.horizon}</div>
    </div>
  </div>
)

/* ─── How it works steps ─── */
const HOW_STEPS = [
  {
    n: '01',
    title: 'Ticker scans the market',
    body: 'Our AI agent continuously monitors stocks, options, and ETF signals across momentum, mean-reversion, and trend-following strategies.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Validates and scores each signal',
    body: 'Every signal is checked against volume, RSI, moving averages, and macro context. Low-confidence setups are filtered out.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Delivers actionable alerts',
    body: 'You get a clean signal card: entry, stop, target, and confidence -- no noise, no jargon, no 50-page reports.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
  },
]

/* ─── Pricing tiers ─── */
const TIERS = [
  {
    name: 'Pro',
    price: '$5',
    period: '/month',
    tagline: 'Weekly stock picks for $5/month.',
    features: [
      'Weekly email: 1–3 stocks with supporting news',
      'Entry · Stop · Target · Confidence',
      'Supporting news articles for every pick',
      'Email delivery directly to your inbox',
    ],
    cta: 'Get Pro access',
    ctaHref: 'https://buy.stripe.com/aFacMX7q03C20uS7AX4Ni00',
    highlight: true,
  },
]

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

/* ─── FAQ ─── */
const FAQS = [
  {
    q: 'Are these financial advice?',
    a: 'No. Ticker Signals are informational only -- not financial advice. Always do your own research before making any trade.',
  },
  {
    q: 'How does Ticker work?',
    a: 'Each Monday, Ticker scans the market and selects 1–3 high-confidence setups with supporting news. You receive a clean signal card per pick with entry, stop, target, and confidence score.',
  },
  {
    q: 'When do signals arrive?',
    a: 'Signals are sent every Monday morning. After subscribing, your first signal arrives the following Monday.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel through Stripe at any time — no contracts, no cancellation fees.',
  },
  {
    q: 'How do I pay?',
    a: 'Click Subscribe — it takes you to a secure Stripe checkout. Cancel anytime from your Stripe portal.',
  },
  {
    q: 'What brokers does this work with?',
    a: 'Signals are broker-agnostic. Ticker gives you the setup; you execute wherever you already trade.',
  },
]

/* ─── Component ─── */
export default function TickerSignals() {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add('in'))
    }, { threshold: 0.1 })
    el.querySelectorAll('.reveal').forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section className="ticker-section" id="signals" ref={cardRef}>

      {/* Hero */}
      <div className="wrap">
        <div className="ticker-hero reveal">
          <div className="ticker-hero-grid">
            <div className="ticker-hero-copy">
              <div className="section-head">
                <span className="eyebrow">New from Preciado Tech</span>
                <span className="eyebrow-num">Powered by Ticker</span>
                <span className="divider" />
              </div>
              <h2 className="ticker-hero-headline">
                1–3 stock picks.<br />
                <span>Supporting news. Every Monday.</span>
              </h2>
              <p className="ticker-hero-sub">
                Ticker scans the market every week and sends you actionable setups —
                entry, stop, target, confidence, and the latest news backing each pick.
                No noise. Just 1–3 ready-to-research picks in your inbox Monday morning.
              </p>
              <div className="ticker-hero-ctas">
                <a className="btn btn-primary" href="#ticker-pricing">
                  Get started <ArrowRight size={15} className="arrow" />
                </a>
              </div>
              <div className="signal-sample-badge">Sample signal card</div>
            </div>
            <div className="ticker-hero-card">
              <SignalCard signal={SIGNAL_MOCK} />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="wrap">
        <div className="ticker-pricing" id="ticker-pricing">
          <div className="section-head reveal">
            <span className="eyebrow">Pricing</span>
            <span className="eyebrow-num">Simple tiers</span>
            <span className="divider" />
          </div>
          <h2 className="reveal">One plan. No fluff. Just the signals.</h2>
          <div className="ticker-tiers">
            {TIERS.map((tier) => (
              <div className={`ticker-tier reveal ${tier.highlight ? 'ticker-tier--highlight' : ''}`} key={tier.name}>
                {tier.highlight && <div className="tier-badge">Most popular</div>}
                <div className="tier-name">{tier.name}</div>
                <div className="tier-price">{tier.price}<span className="tier-period">{tier.period}</span></div>
                <p className="tier-tagline">{tier.tagline}</p>
                <ul className="tier-features">
                  {tier.features.map((f) => (
                    <li key={f}><CheckIcon />{f}</li>
                  ))}
                </ul>
                <a className={`btn ${tier.highlight ? 'btn-primary' : 'btn-ghost'} tier-cta`} href={tier.ctaHref || '#contact'} target={tier.ctaHref ? '_blank' : undefined} rel={tier.ctaHref ? 'noopener noreferrer' : undefined}>
                  {tier.cta} <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="wrap">
        <div className="ticker-faq">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <span className="eyebrow-num">Honest answers</span>
            <span className="divider" />
          </div>
          <div className="faq-grid">
            {FAQS.map((faq) => (
              <div className="faq-item reveal" key={faq.q}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="wrap">
        <div className="ticker-disclaimer reveal">
          <p>
            <strong>Disclaimer:</strong> Ticker Signals are for informational and educational purposes only.
            They do not constitute financial advice. Past performance does not guarantee future results.
            Always consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>

    </section>
  )
}

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
    tagline: 'Daily trading setups for $5/month.',
    features: [
      'Daily stock signals (Mon–Fri)',
      'Entry · Stop · Target · Confidence',
      '1–3 supporting news articles per signal',
      'Weekly performance recap',
      'Email + Telegram delivery',
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
    q: 'How does Ticker find signals?',
    a: 'Ticker runs quantitative screening models across momentum, mean-reversion, and trend-following strategies, filtering by volume and technical indicators.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Monthly plans cancel at the end of your billing period. No contracts, no cancellation fees.',
  },
  {
    q: 'How do I pay for Pro?',
    a: 'Subscribe via Stripe -- simple, secure, cancel anytime. Your first signal arrives within 24 hours of subscribing.',
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
          <div className="section-head">
            <span className="eyebrow">New from Preciado Tech</span>
            <span className="eyebrow-num">Powered by Ticker</span>
            <span className="divider" />
          </div>
          <div className="ticker-hero-grid">
            <div className="ticker-hero-copy">
              <h2 className="ticker-hero-headline">
                Your AI stock scout.<br />
                <span>Daily signals, zero noise.</span>
              </h2>
              <p className="ticker-hero-sub">
                Ticker watches the market so you do not have to. Every day, it finds actionable
                setups, scores them by confidence, and sends you a clean signal card -- entry,
                stop, target, and why now.
              </p>
              <div className="ticker-hero-ctas">
                <a className="btn btn-primary" href="#ticker-pricing">
                  Get daily signals <ArrowRight size={15} className="arrow" />
                </a>
                <a className="btn btn-ghost" href="#ticker-how">
                  See how it works
                </a>
              </div>
              <div className="ticker-email-capture">
                <EmailCapture
                  title="Get your first signal free"
                  subtitle="Try Ticker for a week. We'll send you a real stock pick this Monday."
                  cta="Get Pro for $5/mo"
                  ctaHref="https://buy.stripe.com/aFacMX7q03C20uS7AX4Ni00"
                  mode="payment"
                />
              </div>
            </div>
            <div className="ticker-hero-card">
              <SignalCard signal={SIGNAL_MOCK} />
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="wrap">
        <div className="ticker-how" id="ticker-how">
          <div className="section-head reveal">
            <span className="eyebrow">How Ticker works</span>
            <span className="eyebrow-num">§ 01</span>
            <span className="divider" />
          </div>
          <div className="ticker-steps">
            {HOW_STEPS.map((step) => (
              <div className="ticker-step reveal" key={step.n}>
                <div className="step-icon-wrap">{step.icon}</div>
                <div className="step-num">STEP / {step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signal preview */}
      <div className="wrap">
        <div className="ticker-signal-demo reveal">
          <div className="section-head">
            <span className="eyebrow">Signal format</span>
            <span className="eyebrow-num">What you get</span>
            <span className="divider" />
          </div>
          <h2>Every alert is a complete trade setup.</h2>
          <p>No vague tips. No "I think this might go up." Every signal comes with a full setup: entry zone, stop loss, price target, confidence score, and the reason.</p>
          <div className="ticker-demo-grid">
            <SignalCard signal={SIGNAL_MOCK} />
            <div className="ticker-signal-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'oklch(0.78 0.18 145)' }} />
                <div>
                  <strong>Green dot</strong> -- Signal type (Long, Short, Momentum, Reversal)
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'oklch(0.82 0.09 255)' }} />
                <div>
                  <strong>Price + change</strong> -- Current price and intraday movement
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'oklch(0.72 0.15 265)' }} />
                <div>
                  <strong>Confidence bar</strong> -- 0-100% score based on technicals + volume
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'oklch(0.62 0.2 30)' }} />
                <div>
                  <strong>Levels</strong> -- Entry zone, hard stop, and price target
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'oklch(0.60 0.12 50)' }} />
                <div>
                  <strong>Horizon</strong> -- Expected time window (scalp, swing, position)
                </div>
              </div>
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
          <h2 className="reveal">Start free. Scale when you are ready.</h2>
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

import { useState, useEffect } from 'react'
import { useRef } from 'react'

const ArrowUpRight = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7"/><path d="M8 7h9v9"/>
  </svg>
)

const PACKAGES = [
  {
    name: 'Strategy Session',
    price: '$75',
    period: 'per hour',
    description: '1-hour "Where to Automate" consultation. Walk through your workflows, get a plain-English automation plan.',
    features: ['1-hour video call', 'Workflow audit', 'Plain-English plan', 'Tool recommendations'],
    cta: 'Book Strategy Call',
    highlight: false,
  },
  {
    name: 'Weekly Relief',
    price: '$97',
    period: 'per month',
    description: 'AI agents handle your follow-ups, weekly reports, and 1 small automation per month. Michael reviews outputs.',
    features: ['Lead follow-ups (AI-drafted)', 'Weekly busywork audit', '1 automation/month', 'Email support'],
    cta: 'Start Weekly Relief',
    highlight: true,
  },
  {
    name: 'AI Maintenance',
    price: '$49',
    period: 'per month',
    description: 'Keep your automations running smoothly. Michael monitors, tweaks, and updates your AI workflows.',
    features: ['Monitor automations', 'Tweak workflows', 'Update AI prompts', 'Priority support'],
    cta: 'Add Maintenance',
    highlight: false,
  },
]

const TESTIMONIALS = [
  { name: 'Sarah K.', business: 'Local Bakery', text: '"Michael helped us automate our order follow-ups. We now respond 3x faster and haven\'t missed a lead in months."', avatar: '🍞' },
  { name: 'James L.', business: 'IT Consultant', text: '"The weekly audit showed us 6 hours of busywork we didn\'t know we had. Worth every penny."', avatar: '💻' },
  { name: 'Maria G.', business: 'Real Estate', text: '"Now our inquiry forms auto-sort into our CRM. Game changer for our small team."', avatar: '🏠' },
]

const GlyphWorkflow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="12" r="2"/>
    <path d="M7 6c5 0 8 3 10 6"/><path d="M7 18c5 0 8-3 10-6"/>
  </svg>
)
const GlyphAutomation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="4" width="7" height="7" rx="1.5"/>
    <rect x="13" y="13" width="7" height="7" rx="1.5"/>
    <path d="M11 7h4a2 2 0 0 1 2 2v4"/>
  </svg>
)
const GlyphPresence = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="4" width="18" height="14" rx="2"/>
    <path d="M3 9h18"/><path d="M8 14h4"/>
  </svg>
)
const GlyphWorkflowAI = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>
)

const SERVICES = [
  {
    num: '01',
    Glyph: GlyphWorkflow,
    title: 'Find the time-wasters',
    body: 'We look at the tasks that eat up your week: copying information, chasing replies, updating sheets, writing the same message, or checking too many places.',
    tags: ['task review', 'plain-English plan', 'quick wins'],
    price: 'Starts at $150',
  },
  {
    num: '02',
    Glyph: GlyphAutomation,
    title: 'Make the task easier',
    body: 'I can help connect forms, email, spreadsheets, reminders, customer notes, and simple tools so fewer things have to be done by hand.',
    tags: ['forms', 'follow-ups', 'spreadsheets'],
    price: 'Typical projects $250–$500',
  },
  {
    num: '03',
    Glyph: GlyphPresence,
    title: 'Clean up your web presence',
    body: 'If customers are confused by your website, I can help make the offer clearer, the page easier to read, and the next step obvious.',
    tags: ['landing pages', 'clearer copy', 'trust signals'],
    price: 'Starts at $300',
  },
  {
    num: '04',
    Glyph: GlyphWorkflowAI,
    title: 'Automate client follow-up sequences',
    body: 'Every inquiry that goes unanswered is money left on the table. I build automated sequences — booking confirmations, intake forms, check-in reminders, and lead nurture — so clients hear from you without you lifting a finger.',
    tags: ['inquiry responses', 'intake forms', 'follow-up sequences'],
    price: 'Typical projects $300–$600',
  },
]

const ServiceCard = ({ s }) => {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    ref.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <article className="service" ref={ref} onMouseMove={onMove}>
      <div className="service-num">
        <span>{s.num} / 04</span>
        <span className="service-glyph"><s.Glyph /></span>
      </div>
      <h3>{s.title}</h3>
      <p>{s.body}</p>
      <div className="service-tags">
        {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      {s.price && <div className="service-price">{s.price}</div>}
      <span className="service-link">
        <a href="#" onClick={handleDiscuss}>Discuss scope</a> <ArrowUpRight size={12} />
      </span>
    </article>
  )
}

const PackageCard = ({ pkg }) => (
  <div className={`package-card ${pkg.highlight ? 'package-card--highlight' : ''}`}>
    {pkg.highlight && <div className="package-badge">Most Popular</div>}
    <h3 className="package-name">{pkg.name}</h3>
    <div className="package-price">
      <span className="price-amount">{pkg.price}</span>
      <span className="price-period">/{pkg.period}</span>
    </div>
    <p className="package-desc">{pkg.description}</p>
    <ul className="package-features">
      {pkg.features.map((f) => <li key={f}>{f}</li>)}
    </ul>
    <a href="/#contact" className={`btn ${pkg.highlight ? 'btn-primary' : 'btn-ghost'} package-cta`}>
      {pkg.cta} <ArrowUpRight size={14} />
    </a>
  </div>
)

const TestimonialCard = ({ t }) => (
  <div className="testimonial-card">
    <div className="testimonial-avatar">{t.avatar}</div>
    <p className="testimonial-text">{t.text}</p>
    <div className="testimonial-author">
      <strong>{t.name}</strong>
      <span>{t.business}</span>
    </div>
  </div>
)

export default function ServicesPage({ onContact }) {
  const handleDiscuss = (e) => {
    e.preventDefault();
    if (onContact) {
      // Switch back to main hash and open modal
      window.location.hash = ''
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        // Dispatch a custom event so App.jsx can open the modal
        window.dispatchEvent(new CustomEvent('open-contact-modal'))
      }, 100)
    } else {
      window.location.href = '/#contact'
    }
  }
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add('in'))
    }, { threshold: 0.1 })
    el.querySelectorAll('.reveal').forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <main className="services-page" ref={ref} id="top">
      {/* Back nav */}
      <div className="services-back">
        <div className="wrap">
          <a href="/#services" className="back-link">
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="services-hero">
        <div className="wrap">
          <div className="services-intro reveal">
            <div>
              <div className="section-head">
                <span className="eyebrow">Services</span>
                <span className="eyebrow-num">§ 01</span>
                <span className="divider" />
              </div>
              <h2>What Preciado Tech<br />can take off your plate.</h2>
            </div>
            <p>
              You do not need to know what software you need. You only need to know
              what feels slow, messy, or repetitive. I help turn that into a simple next step.
            </p>
          </div>
          <div className="services-list">
            {SERVICES.map((s) => <ServiceCard key={s.num} s={s} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <div className="wrap">
          <div className="pricing-intro reveal">
            <div className="section-head">
              <span className="eyebrow">Pricing</span>
              <span className="eyebrow-num">§ 02</span>
              <span className="divider" />
            </div>
            <h2>Simple, transparent pricing.<br />Pay only for what you need.</h2>
            <p>
              Start with a strategy session, then choose ongoing support that fits your team.
              All powered by AI agents to keep your costs low.
            </p>
          </div>
          <div className="pricing-grid">
            {PACKAGES.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="wrap">
          <div className="testimonials-intro reveal">
            <div className="section-head">
              <span className="eyebrow">Testimonials</span>
              <span className="eyebrow-num">§ 03</span>
              <span className="divider" />
            </div>
            <h2>What clients say.<br />Real results from real teams.</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="services-cta">
        <div className="wrap">
          <div className="services-cta-panel reveal">
            <h2>Ready to fix one annoying task?</h2>
            <p>
              Tell me about one thing that takes too long, gets forgotten, or has to be copied by hand.
              I will reply with a plain-English next step.
            </p>
            <a className="btn btn-primary" href="/#contact">
              Get started <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
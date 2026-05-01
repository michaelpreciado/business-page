import { useState, useEffect } from 'react'
import { useRef } from 'react'

const ArrowUpRight = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7"/><path d="M8 7h9v9"/>
  </svg>
)

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

const SERVICES = [
  {
    num: '01',
    Glyph: GlyphWorkflow,
    title: 'Find the time-wasters',
    body: 'We look at the tasks that eat up your week: copying information, chasing replies, updating sheets, writing the same message, or checking too many places.',
    tags: ['task review', 'plain-English plan', 'quick wins'],
  },
  {
    num: '02',
    Glyph: GlyphAutomation,
    title: 'Make the task easier',
    body: 'I can help connect forms, email, spreadsheets, reminders, customer notes, and simple tools so fewer things have to be done by hand.',
    tags: ['forms', 'follow-ups', 'spreadsheets'],
  },
  {
    num: '03',
    Glyph: GlyphPresence,
    title: 'Clean up your web presence',
    body: 'If customers are confused by your website, I can help make the offer clearer, the page easier to read, and the next step obvious.',
    tags: ['landing pages', 'clearer copy', 'trust signals'],
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
        <span>{s.num} / 03</span>
        <span className="service-glyph"><s.Glyph /></span>
      </div>
      <h3>{s.title}</h3>
      <p>{s.body}</p>
      <div className="service-tags">
        {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <span className="service-link">
        <a href="/#contact">Discuss scope</a> <ArrowUpRight size={12} />
      </span>
    </article>
  )
}

export default function ServicesPage() {
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
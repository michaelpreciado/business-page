import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

/* ─── Icon primitives ─── */
const Icon = ({ d, size = 18, stroke = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)
const ArrowUpRight = (p) => <Icon {...p} d={<><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>} />
const ArrowRight = (p) => <Icon {...p} d={<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>} />
const Close = (p) => <Icon {...p} d={<><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>} />
const Check = (p) => <Icon {...p} d={<path d="M5 12l4 4 10-10"/>} />
const SectionDivider = () => (
  <div className="section-divider">
    <span className="divider-line" />
    <span className="divider-dot" />
    <span className="divider-line" />
  </div>
)

const GlyphWorkflow = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#0a0d14" stroke="#00d4ff" strokeWidth="2"/>
    <circle cx="20" cy="24" r="6" fill="#00d4ff"/>
    <circle cx="44" cy="24" r="6" fill="#00d4ff"/>
    <circle cx="32" cy="44" r="6" fill="#a855f7"/>
    <line x1="20" y1="24" x2="32" y2="44" stroke="#00d4ff" strokeWidth="2"/>
    <line x1="44" y1="24" x2="32" y2="44" stroke="#00d4ff" strokeWidth="2"/>
    <line x1="20" y1="24" x2="44" y2="24" stroke="#00d4ff" strokeWidth="2"/>
  </svg>
)
const GlyphAutomation = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#0a0d14" stroke="#00d4ff" strokeWidth="2"/>
    <rect x="16" y="20" width="32" height="24" rx="4" fill="none" stroke="#00d4ff" strokeWidth="2"/>
    <circle cx="24" cy="32" r="4" fill="#00d4ff"/>
    <circle cx="40" cy="32" r="4" fill="#a855f7"/>
    <path d="M28 20 L28 16 L36 16 L36 20" stroke="#00d4ff" strokeWidth="2" fill="none"/>
    <line x1="24" y1="32" x2="40" y2="32" stroke="#00d4ff" strokeWidth="2" strokeDasharray="4 2"/>
  </svg>
)
const HeroParticles = () => (
  <div className="hero-particles" aria-hidden="true">
    {[...Array(12)].map((_, i) => (
      <span key={i} style={{ '--i': i }} />
    ))}
  </div>
)
const GlyphPresence = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#0a0d14" stroke="#00d4ff" strokeWidth="2"/>
    <rect x="12" y="18" width="40" height="28" rx="2" fill="none" stroke="#00d4ff" strokeWidth="2"/>
    <line x1="12" y1="26" x2="52" y2="26" stroke="#00d4ff" strokeWidth="2"/>
    <circle cx="18" cy="22" r="2" fill="#00d4ff"/>
    <circle cx="24" cy="22" r="2" fill="#00d4ff"/>
    <circle cx="30" cy="22" r="2" fill="#00d4ff"/>
    <rect x="18" y="32" width="20" height="3" fill="#a855f7"/>
    <rect x="18" y="38" width="28" height="3" fill="#00d4ff" opacity="0.6"/>
    <rect x="18" y="44" width="16" height="3" fill="#00d4ff" opacity="0.4"/>
  </svg>
)

/* ─── Topbar ─── */
const Topbar = ({ onContact }) => (
  <header className="topbar">
    <div className="wrap row">
      <a className="brand" href="#top">
        <img src="/preciado-tech-logo.svg" alt="Preciado Tech" className="brand-logo" />
        <span className="logo-glow" />
        <span className="brand-text">
          <span className="brand-name">Preciado Tech</span>
          <span className="brand-tag">Practical AI systems for real work</span>
        </span>
      </a>
      <nav className="topbar-right">
        <a className="nav-link" href="#hire">Hire Michael</a>
        <span className="status"><span className="dot" />Open to AI / software roles</span>
        <a className="top-cta" href="#contact" onClick={(e) => { e.preventDefault(); onContact() }}>
          Start a conversation <ArrowUpRight size={14} className="arrow" />
        </a>
      </nav>
    </div>
  </header>
)

/* ─── Hero ─── */
const Hero = ({ onContact }) => {
  const h1Ref = useRef(null)
  const StickyCta = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  if (!show) return null
  return (
    <button className="sticky-cta" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
      Get started
    </button>
  )
}

useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add('in'))
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <div className="matrix-grid" aria-hidden="true" />
      <div className="floating-orbs" aria-hidden="true">
        <div className="floating-orb" />
        <div className="floating-orb" />
        <div className="floating-orb" />
      </div>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollPct / 100})` }} />
      <MatrixCanvas />
      <Topbar onContact={() => setModal(true)} />
      <main>
        <Hero onContact={() => setModal(true)} />
        <HireMichael />
        <Services />
        <Offers />
        <Builds />
        <SectionDivider />
        <Testimonials />
        <Faq />
        
        <CaseStudy />
        <How />
        <CTA onContact={() => setModal(true)} />
      </main>
      <Footer />
      <ContactModal open={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default App

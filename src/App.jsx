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

/* ─── Topbar ─── */
const Topbar = ({ onContact }) => (
  <header className="topbar">
    <div className="wrap row">
      <a className="brand" href="#top">
        <img src="/preciado-logo.svg" alt="Preciado Tech" className="brand-logo" />
        <span className="brand-text">
          <span className="brand-name">Preciado Tech</span>
          <span className="brand-tag">Practical AI workflows, automation &amp; digital tools</span>
        </span>
      </a>
      <nav className="topbar-right">
        <span className="status"><span className="dot" />Taking Q2 projects</span>
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
  useEffect(() => {
    const id = requestAnimationFrame(() => h1Ref.current?.classList.add('in'))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-kicker reveal in">
              <span className="bar" />
              <span>AI engineering · workflows · automation</span>
            </div>

            <div className="hero-headline-row">
              <h1 ref={h1Ref}>
                <span className="line"><span>Build smarter</span></span>
                <span className="line"><span>systems that create</span></span>
                <span className="line"><span><em>leverage.</em></span></span>
              </h1>

              <div className="portrait-frame portrait-inline reveal">
                <img
                  src="/images/michael-outdoors-cropped.jpg"
                  alt="Michael Preciado"
                  className="portrait-img"
                />
                <div className="portrait-meta">
                  <span className="portrait-tag">Preciado Tech</span>
                  <span className="portrait-name">AI Engineering Practice</span>
                </div>
              </div>
            </div>

            <p className="hero-lede">
              <strong>Preciado Tech</strong> is an AI engineering practice for individuals and
              small teams. Custom assistants, automations, and the digital tools around them —
              built to reduce friction and create durable leverage.
            </p>

            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={onContact}>
                Start a project <ArrowRight size={15} className="arrow" />
              </button>
              <a className="btn btn-ghost" href="#services">
                What I build
              </a>
            </div>
          </div>

          <div className="hero-meta reveal">
            <div className="cell"><div className="k">Founded</div><div className="v">2024</div></div>
            <div className="cell"><div className="k">Discipline</div><div className="v">AI · Ops · Web</div></div>
            <div className="cell"><div className="k">Team size</div><div className="v">Small, sharp</div></div>
            <div className="cell"><div className="k">Mode</div><div className="v">Fully remote</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
const SERVICES = [
  {
    num: '01',
    Glyph: GlyphWorkflow,
    title: 'AI Workflows',
    body: 'Custom AI assistants, research flows, content systems, and practical automations designed around how you already work.',
    tags: ['assistants', 'research', 'content ops', 'drafting'],
  },
  {
    num: '02',
    Glyph: GlyphAutomation,
    title: 'Automation Systems',
    body: 'Internal tools, recurring-task cleanup, follow-up systems, and lightweight operations software that reduces friction.',
    tags: ['internal tools', 'crm glue', 'workflow logic'],
  },
  {
    num: '03',
    Glyph: GlyphPresence,
    title: 'Digital Presence',
    body: 'Polished websites, portfolio experiences, and showcase pages that make your work clearer, sharper, and easier to trust.',
    tags: ['marketing sites', 'portfolios', 'microsites'],
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
        Discuss scope <ArrowUpRight size={12} />
      </span>
    </article>
  )
}

const Services = () => (
  <section className="services" id="services">
    <div className="wrap">
      <div className="services-intro reveal">
        <div>
          <div className="section-head">
            <span className="eyebrow">Services</span>
            <span className="eyebrow-num">§ 01</span>
            <span className="divider" />
          </div>
          <h2>What Preciado Tech<br />helps with.</h2>
        </div>
        <p>
          Three overlapping practices — each rooted in the same idea: sharp,
          durable systems built around the way you already work, not around
          whatever tool is trending this month.
        </p>
      </div>
      <div className="services-list">
        {SERVICES.map((s) => <ServiceCard key={s.num} s={s} />)}
      </div>
    </div>
  </section>
)

/* ─── Selected builds ─── */
const BUILDS = [
  {
    name: 'Planter',
    type: 'Local-first product',
    summary: 'A botanical journal prototype with offline-minded plant records, care notes, progress photos, and AI-ready product thinking.',
    outcome: 'Shows product judgment, mobile polish, and practical AI app direction.',
    stack: ['React', 'TypeScript', 'Vercel'],
    href: 'https://github.com/michaelpreciado/Planter',
  },
  {
    name: 'Photography Portfolio',
    type: 'Digital presence',
    summary: 'A production-ready portfolio focused on visual clarity, optimized assets, and a polished public presentation layer.',
    outcome: 'Connects technical execution with taste, brand feel, and fast static deployment.',
    stack: ['React', 'Vite', 'Design systems'],
    href: 'https://github.com/michaelpreciado/photography-portfolio',
  },
  {
    name: 'Interactive Solar System',
    type: 'Immersive interface',
    summary: 'A 3D educational experience built around spatial interaction, motion, and approachable technical storytelling.',
    outcome: 'Demonstrates front-end range beyond standard marketing pages.',
    stack: ['TypeScript', 'Three.js', 'React'],
    href: 'https://github.com/michaelpreciado/Interactive_Solar_System',
  },
]

const BuildCard = ({ build, index }) => (
  <a className="build-card reveal" href={build.href} target="_blank" rel="noreferrer">
    <div className="build-index">0{index + 1}</div>
    <div className="build-content">
      <div className="build-type">{build.type}</div>
      <h3>{build.name}</h3>
      <p>{build.summary}</p>
      <div className="build-outcome">{build.outcome}</div>
      <div className="build-stack">
        {build.stack.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
    <div className="build-arrow"><ArrowUpRight size={16} /></div>
  </a>
)

const Builds = () => (
  <section className="builds" id="work">
    <div className="wrap">
      <div className="builds-grid">
        <div className="builds-copy reveal">
          <div className="section-head">
            <span className="eyebrow">Selected builds</span>
            <span className="eyebrow-num">§ 02</span>
            <span className="divider" />
          </div>
          <h2>Proof that the work<br />can leave the slide deck.</h2>
          <p>
            Preciado Tech is grounded in shipped interfaces, prototypes, and polished digital
            systems — the same mix of clarity, usefulness, and presentation that client work needs.
          </p>
        </div>
        <div className="builds-list">
          {BUILDS.map((build, index) => <BuildCard key={build.name} build={build} index={index} />)}
        </div>
      </div>
    </div>
  </section>
)

/* ─── How it works ─── */
const STEPS = [
  { n: '01', title: 'Find the friction', body: 'Walk through how you currently work and isolate what is repetitive, unclear, or held together by too much manual effort.' },
  { n: '02', title: 'Design the system', body: 'Specify the workflow end-to-end — inputs, decisions, handoffs, outputs — before touching a single line of code.' },
  { n: '03', title: 'Make it real', body: 'Ship tools, interfaces, and automations that plug into your existing stack and behave the way they were designed to.' },
  { n: '04', title: 'Refine with use', body: 'Small, deliberate iterations once the system is in your hands. The work gets sharper the longer it runs.' },
]

const How = () => (
  <section className="how" id="process">
    <div className="wrap">
      <div className="how-grid">
        <div>
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <span className="eyebrow-num">§ 03</span>
            <span className="divider" />
          </div>
          <h2 className="reveal">Find the friction.<br />Design the system.<br /><em>Make it real.</em></h2>
          <p className="how-lede reveal">
            The work starts by identifying what is repetitive, unclear, or held together by too
            much manual effort. From there, Preciado Tech designs workflows, tools, and
            interfaces that quietly do the job — and then gets out of the way.
          </p>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-idx">STEP / {s.n}</div>
                <div className="step-body">
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
                <div className="step-arrow"><ArrowRight size={18} /></div>
              </div>
            ))}
          </div>
        </div>

        <aside className="principles reveal">
          <div className="card-label">Principles</div>
          <ul className="principles-list">
            <li><span className="mark">I.</span><span>Small, sharp, and remote by design.</span></li>
            <li><span className="mark">II.</span><span>Built for real use, not AI theater.</span></li>
            <li><span className="mark">III.</span><span>Equal care for utility, clarity, and presentation.</span></li>
            <li><span className="mark">IV.</span><span>Fewer moving parts. Systems you can still reason about in a year.</span></li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
)

/* ─── CTA ─── */
const CTA = ({ onContact }) => (
  <section className="cta" id="contact">
    <div className="wrap">
      <div className="cta-card reveal">
        <div className="cta-eyebrow"><span className="bar" /> Start a conversation</div>
        <h2>Describe the drag.<br />Leave with a <em>system</em>.</h2>
        <p className="cta-sub">
          Tell Preciado Tech about the work that takes too long, breaks too often, or just
          never feels finished. First reply usually lands inside a business day.
        </p>
        <div className="cta-actions">
          <button className="btn btn-primary" onClick={onContact}>
            Book an intro call <ArrowRight size={15} className="arrow" />
          </button>
          <a className="btn btn-ghost" href="mailto:michael@preciadotech.com">
            michael@preciadotech.com
          </a>
        </div>
      </div>
    </div>
  </section>
)

/* ─── Footer ─── */
const Footer = () => (
  <footer>
    <div className="wrap foot-row">
      <div className="foot-meta">© {new Date().getFullYear()} · Preciado Tech · Remote studio</div>
      <nav className="foot-socials" aria-label="Social links">
        <a href="https://www.tiktok.com/@preciado.tech" target="_blank" rel="noreferrer">TikTok</a>
        <a href="https://www.michael-preciado.com" target="_blank" rel="noreferrer">Photography</a>
        <a href="mailto:michael@preciadotech.com">Email</a>
      </nav>
    </div>
  </footer>
)

/* ─── Contact modal ─── */
const ContactModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', focus: 'ai', details: '' })
  const [errs, setErrs] = useState({})
  const [sent, setSent] = useState(false)

  const closeModal = useCallback(() => {
    setSent(false)
    setErrs({})
    onClose()
  }, [onClose])

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && closeModal()
    if (open) window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open, closeModal])

  const submit = (e) => {
    e.preventDefault()
    const ne = {}
    if (!form.name.trim()) ne.name = 'Required'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) ne.email = 'Valid email required'
    if (form.details.trim().length < 10) ne.details = 'A sentence or two, please'
    setErrs(ne)
    if (Object.keys(ne).length) return
    window.location.href = `mailto:michael@preciadotech.com?subject=${encodeURIComponent('Preciado Tech Inquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nFocus: ${form.focus}\n\n${form.details}`)}`
    setSent(true)
  }

  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={closeModal} aria-label="Close"><Close size={14} /></button>

        {sent ? (
          <div className="success">
            <div className="check"><Check size={22} /></div>
            <div className="modal-eyebrow">Message queued</div>
            <h3>Thanks — message received.</h3>
            <p>You'll get a reply from Preciado Tech within one business day.</p>
            <button className="btn btn-ghost" onClick={closeModal}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="modal-eyebrow">New project inquiry</div>
            <h3>Tell Preciado Tech<br />about the work.</h3>
            <p>A short note is enough to start. Replies usually land inside a business day.</p>

            <div className="field">
              <label>Name {errs.name && <span className="err">· {errs.name}</span>}</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
            <div className="field">
              <label>Email {errs.email && <span className="err">· {errs.email}</span>}</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@domain.com" />
            </div>
            <div className="field">
              <label>Area of focus</label>
              <select value={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.value })}>
                <option value="ai">AI workflows</option>
                <option value="auto">Automation systems</option>
                <option value="web">Digital presence</option>
                <option value="mix">Not sure yet</option>
              </select>
            </div>
            <div className="field">
              <label>What's the friction? {errs.details && <span className="err">· {errs.details}</span>}</label>
              <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="A couple sentences on what takes too long, breaks, or just never feels finished." />
            </div>

            <div className="modal-actions">
              <div className="spacer" />
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" className="btn btn-primary">Send <ArrowRight size={14} className="arrow" /></button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─── Matrix rain canvas ─── */
const MatrixCanvas = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d', { alpha: true })
    let W = 0, H = 0, cols = 0, drops = [], speeds = [], chars = []
    const GLYPHS = '01│┤├─┼╌╎ABCDEF<>/{}[]()=+*·•∙'
    const FONT_SIZE = 14
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      W = window.innerWidth; H = window.innerHeight
      c.width = W * DPR; c.height = H * DPR
      c.style.width = W + 'px'; c.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      cols = Math.floor(W / FONT_SIZE)
      drops = Array.from({ length: cols }, () => Math.random() * -H)
      speeds = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.9)
      chars = Array.from({ length: cols }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
    }
    resize()
    window.addEventListener('resize', resize)

    let last = 0, raf
    function frame(t) {
      if (t - last < 55) { raf = requestAnimationFrame(frame); return }
      last = t
      ctx.fillStyle = 'rgba(7,8,11,0.08)'
      ctx.fillRect(0, 0, W, H)
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`
      ctx.textBaseline = 'top'
      for (let i = 0; i < cols; i++) {
        if (Math.random() < 0.02) chars[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * FONT_SIZE, y = drops[i]
        ctx.fillStyle = 'oklch(0.88 0.11 260 / 0.9)'
        ctx.fillText(chars[i], x, y)
        ctx.fillStyle = 'oklch(0.68 0.08 260 / 0.45)'
        ctx.fillText(chars[i], x, y - FONT_SIZE)
        drops[i] += FONT_SIZE * speeds[i]
        if (drops[i] > H + Math.random() * 200) drops[i] = -FONT_SIZE * (Math.random() * 40)
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: 0.18, mixBlendMode: 'screen',
      }}
    />
  )
}

/* ─── App root ─── */
function App() {
  const [modal, setModal] = useState(false)

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
      <MatrixCanvas />
      <Topbar onContact={() => setModal(true)} />
      <main>
        <Hero onContact={() => setModal(true)} />
        <Services />
        <Builds />
        <How />
        <CTA onContact={() => setModal(true)} />
      </main>
      <Footer />
      <ContactModal open={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default App

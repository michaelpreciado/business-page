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
                <span className="line"><span>Practical AI systems</span></span>
                <span className="line"><span>for teams that want</span></span>
                <span className="line"><span>less <em>manual work.</em></span></span>
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
              <strong>Preciado Tech</strong> helps creators, operators, and small teams turn
              repetitive work into clear workflows, lightweight automations, custom assistants,
              and digital tools that are actually usable after the demo.
            </p>

            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={onContact}>
                Send me the task you hate doing <ArrowRight size={15} className="arrow" />
              </button>
              <a className="btn btn-ghost" href="#offers">
                See practical offers
              </a>
            </div>
          </div>

          <div className="hero-meta reveal">
            <div className="cell"><div className="k">Founded</div><div className="v">2024</div></div>
            <div className="cell"><div className="k">Focus</div><div className="v">AI · Ops · Web</div></div>
            <div className="cell"><div className="k">Best fit</div><div className="v">Small teams</div></div>
            <div className="cell"><div className="k">Mode</div><div className="v">Remote-first</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Hiring signal ─── */
const HIRING_PROOFS = [
  {
    label: 'Real systems background',
    text: 'IT application support in manufacturing environments: troubleshooting, uptime, printers, controls/process support, and fast practical fixes.',
  },
  {
    label: 'Builder momentum',
    text: 'Shipping React/Vite/TypeScript projects, polishing deployments, improving CI, and using GitHub as a visible record of work.',
  },
  {
    label: 'AI direction',
    text: 'Hands-on with local models, prompt design, workflow automation, knowledge tools, and AI systems that connect to real context.',
  },
]

const SKILLS = ['React', 'Vite', 'TypeScript', 'JavaScript', 'Python', 'Linux', 'Docker', 'GitHub', 'Ollama', 'OpenAI workflows', 'Notion', 'HubSpot', 'Figma', '3D printing']

const HireMichael = () => (
  <section className="hire" id="hire">
    <div className="wrap">
      <div className="hire-panel reveal">
        <div className="hire-copy">
          <div className="section-head">
            <span className="eyebrow">Hire Michael</span>
            <span className="eyebrow-num">Career signal</span>
            <span className="divider" />
          </div>
          <h2>AI-focused software builder with real operations instincts.</h2>
          <p>
            I’m Michael Preciado — an IT professional and AI student building toward software,
            automation, and intelligent systems work. My edge is that I’ve supported real production
            environments, so I care about tools that are stable, understandable, and useful after launch.
          </p>
          <div className="hire-actions">
            <a className="btn btn-primary" href="mailto:michael@preciadotech.com?subject=Role%20opportunity%20for%20Michael%20Preciado">
              Discuss a role <ArrowRight size={15} className="arrow" />
            </a>
            <a className="btn btn-ghost" href="https://github.com/michaelpreciado" target="_blank" rel="noreferrer">
              GitHub profile <ArrowUpRight size={15} />
            </a>
            <a className="btn btn-ghost" href="https://www.michael-preciado.com" target="_blank" rel="noreferrer">
              Personal portfolio <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="hire-card">
          <div className="card-label">Why give me a chance</div>
          <div className="proof-list">
            {HIRING_PROOFS.map((proof) => (
              <div className="proof" key={proof.label}>
                <h3>{proof.label}</h3>
                <p>{proof.text}</p>
              </div>
            ))}
          </div>
          <div className="skill-cloud" aria-label="Skills and tools">
            {SKILLS.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>
      </div>
    </div>
  </section>
)

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

/* ─── Offers ─── */
const OFFERS = [
  {
    name: 'Business Automation Starter Pack',
    price: 'Intro: $497 · then $997+',
    promise: 'Pick one painful workflow and turn it into a practical automation that saves time, reduces missed leads, and creates a cleaner operating rhythm.',
    bestFor: 'Local businesses and solo operators that need one useful win before investing in bigger systems.',
    includes: ['30-minute consult', 'workflow audit', 'one automation build', 'walkthrough docs', '7 days support'],
  },
  {
    name: 'Website + AI Chatbot Package',
    price: 'Starting at $750',
    promise: 'Launch a clean landing page with lead capture, booking, review CTAs, and an AI FAQ/chat layer that helps visitors take action.',
    bestFor: 'Service businesses that need a credible web presence and faster customer response.',
    includes: ['responsive landing page', 'contact or booking flow', 'AI FAQ widget', 'basic SEO', 'analytics'],
  },
  {
    name: 'Tech Cleanup Session',
    price: 'Starting at $250',
    promise: 'Untangle messy accounts, files, tools, email/domain setup, and basic security so the business tech feels manageable again.',
    bestFor: 'Owners who know their tech stack is chaotic but do not know where to start.',
    includes: ['tool review', 'email/domain check', 'file organization plan', 'security checklist', 'next-step roadmap'],
  },
  {
    name: 'Custom Dashboard Build',
    price: 'Starting at $500',
    promise: 'Turn spreadsheets and scattered information into a lightweight dashboard for leads, jobs, inventory, clients, sales, or expenses.',
    bestFor: 'Businesses tracking important work manually across spreadsheets, notes, and messages.',
    includes: ['dashboard design', 'data source setup', 'status views', 'automation hooks', 'owner handoff'],
  },
  {
    name: 'Monthly AI Content Engine',
    price: 'Starting at $200/mo',
    promise: 'Create a repeatable content system for posts, captions, newsletters, campaign ideas, and lightweight brand voice support.',
    bestFor: 'Businesses that need to stay visible but do not have time to plan and draft content every week.',
    includes: ['weekly ideas', 'captions', 'promo copy', 'newsletter drafts', 'content calendar'],
  },
  {
    name: 'Fractional Tech Support Retainer',
    price: 'Starting at $150/mo',
    promise: 'Keep a practical tech partner on call for website updates, automation fixes, tooling questions, and monthly system improvements.',
    bestFor: 'Small teams that need reliable tech help without hiring a full-time developer.',
    includes: ['monthly support block', 'small fixes', 'website updates', 'automation monitoring', 'priority recommendations'],
  },
]

const FITS = [
  'local service businesses that need more leads and less admin',
  'solo operators with repetitive follow-up work',
  'creators and small teams that need content systems',
  'business owners running too much through spreadsheets and DMs',
  'professionals who want practical AI help without enterprise pricing',
]

const Offers = () => (
  <section className="offers" id="offers">
    <div className="wrap">
      <div className="offers-head reveal">
        <div>
          <div className="section-head">
            <span className="eyebrow">Ways to work</span>
            <span className="eyebrow-num">§ 02</span>
            <span className="divider" />
          </div>
          <h2>Clear scopes for useful<br />AI and automation work.</h2>
        </div>
        <p>
          The best engagements start small: find the friction, ship something useful,
          and improve it after it touches real work.
        </p>
      </div>

      <div className="offers-layout">
        <div className="offer-list">
          {OFFERS.map((offer, index) => (
            <article className="offer reveal" key={offer.name}>
              <div className="offer-num">0{index + 1}</div>
              <div>
                <h3>{offer.name}</h3>
                <div className="offer-price">{offer.price}</div>
                <p>{offer.promise}</p>
                <div className="offer-best">Best for: {offer.bestFor}</div>
                <div className="offer-includes">
                  {offer.includes.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="fit-card reveal">
          <div className="card-label">Who this fits</div>
          <p>
            Preciado Tech is strongest where software, operations, AI tooling, and presentation meet.
          </p>
          <ul>
            {FITS.map((fit) => <li key={fit}>{fit}</li>)}
          </ul>
        </aside>
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
            <span className="eyebrow-num">§ 03</span>
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

/* ─── Case study ─── */
const CaseStudy = () => (
  <section className="case-study" id="case-study">
    <div className="wrap">
      <div className="case-card reveal">
        <div className="case-kicker">Internal case study · Planter</div>
        <div className="case-grid">
          <div>
            <h2>A local-first plant journal built like a real product.</h2>
            <p className="case-lede">
              Planter started as a personal botanical app and became a useful signal for how
              Preciado Tech thinks: simple data models, mobile-first flows, offline-minded UX,
              and room for AI assistance without making the product feel gimmicky.
            </p>
            <div className="case-actions">
              <a className="btn btn-primary" href="https://github.com/michaelpreciado/Planter" target="_blank" rel="noreferrer">
                View the build <ArrowUpRight size={15} className="arrow" />
              </a>
              <a className="btn btn-ghost" href="#contact">Start something similar</a>
            </div>
          </div>
          <div className="case-notes">
            <div>
              <span>Problem</span>
              <p>Plant care notes, photos, and progress tracking usually live in scattered apps and camera rolls.</p>
            </div>
            <div>
              <span>Build</span>
              <p>A responsive journal experience for plant records, care activity, progress photos, and local-first product polish.</p>
            </div>
            <div>
              <span>Transferable value</span>
              <p>The same thinking applies to client tools: organize messy inputs, reduce friction, and make the system pleasant to use.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* ─── How it works ─── */
const STEPS = [
  { n: '01', title: '20-minute workflow call', body: 'Talk through the process that feels slow, brittle, repetitive, or unclear. No pitch deck required — just the real workflow.' },
  { n: '02', title: 'Scope one painful process', body: 'Choose a focused problem with a clear output: a tool, assistant, automation, landing page, or internal workflow improvement.' },
  { n: '03', title: 'Prototype the useful version', body: 'Build the smallest serious version that proves the system can help in the real world, not only in a demo.' },
  { n: '04', title: 'Handoff and refine', body: 'Document how it works, clean up the rough edges, and iterate once it has touched real use.' },
]

const How = () => (
  <section className="how" id="process">
    <div className="wrap">
      <div className="how-grid">
        <div>
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <span className="eyebrow-num">§ 04</span>
            <span className="divider" />
          </div>
          <h2 className="reveal">One painful process.<br />One useful system.<br /><em>Then refine.</em></h2>
          <p className="how-lede reveal">
            Engagements stay intentionally scoped. The goal is not to “AI transform” everything;
            it is to find a concrete drag on the work, ship a practical improvement, and make it
            easy to keep using.
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
        <h2>Send the task you hate doing.<br />Leave with an <em>automation plan</em>.</h2>
        <p className="cta-sub">
          Tell Preciado Tech about one workflow that takes too long, breaks too often, or
          keeps falling through the cracks. First reply usually lands inside a business day.
        </p>
        <div className="cta-actions">
          <button className="btn btn-primary" onClick={onContact}>
            Get an automation plan <ArrowRight size={15} className="arrow" />
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
        <HireMichael />
        <Services />
        <Offers />
        <Builds />
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

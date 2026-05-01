import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

import TickerSignals from './TickerSignals.jsx'

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


const MobileMenu = ({ onContact }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        className="hamburger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="14" x2="20" y2="14" />
              <line x1="4" y1="20" x2="20" y2="20" />
            </>
          )}
        </svg>
      </button>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <nav className="mobile-nav">
            <a className="mobile-nav-link" href="#offers" onClick={() => setOpen(false)}>Services</a>
            <a className="mobile-nav-link" href="#hire" onClick={() => setOpen(false)}>Work with Michael</a>
            <a className="mobile-nav-link" href="#contact" onClick={() => { setOpen(false); onContact() }}>Get in Touch</a>
          </nav>
          <a className="mobile-cta" href="#contact" onClick={() => { setOpen(false); onContact() }}>
            Fix one repetitive task →
          </a>
        </div>
      )}
    </>
  )
}

/* ─── Topbar ─── */
const Topbar = ({ onContact }) => (
  <header className="topbar">
    <div className="wrap row">
      <a className="brand" href="#top">
        <img src="/images/michael-binary-portrait.jpg" alt="Michael Preciado" className="brand-logo" />
        <span className="brand-text">
          <span className="brand-name">Preciado Tech</span>
          <span className="brand-tag">Automation help for busy small teams</span>
        </span>
      </a>
      <nav className="topbar-right">
        <a className="nav-link" href="#offers">Services</a>
        <a className="nav-link" href="#hire">Work with Michael</a>
        <span className="status"><span className="dot" />Available for small business projects</span>
        <a className="top-cta" href="#contact" onClick={(e) => { e.preventDefault(); onContact() }}>
          Fix one repetitive task <ArrowUpRight size={14} className="arrow" />
        </a>
        <MobileMenu onContact={onContact} />
      </nav>
    </div>
  </header>
)

/* ─── Hero ─── */
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
              <span>save time · clean up busywork · follow up faster</span>
            </div>

            <div className="hero-headline-row">
              <h1 ref={h1Ref}>
                <span className="line"><span>Less busywork</span></span>
                <span className="line"><span>for small teams</span></span>
                <span className="line"><span>that need <em>time back.</em></span></span>
              </h1>

              <div className="hero-visual-card reveal">
                <img
                  src="/images/automation-flow.svg"
                  alt="A simple automation flow connecting a customer form, follow-up email, spreadsheet, and reminder."
                  className="hero-visual-img"
                />
                <div className="hero-visual-meta">
                  <span>form</span>
                  <span>→</span>
                  <span>follow-up</span>
                  <span>→</span>
                  <span>reminder</span>
                </div>
              </div>
            </div>

            <p className="hero-lede">
              <strong>Preciado Tech</strong> helps small businesses clean up repetitive tasks:
              follow-ups, forms, spreadsheets, reminders, customer messages, and simple tools
              that make daily work easier.
            </p>

            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={onContact}>
                Tell me the task you hate <ArrowRight size={15} className="arrow" />
              </button>
              <a className="btn btn-ghost" href="#offers">
                See what can be automated
              </a>
            </div>
          </div>

          <div className="hero-meta reveal">
            <div className="cell"><div className="k">Good for</div><div className="v">Busy teams</div></div>
            <div className="cell"><div className="k">I help with</div><div className="v">Forms · Follow-ups</div></div>
            <div className="cell"><div className="k">Best first step</div><div className="v">One task</div></div>
            <div className="cell"><div className="k">Working mode</div><div className="v">Remote-friendly</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Hiring signal ─── */
const HIRING_PROOFS = [
  {
    label: 'I understand real workplaces',
    text: 'My background is in IT support, so I know the difference between a neat demo and something people can actually use during a busy day.',
  },
  {
    label: 'I explain things plainly',
    text: 'You do not need to know software terms. Bring the messy process; I will help translate it into a simple plan.',
  },
  {
    label: 'I start small on purpose',
    text: 'The goal is not to rebuild your whole business. We pick one repetitive task, make it easier, and build trust from there.',
  },
]

const SKILLS = ['customer intake', 'follow-up messages', 'spreadsheets', 'forms', 'email cleanup', 'reminders', 'simple reports', 'website updates', 'AI email drafts', 'HubSpot', 'Notion', 'Google Workspace']

const HireMichael = () => (
  <section className="hire" id="hire">
    <div className="wrap">
      <div className="hire-panel reveal">
        <div className="hire-copy">
          <div className="section-head">
            <span className="eyebrow">Work with Michael</span>
            <span className="eyebrow-num">No tech overwhelm</span>
            <span className="divider" />
          </div>
          <h2>Automation help without the tech headache.</h2>
          <p>
            I’m Michael Preciado. I help small businesses turn repeated tasks into clearer,
            easier systems. If something gets copied, pasted, forgotten, delayed, or handled by
            hand every week, that is usually a good place to start.
          </p>
          <div className="hire-actions">
            <a className="btn btn-primary" href="mailto:michael@preciadotech.com?subject=Role%20opportunity%20for%20Michael%20Preciado">
              Talk through a task <ArrowRight size={15} className="arrow" />
            </a>
            <a className="btn btn-ghost" href="#examples">
              See common examples
            </a>
            <a className="btn btn-ghost" href="mailto:michael@preciadotech.com">
              Email Michael
            </a>
          </div>
        </div>

        <div className="hire-card">
          <div className="founder-card">
            <img src="/images/michael-binary-portrait.jpg" alt="Stylized binary portrait of Michael Preciado" className="founder-binary" loading="lazy" />
            <img src="/images/michael-profile-mountains.jpg" alt="Michael Preciado" className="founder-photo" loading="lazy" />
            <div className="founder-copy">
              <span>Built by Michael Preciado</span>
              <p>Practical automation help from someone who speaks human first, tech second.</p>
            </div>
          </div>
          <div className="card-label">How I make this easier</div>
          <div className="proof-list">
            {HIRING_PROOFS.map((proof) => (
              <div className="proof" key={proof.label}>
                <h3>{proof.label}</h3>
                <p>{proof.text}</p>
              </div>
            ))}
          </div>
          <div className="skill-cloud" aria-label="Common tools and tasks">
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
)

/* ─── Offers ─── */
const OFFERS = [
  {
    name: 'Task Cleanup Call',
    promise: 'Show me one messy process and I will help you spot what can be simplified, automated, or ignored.',
    bestFor: 'Business owners who are curious but not sure where automation would actually help.',
    includes: ['20-minute walkthrough', 'plain-English notes', 'next-step recommendation'],
  },
  {
    name: 'Automation Sprint',
    promise: 'Turn one repeated task into a smoother process with fewer manual steps.',
    bestFor: 'Teams dealing with follow-ups, intake forms, spreadsheet updates, reminders, or handoffs.',
    includes: ['small scoped build', 'setup support', 'simple handoff notes'],
  },
  {
    name: 'AI Helper Setup',
    promise: 'Create a helpful assistant for drafting, summarizing, organizing notes, or answering repeat questions.',
    bestFor: 'People who want AI to save time without needing to learn a pile of new tools.',
    includes: ['use-case design', 'starter prompts', 'safe do-and-don\'t rules'],
  },
  {
    name: 'Website Clarity Polish',
    promise: 'Clean up a website or landing page so visitors quickly understand what you do and how to contact you.',
    bestFor: 'Small businesses whose work is good but whose website does not explain it clearly yet.',
    includes: ['copy cleanup', 'layout polish', 'clear call-to-action'],
  },
]

const FITS = [
  'local businesses tired of repeated admin work',
  'solo owners who need follow-ups to stop slipping',
  'small teams using too many spreadsheets and messages',
  'creators or service providers who want cleaner intake',
  'businesses whose website needs to explain the offer faster',
]

const COMMON_TASKS = [
  'Turn website forms into organized lead lists',
  'Send follow-up emails or reminders automatically',
  'Clean up spreadsheets and weekly reports',
  'Draft replies, summaries, or customer updates faster',
  'Move information between tools without copy-paste',
  'Create a simple dashboard for what needs attention',
  'Remind customers or team members before things slip',
  'Make a confusing website easier for customers to trust',
]

const TaskExamples = () => (
  <section className="task-examples" id="examples">
    <div className="wrap">
      <div className="task-panel reveal">
        <div className="section-head">
          <span className="eyebrow">Examples</span>
          <span className="eyebrow-num">Plain English</span>
          <span className="divider" />
        </div>
        <div className="task-grid">
          <div>
            <h2>Things small businesses ask me to simplify.</h2>
            <p>
              If you have ever said “someone has to remember to do this every time,”
              that is the kind of work we should look at first.
            </p>
            <img
              src="/images/before-after-workflow.svg"
              alt="Before and after example showing manual busywork becoming an organized workflow."
              className="task-example-img"
              loading="lazy"
            />
          </div>
          <ul className="task-list">
            {COMMON_TASKS.map((task) => <li key={task}>{task}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </section>
)

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
          <h2>Simple ways to start<br />without overcommitting.</h2>
        </div>
        <p>
          Start with one task that wastes time or gets forgotten. I will help you understand
          what can be improved, what is worth automating, and what should stay human.
        </p>
      </div>

      <div className="offers-layout">
        <div className="offer-list">
          {OFFERS.map((offer, index) => (
            <article className="offer reveal" key={offer.name}>
              <div className="offer-num">0{index + 1}</div>
              <div>
                <h3>{offer.name}</h3>
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
            Preciado Tech is strongest when the problem is practical: too much copying,
            too many reminders, too many dropped follow-ups, or a website that does not explain the business clearly.
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
    type: 'Organized tracking app',
    summary: 'A plant journal that keeps care notes, photos, and history in one place instead of scattered across apps and camera rolls.',
    outcome: 'Shows how messy everyday information can become a calmer, easier-to-use tool.',
    stack: ['mobile-friendly', 'records', 'photos'],
  },
  {
    name: 'Photography Portfolio',
    type: 'Clear customer-facing website',
    summary: 'A polished portfolio built to make the work easy to browse, trust, and share.',
    outcome: 'Shows care for presentation, speed, and helping visitors understand the work quickly.',
    stack: ['website', 'portfolio', 'presentation'],
  },
  {
    name: 'Interactive Solar System',
    type: 'Interactive learning tool',
    summary: 'A visual project that turns complex information into something people can explore and understand.',
    outcome: 'Shows the ability to make digital tools feel approachable instead of overwhelming.',
    stack: ['interactive', 'visual', 'education'],
  },
]

const BuildCard = ({ build, index }) => (
  <article className="build-card reveal">
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
    <div className="build-arrow" aria-hidden="true"><Check size={16} /></div>
  </article>
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
          <h2>Proof that I can turn ideas<br />into usable things.</h2>
          <p>
            These are not client case studies yet. They are examples of how I organize information,
            polish interfaces, and make digital tools easier to understand.
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
        <div className="case-kicker">Example project · Planter</div>
        <div className="case-grid">
          <div>
            <h2>A simple plant journal for keeping care notes organized.</h2>
            <p className="case-lede">
              Planter is a personal app idea that solves a familiar problem: important notes,
              photos, and reminders getting scattered. The same thinking applies to business work —
              collect the details, keep them organized, and make the next action easier.
            </p>
            <div className="case-actions">
              <a className="btn btn-primary" href="#contact">
                Start something similar <ArrowRight size={15} className="arrow" />
              </a>
              <a className="btn btn-ghost" href="#examples">See business examples</a>
            </div>
          </div>
          <div className="case-notes">
            <div>
              <span>Problem</span>
              <p>Plant care notes, photos, and progress tracking usually live in scattered apps and camera rolls.</p>
            </div>
            <div>
              <span>Build</span>
              <p>A clean place to store records, care activity, progress photos, and reminders.</p>
            </div>
            <div>
              <span>Transferable value</span>
              <p>The same approach can organize leads, customer notes, follow-ups, reports, or any repeated business process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* ─── How it works ─── */
const STEPS = [
  { n: '01', title: 'Show me the annoying task', body: 'We talk through what happens now, who touches it, where things get delayed, and what result you wish happened automatically.' },
  { n: '02', title: 'Pick the smallest useful fix', body: 'We choose one focused improvement instead of trying to change everything at once.' },
  { n: '03', title: 'Build the simple version', body: 'I set up the first useful version: a cleaner form, follow-up flow, spreadsheet helper, reminder, assistant, or small internal tool.' },
  { n: '04', title: 'Test it with real work', body: 'We make sure it is understandable, adjust the rough edges, and leave you with clear notes on how to use it.' },
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
          <h2 className="reveal">One annoying task.<br />One easier way to do it.<br /><em>Then improve.</em></h2>
          <p className="how-lede reveal">
            The goal is not to “AI transform” your business. The goal is to remove one real source
            of drag and make the new process easy enough that your team will actually use it.
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
            <li><span className="mark">I.</span><span>Start small enough to be realistic.</span></li>
            <li><span className="mark">II.</span><span>Use plain language, not tech theater.</span></li>
            <li><span className="mark">III.</span><span>Keep the human parts human.</span></li>
            <li><span className="mark">IV.</span><span>Build things you can still understand later.</span></li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
)

/* ─── Trust clarity ─── */
const NOT_ITEMS = [
  'Not a giant software rebuild',
  'Not complicated AI consulting',
  'Not replacing your team',
  'Not another tool you will never use',
]

const TrustClarity = () => (
  <section className="trust-clarity" id="trust">
    <div className="wrap">
      <div className="trust-panel reveal">
        <div>
          <div className="section-head">
            <span className="eyebrow">Simple by design</span>
            <span className="eyebrow-num">Trust</span>
            <span className="divider" />
          </div>
          <h2>What this is not.</h2>
          <p>
            The first step is small on purpose. We look at one repeated task, decide what is realistic,
            and only build what will actually make the work easier.
          </p>
          <div className="pricing-note">
            Small scoped projects are available. Start with a simple task review before committing to a build.
          </div>
        </div>
        <ul className="not-list">
          {NOT_ITEMS.map((item) => <li key={item}>{item}</li>)}
        </ul>
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
        <h2>Send the task you hate doing.<br />I’ll tell you what is <em>realistic</em>.</h2>
        <p className="cta-sub">
          Tell Preciado Tech about one thing that takes too long, gets forgotten, or has to be
          copied by hand. I will reply with a plain-English next step.
        </p>
        <div className="cta-actions">
          <button className="btn btn-primary" onClick={onContact}>
            Ask what can be automated <ArrowRight size={15} className="arrow" />
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
    if (form.details.trim().length < 10) ne.details = 'A sentence or two helps'
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
            <div className="modal-eyebrow">Quick task review</div>
            <h3>What task keeps wasting<br />your time?</h3>
            <p>No technical details needed. A short note about the annoying part is enough.</p>

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
                <option value="ai">Writing, summaries, or AI help</option>
                <option value="auto">Follow-ups, forms, or spreadsheets</option>
                <option value="web">Website clarity</option>
                <option value="mix">Not sure yet</option>
              </select>
            </div>
            <div className="field">
              <label>What do you want off your plate? {errs.details && <span className="err">· {errs.details}</span>}</label>
              <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Example: every week I copy new leads into a spreadsheet and forget to follow up with some of them." />
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
      <div className="matrix-grid" aria-hidden="true" />
      <div className="floating-orbs" aria-hidden="true">
        <div className="floating-orb" />
        <div className="floating-orb" />
        <div className="floating-orb" />
      </div>
      <MatrixCanvas />
      <Topbar onContact={() => setModal(true)} />
      <main>
        <Hero onContact={() => setModal(true)} />
        <HireMichael />
        <Services />
        <TaskExamples />
        <Offers />
        <Builds />
        <CaseStudy />
        <How />
        <TrustClarity />
        <CTA onContact={() => setModal(true)} />
      </main>
      <StickyCta />
      <TickerSignals />
      <Footer />
      <ContactModal open={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default App

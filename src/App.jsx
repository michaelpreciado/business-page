import './App.css'
import { lazy, Suspense } from 'react'

const HeroScene = lazy(() => import('./components/HeroScene'))

const services = [
  {
    index: '01',
    title: 'AI workflow design',
    description:
      'Design assistants, research flows, and working systems that fit how you actually operate, not a generic template.',
  },
  {
    index: '02',
    title: 'Automation systems',
    description:
      'Remove repetitive admin, patch messy handoffs, and build lightweight tools that keep work moving without extra overhead.',
  },
  {
    index: '03',
    title: 'Websites that convert',
    description:
      'Create clear, sharp business pages and digital experiences that explain the offer fast and make the next step obvious.',
  },
]

const outcomes = [
  'Less manual follow-up and duplicated work',
  'Clearer workflows your team can actually keep using',
  'A more credible online presence that earns trust faster',
]

const process = [
  {
    step: 'Audit what feels heavy',
    detail: 'Identify where the business is losing time, clarity, or credibility across workflow, tooling, and presentation.',
  },
  {
    step: 'Design the better system',
    detail: 'Turn the problem into a practical workflow, automation, or landing page with a clear purpose and clean scope.',
  },
  {
    step: 'Build and refine',
    detail: 'Ship something real, test it against the actual use case, and tighten it until it feels solid enough to keep.',
  },
]

const fit = [
  'solo founders who need leverage without hiring a full team',
  'creators and freelancers tired of scattered systems',
  'small teams with operational drag and messy internal handoffs',
  'businesses that want practical AI, not hype demos',
]

const proofPoints = [
  'Operational systems designed around real working habits',
  'Automation and internal tools with a strong bias toward simplicity',
  'Clean visual presentation without sacrificing utility',
]

const visuals = [
  {
    src: '/images/michael-outdoors.jpg',
    alt: 'Michael Preciado outdoors at dusk in a mountain setting.',
    label: 'founder.profile',
    title: 'Calm, thoughtful execution',
    description: 'A grounded personal image that adds trust without making the site feel like an influencer page.',
  },
  {
    src: '/images/create-graphic.jpg',
    alt: 'Minimal black graphic with two hands reaching toward a folder labeled create.',
    label: 'creative.signal',
    title: 'Technology in service of making',
    description: 'A visual cue that the work is about building, shaping, and turning loose ideas into usable systems.',
  },
]

function App() {
  return (
    <div className="page-shell">
      <div className="matrix-rain" aria-hidden="true">
        <span>10100101101001011010010110100101</span>
        <span>01011010010110100101101001011010</span>
        <span>11001010110010101100101011001010</span>
        <span>00110101001101010011010100110101</span>
        <span>10110011011001101100110110011011</span>
        <span>01010110010101100101011001010110</span>
        <span>11010100110101001101010011010100</span>
        <span>00101101001011010010110100101101</span>
      </div>

      <div className="terminal-shell">
        <div className="terminal-bar">
          <div className="terminal-controls" aria-hidden="true">
            <span className="control red" />
            <span className="control yellow" />
            <span className="control green" />
          </div>
          <div className="terminal-meta">
            <span className="terminal-path">preciado-tech@system:~</span>
            <span className="terminal-status">business-page</span>
          </div>
        </div>

        <header className="topbar">
          <div className="brand-block">
            <span className="brand-mark">Preciado Tech</span>
            <span className="brand-note">Practical AI workflows, automation, and digital systems</span>
          </div>
          <div className="topbar-links">
            <a className="topbar-link muted" href="https://www.michael-preciado.com/projects" target="_blank" rel="noreferrer">
              /project-proof
            </a>
            <a className="topbar-link primary" href="mailto:michael@preciadotech.com?subject=Preciado%20Tech%20Inquiry">
              /book-conversation
            </a>
          </div>
        </header>

        <main>
          <section className="hero-section">
            <div className="hero-copy">
              <p className="eyebrow">[ remote studio for practical ai, automation, and sharper business systems ]</p>
              <h1>Fix the messy parts of the business that keep stealing time.</h1>
              <p className="hero-text hero-lead">
                Preciado Tech helps founders, creators, and small teams clean up scattered workflows,
                automate repetitive work, and present their business with more clarity, confidence, and trust.
              </p>
              <p className="hero-text hero-support">
                The goal is simple, build systems that reduce drag, make better use of AI, and help the business feel easier to run.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="mailto:michael@preciadotech.com?subject=Preciado%20Tech%20Inquiry">
                  &gt; book a conversation
                </a>
                <a
                  className="button button-secondary"
                  href="https://www.michael-preciado.com/projects"
                  target="_blank"
                  rel="noreferrer"
                >
                  &gt; see project proof
                </a>
              </div>
              <div className="micro-proof">
                <span>ai.workflows</span>
                <span>automation.systems</span>
                <span>business.websites</span>
              </div>
            </div>

            <aside className="hero-rail">
              <div className="scene-card">
                <Suspense fallback={<div className="scene-fallback" aria-hidden="true" />}>
                  <HeroScene />
                </Suspense>
              </div>

              <div className="hero-panel hero-panel-primary">
                <span className="panel-label">best_fit[]</span>
                <ul className="prompt-list">
                  {fit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="signal-card">
                <div className="signal-line" />
                <p className="signal-heading">output.improves</p>
                <ul className="signal-list prompt-list">
                  {outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>

          <section className="section-block trust-strip">
            <div className="trust-card terminal-card">
              <p className="section-kicker">what_preciado_tech_does()</p>
              <h2>Business systems work with a strong bias toward clarity and real use.</h2>
              <p className="section-text narrow-left">
                This is not a hype-first AI shop. The work is about making useful systems, cleaner operations,
                and better business presentation so the day-to-day feels less chaotic and more intentional.
              </p>
            </div>
          </section>

          <section className="section-block section-intro-split">
            <div className="section-heading wide">
              <p className="section-kicker">services.map()</p>
              <h2>Focused help where operational friction and digital trust overlap.</h2>
            </div>
            <p className="section-text intro-text">
              The strongest work usually sits at the intersection of workflow, automation, and presentation,
              where a small system fix can improve speed internally and credibility externally at the same time.
            </p>
          </section>

          <section className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card terminal-card">
                <div className="service-topline">
                  <span className="service-index">{service.index}</span>
                  <span className="service-rule" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </section>

          <section className="section-block process-layout">
            <div className="process-copy">
              <p className="section-kicker">process.flow</p>
              <h2>Start with the friction, then build the right fix.</h2>
              <p className="section-text">
                Good systems work usually starts by spotting what feels heavier than it should.
                Once that is clear, the build gets simpler, sharper, and much more useful.
              </p>
            </div>

            <div className="process-list">
              {process.map((item) => (
                <article key={item.step} className="process-card terminal-card">
                  <h3>{item.step}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block principles-layout">
            <div className="principles-card terminal-card">
              <p className="section-kicker">why_it_works</p>
              <h2>Useful first, cleanly designed, and built to hold up in real business use.</h2>
              <ul className="prompt-list">
                {proofPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="credibility-panel terminal-card">
              <p className="panel-label">studio.posture</p>
              <p>
                Small by choice, remote by default, and focused on thoughtful systems work that creates leverage
                without turning the business into a science experiment.
              </p>
            </div>
          </section>

          <section className="section-block visuals-section">
            <div className="section-heading wide visuals-heading">
              <p className="section-kicker">visual_identity</p>
              <h2>Personal enough to feel real, structured enough to feel professional.</h2>
            </div>

            <div className="visual-grid">
              {visuals.map((item) => (
                <article key={item.title} className="visual-card terminal-card">
                  <div className={`visual-frame ${item.label === 'founder.profile' ? 'portrait-frame' : ''}`}>
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </div>
                  <div className="visual-copy">
                    <span className="panel-label">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block cta-section">
            <p className="section-kicker">start_here</p>
            <h2>If the business feels scattered, slow, or harder to manage than it should, that is the work.</h2>
            <p className="section-text narrow">
              Reach out if you want help cleaning up operations, building a practical AI workflow,
              or making your business page explain the value more clearly.
            </p>
            <div className="hero-actions centered">
              <a className="button button-primary" href="mailto:michael@preciadotech.com?subject=Preciado%20Tech%20Inquiry">
                &gt; email michael
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App

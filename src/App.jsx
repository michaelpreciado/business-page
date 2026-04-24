import './App.css'
import { lazy, Suspense } from 'react'
import GrainOverlay from './components/GrainOverlay'
import SpotlightCard from './components/SpotlightCard'
import Marquee from './components/Marquee'
import AnimatedSection from './components/AnimatedSection'

const HeroTerminal = lazy(() => import('./components/HeroTerminal'))

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

const proofItems = [
  {
    label: 'web.systems',
    title: 'Business pages with sharper positioning',
    description: 'Landing pages and brand surfaces designed to explain the offer faster and turn attention into action.',
  },
  {
    label: 'ops.automation',
    title: 'Internal systems that reduce repeated work',
    description: 'Practical automation and lightweight tools that remove drag without making the workflow more fragile.',
  },
  {
    label: 'ai.workflows',
    title: 'AI setups built around real working habits',
    description: 'Assistants, research flows, and operating systems designed for actual use, not demo theater.',
  },
]

const builds = [
  {
    id: 'openclaw',
    label: 'robotics',
    icon: '🦾',
    title: 'OpenClaw',
    description:
      'Open-source cable-driven robotic gripper. Custom PCB design, servo control, and 3D-printable parts — built for makers and researchers.',
  },
  {
    id: 'friday',
    label: 'local AI',
    icon: '🤖',
    title: 'F.R.I.D.A.Y.',
    description:
      'On-device AI assistant stack. Privacy-first, runs fully offline on consumer hardware with local LLMs.',
  },
  {
    id: 'robotarm',
    label: 'hardware',
    icon: '⚙️',
    title: 'Robot Arm',
    description:
      '6-DOF arm with custom kinematics, ROS2 integration, and a Python control interface. Built to learn, iterate, and ship.',
  },
  {
    id: 'aiflows',
    label: 'ai.systems',
    icon: '⚡',
    title: 'AI workflows in production',
    description:
      'Real automation systems running for founders and creators — not demos. Built to stay useful without babysitting.',
  },
]

function App() {
  return (
    <div className="page">
      <GrainOverlay />

      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">Preciado Tech</span>
          <span className="brand-note">Practical AI workflows, automation, and digital systems</span>
        </div>
        <div className="topbar-links">
          <a className="topbar-link muted" href="https://www.michael-preciado.com/projects" target="_blank" rel="noreferrer">
            Projects
          </a>
          <a className="topbar-link primary" href="mailto:michael@preciadotech.com?subject=Preciado%20Tech%20Inquiry">
            Contact
          </a>
        </div>
      </header>

      <main>
        {/* ——— Hero ——— */}
        <section className="hero-section">
          <div className="hero-blobs" aria-hidden="true">
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />
            <div className="hero-blob hero-blob-3" />
          </div>
          <div className="hero-aura" aria-hidden="true" />

          <div className="hero-copy">
            <div className="hero-avatar">
              <img
                src="/images/michael-outdoors-cropped.jpg"
                alt="Michael Preciado"
                width="72"
                height="72"
              />
            </div>
            <p className="eyebrow">AI consultant &amp; builder · @preciado.tech</p>
            <h1>
              Sharpen the systems that feel{' '}
              <span className="gradient-text">slower, messier,</span>{' '}
              and heavier than they should.
            </h1>
            <p className="hero-text hero-lead">
              Preciado Tech helps founders, creators, and small teams clean up workflows,
              automate repetitive work, and build sharper digital experiences that earn trust faster.
            </p>
            <p className="hero-text hero-support">
              The work is simple in spirit — reduce drag, create leverage, and make the business feel more composed.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:michael@preciadotech.com?subject=Preciado%20Tech%20Inquiry">
                Talk through your workflow
              </a>
              <a
                className="button button-secondary"
                href="https://www.michael-preciado.com/projects"
                target="_blank"
                rel="noreferrer"
              >
                See project proof
              </a>
            </div>
            <div className="micro-proof">
              <span>AI workflows</span>
              <span>Automation systems</span>
              <span>Business websites</span>
            </div>
          </div>

          <aside className="hero-rail">
            <Suspense fallback={<div className="hero-term hero-term--fallback" aria-hidden="true" />}>
              <HeroTerminal />
            </Suspense>

            <div className="hero-panel hero-panel-primary">
              <span className="panel-label">Best fit for</span>
              <ul className="prompt-list">
                {fit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="signal-card">
              <div className="signal-line" />
              <p className="signal-heading">What improves</p>
              <ul className="signal-list prompt-list">
                {outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* ——— Marquee ——— */}
        <Marquee />

        {/* ——— Trust strip ——— */}
        <AnimatedSection className="section-block trust-strip">
          <SpotlightCard as="div" className="trust-card">
            <p className="section-kicker">What we do</p>
            <h2>Business systems work with a strong bias toward clarity, utility, and real adoption.</h2>
            <p className="section-text narrow-left">
              This is not a hype-first AI shop. The work is about making useful systems, cleaner operations,
              and stronger digital presentation so the business becomes easier to run and easier to trust.
            </p>
          </SpotlightCard>
        </AnimatedSection>

        {/* ——— What I'm building ——— */}
        <AnimatedSection className="section-block">
          <div className="section-heading wide">
            <p className="section-kicker">What I'm building</p>
            <h2>Hardware, AI systems, and open tools — built in public.</h2>
          </div>
          <div className="bento-grid">
            {builds.map((build) => (
              <SpotlightCard
                key={build.id}
                className={`bento-card bento-${build.id}`}
              >
                <div className="bento-icon" aria-hidden="true">{build.icon}</div>
                <span className="bento-tag">{build.label}</span>
                <h3>{build.title}</h3>
                <p>{build.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </AnimatedSection>

        {/* ——— Proof ——— */}
        <AnimatedSection className="section-block proof-section">
          <div className="section-heading wide proof-heading">
            <p className="section-kicker">Proof</p>
            <h2>The work sits where speed, clarity, and business trust overlap.</h2>
          </div>
          <div className="proof-grid">
            {proofItems.map((item) => (
              <SpotlightCard key={item.title} className="proof-card">
                <span className="panel-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </AnimatedSection>

        {/* ——— Services ——— */}
        <AnimatedSection className="section-block section-intro-split">
          <div className="section-heading wide">
            <p className="section-kicker">Services</p>
            <h2>Focused help where operational friction and digital trust overlap.</h2>
          </div>
          <p className="section-text intro-text">
            The strongest work usually sits at the intersection of workflow, automation, and presentation,
            where a small system fix can improve speed internally and credibility externally at the same time.
          </p>
        </AnimatedSection>

        <AnimatedSection className="service-grid" delay={0.05}>
          {services.map((service) => (
            <SpotlightCard key={service.title} className="service-card">
              <div className="service-topline">
                <span className="service-index">{service.index}</span>
                <span className="service-rule" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </SpotlightCard>
          ))}
        </AnimatedSection>

        {/* ——— Process ——— */}
        <AnimatedSection className="section-block process-layout">
          <div className="process-copy">
            <p className="section-kicker">Process</p>
            <h2>Start with the friction, then build the right fix.</h2>
            <p className="section-text">
              Good systems work usually starts by spotting what feels heavier than it should.
              Once that is clear, the build gets simpler, sharper, and much more useful.
            </p>
          </div>

          <div className="process-list">
            {process.map((item) => (
              <SpotlightCard key={item.step} className="process-card">
                <h3>{item.step}</h3>
                <p>{item.detail}</p>
              </SpotlightCard>
            ))}
          </div>
        </AnimatedSection>

        {/* ——— Principles ——— */}
        <AnimatedSection className="section-block principles-layout">
          <SpotlightCard as="div" className="principles-card">
            <p className="section-kicker">Why it works</p>
            <h2>Useful first, cleanly designed, and built to hold up in real business use.</h2>
            <ul className="prompt-list">
              {proofPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard as="div" className="credibility-panel">
            <p className="panel-label">Studio posture</p>
            <p>
              Small by choice, remote by default, and focused on thoughtful systems work that creates leverage
              without turning the business into a science experiment.
            </p>
          </SpotlightCard>
        </AnimatedSection>

        {/* ——— Content / TikTok ——— */}
        <AnimatedSection className="section-block">
          <div className="content-card">
            <div className="content-copy">
              <p className="section-kicker">Content</p>
              <h2>AI, robotics, and maker builds — documented on TikTok.</h2>
              <p className="section-text">
                Short-form content about real projects: what works, what breaks, and what it actually takes to
                ship AI systems and hardware builds in the open.
              </p>
              <a
                className="button button-secondary"
                href="https://www.tiktok.com/@preciado.tech"
                target="_blank"
                rel="noreferrer"
              >
                @preciado.tech on TikTok →
              </a>
            </div>
            <div className="content-visual" aria-hidden="true">
              <div className="tiktok-frame">
                <div className="tiktok-dot">▶</div>
                <span className="tiktok-handle">@preciado.tech</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ——— Photography ——— */}
        <AnimatedSection className="section-block">
          <div className="photography-card">
            <div className="photography-img-wrap">
              <img
                src="/images/michael-outdoors.jpg"
                alt="Michael Preciado outdoors in a mountain setting at dusk."
                loading="lazy"
              />
            </div>
            <div className="photography-copy">
              <p className="section-kicker">Photography</p>
              <h2>Portraits, landscapes, and editorial work.</h2>
              <p className="section-text">
                Visual storytelling alongside the technical work — landscapes, portraits, and editorial imagery
                under the Mario Preciado Photography brand.
              </p>
              <a
                className="button button-secondary"
                href="https://www.michael-preciado.com"
                target="_blank"
                rel="noreferrer"
              >
                View photography →
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* ——— CTA ——— */}
        <AnimatedSection className="section-block cta-section">
          <p className="section-kicker">Start here</p>
          <h2>If the business feels scattered, slow, or harder to manage than it should, that is the work.</h2>
          <p className="section-text narrow">
            Reach out if you want help cleaning up operations, building a practical AI workflow,
            or making your business page explain the value more clearly.
          </p>
          <div className="hero-actions centered">
            <a className="button button-primary" href="mailto:michael@preciadotech.com?subject=Preciado%20Tech%20Inquiry">
              Start the conversation
            </a>
          </div>
        </AnimatedSection>
      </main>

      {/* ——— Footer ——— */}
      <footer className="site-footer">
        <span className="footer-mark">© 2025 Preciado Tech</span>
        <nav className="footer-socials" aria-label="Social links">
          <a href="https://www.tiktok.com/@preciado.tech" target="_blank" rel="noreferrer">
            TikTok
          </a>
          <a href="https://www.michael-preciado.com" target="_blank" rel="noreferrer">
            Photography
          </a>
          <a href="mailto:michael@preciadotech.com">
            Email
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default App

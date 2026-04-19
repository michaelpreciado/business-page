import './App.css'

const services = [
  {
    index: '01',
    title: 'AI workflow design',
    description:
      'Custom assistants, research systems, and operating rhythms designed around the way you already think and work.',
  },
  {
    index: '02',
    title: 'Automation systems',
    description:
      'Internal tools, recurring-task cleanup, and lightweight operational software that removes drag and restores momentum.',
  },
  {
    index: '03',
    title: 'Digital presence',
    description:
      'Polished websites and showcase experiences that make your work easier to understand, trust, and act on.',
  },
]

const process = [
  {
    step: 'Diagnose the friction',
    detail: 'Find the bottlenecks, duplicated effort, and unclear handoffs slowing the work down.',
  },
  {
    step: 'Design the system',
    detail: 'Turn the problem into a sharper workflow, interface, or internal tool with clear leverage.',
  },
  {
    step: 'Build for real use',
    detail: 'Ship something practical, refined, and maintainable enough to hold up outside a mockup.',
  },
]

const principles = [
  'Small, sharp, and remote by design',
  'Built for real use, not AI theater',
  'Equal care for utility, clarity, and presentation',
]

function App() {
  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">Preciado Tech</span>
          <span className="brand-note">Practical AI workflows, automation, and digital tools</span>
        </div>
        <div className="topbar-links">
          <a className="topbar-link muted" href="https://www.michael-preciado.com/projects" target="_blank" rel="noreferrer">
            Project proof
          </a>
          <a className="topbar-link primary" href="mailto:michael@preciadotech.com">
            Start a conversation
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Remote studio for AI workflows, automation, and sharp digital systems</p>
            <h1>Build smarter systems with more leverage and less drag.</h1>
            <p className="hero-text hero-lead">
              Preciado Tech helps individuals and small teams turn scattered work,
              manual processes, and vague digital presence into systems that feel cleaner,
              faster, and much easier to trust.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:michael@preciadotech.com">
                Work with Preciado Tech
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
          </div>

          <aside className="hero-rail">
            <div className="hero-panel hero-panel-primary">
              <span className="panel-label">Built for</span>
              <ul>
                <li>solo founders</li>
                <li>creators and freelancers</li>
                <li>small teams with operational drag</li>
                <li>people who want useful systems instead of hype</li>
              </ul>
            </div>

            <div className="signal-card">
              <div className="signal-line" />
              <p className="signal-heading">What changes</p>
              <p className="signal-copy">
                Fewer repeated steps. Clearer workflows. Better presentation. More room to move.
              </p>
            </div>
          </aside>
        </section>

        <section className="section-block section-intro-split">
          <div className="section-heading wide">
            <p className="section-kicker">Services</p>
            <h2>High-leverage systems for people doing ambitious work with limited time.</h2>
          </div>
          <p className="section-text intro-text">
            Preciado Tech focuses on the overlap between operational clarity, thoughtful automation,
            and polished digital presence, where a small, well-built system can change the pace of everything around it.
          </p>
        </section>

        <section className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
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
            <p className="section-kicker">Process</p>
            <h2>Find the friction. Design the system. Make it real.</h2>
            <p className="section-text">
              The work starts by identifying what feels wasteful, brittle, or harder than it should be.
              From there, the goal is to build something grounded enough to use for real and refined enough to feel intentional.
            </p>
          </div>

          <div className="process-list">
            {process.map((item) => (
              <article key={item.step} className="process-card">
                <h3>{item.step}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block principles-layout">
          <div className="principles-card">
            <p className="section-kicker">Principles</p>
            <h2>Built to be useful first, memorable second, and never generic.</h2>
            <ul>
              {principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>

          <div className="credibility-panel">
            <p className="panel-label">Studio posture</p>
            <p>
              Small by choice. Remote by default. Focused on systems that reduce noise, create leverage,
              and make the work feel more composed.
            </p>
          </div>
        </section>

        <section className="section-block cta-section">
          <p className="section-kicker">Availability</p>
          <h2>Open to selective remote projects, collaborations, and systems work.</h2>
          <p className="section-text narrow">
            If you need a smarter workflow, a cleaner internal tool, or a sharper digital presence,
            Preciado Tech is being built to help with exactly that.
          </p>
          <div className="hero-actions centered">
            <a className="button button-primary" href="mailto:michael@preciadotech.com">
              Reach out
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

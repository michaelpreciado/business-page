import './App.css'

const services = [
  {
    title: 'AI Workflows',
    description:
      'Custom AI assistants, research flows, content systems, and practical automations designed around how you already work.',
  },
  {
    title: 'Automation Systems',
    description:
      'Internal tools, recurring-task cleanup, follow-up systems, and lightweight operations software that reduces friction.',
  },
  {
    title: 'Digital Presence',
    description:
      'Polished websites, portfolio experiences, and showcase pages that make your work clearer, sharper, and easier to trust.',
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
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-kicker">Preciado Tech</span>
          <span className="brand-note">Practical AI workflows, automation, and digital tools</span>
        </div>
        <a className="topbar-link" href="mailto:michael@preciadotech.com">
          Start a conversation
        </a>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">AI workflows, automations, and polished digital tools</p>
            <h1>Build smarter systems that create leverage.</h1>
            <p className="hero-text">
              Preciado Tech helps individuals and small teams build practical AI workflows,
              cleaner operations, and sharper digital experiences. The goal is simple, reduce
              friction, save time, and turn messy work into systems that genuinely create leverage.
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
          <aside className="hero-panel">
            <span className="panel-label">Built for</span>
            <ul>
              <li>solo founders</li>
              <li>creators and freelancers</li>
              <li>small teams with operational drag</li>
              <li>people who want useful systems instead of hype</li>
            </ul>
          </aside>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="section-kicker">Services</p>
            <h2>What Preciado Tech helps with</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block split-section">
          <div>
            <p className="section-kicker">How it works</p>
            <h2>Find the friction. Design the system. Make it real.</h2>
            <p className="section-text">
              The work starts by identifying what is repetitive, unclear, or held together by
              too much manual effort. From there, Preciado Tech designs workflows, tools, and
              interfaces that feel cleaner, more useful, and easier to trust.
            </p>
          </div>
          <div className="principles-card">
            <p className="panel-label">Principles</p>
            <ul>
              {principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-block cta-section">
          <p className="section-kicker">Availability</p>
          <h2>Open to selective remote projects, collaborations, and systems work.</h2>
          <p className="section-text narrow">
            If you need a smarter workflow, a cleaner internal tool, or a sharper digital
            presence, Preciado Tech is being built to help with exactly that.
          </p>
          <a className="button button-primary" href="mailto:michael@preciadotech.com">
            Reach out
          </a>
        </section>
      </main>
    </div>
  )
}

export default App

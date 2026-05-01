import { useRef, useEffect } from 'react'
import InlineCalendly from './InlineCalendly.jsx'

const Icon = ({ d, size = 18, stroke = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)
const ArrowRight = (p) => <Icon {...p} d={<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>} />
const ArrowUpRight = (p) => <Icon {...p} d={<><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>} />

/* ─── Crew agents ─── */
const CREW = [
  {
    id: 'echo',
    name: 'Echo',
    role: 'Memory Agent',
    tagline: 'Your knowledge that never forgets.',
    desc: 'Echo maintains your company memory, docs, and context so every other agent works with the right information -- and new team members get up to speed instantly.',
    skills: ['Knowledge base', 'Context recall', 'Onboarding docs', 'Meeting notes', 'Process memory'],
    color: 'oklch(0.72 0.14 270)',
    glyph: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'Outreach Agent',
    tagline: 'Finds your next best客户 every day.',
    desc: 'Scout continuously scouts for high-fit leads, qualifies them against your ideal customer profile, and drafts outreach messages -- so your pipeline never goes dry.',
    skills: ['Lead discovery', 'Ideal customer profiling', 'Cold outreach drafts', 'Follow-up sequences', 'CRM logging'],
    color: 'oklch(0.72 0.16 150)',
    glyph: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Research Agent',
    tagline: 'Deep research, instant synthesis.',
    desc: 'Sage digs into markets, competitors, technologies, and trends -- then brings back clean summaries with sources, so you make decisions on facts, not guesswork.',
    skills: ['Market research', 'Competitor analysis', 'Tech landscape', 'Data synthesis', 'Weekly briefs'],
    color: 'oklch(0.72 0.15 60)',
    glyph: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
  },
  {
    id: 'forge',
    name: 'Forge',
    role: 'Build Agent',
    tagline: 'Builds the automations your team actually uses.',
    desc: 'Forge takes the "too manual" tasks and turns them into working automations -- forms, follow-up flows, spreadsheets, internal tools -- built clean and ready on day one.',
    skills: ['Workflow automation', 'Form builders', 'Spreadsheet logic', 'Internal tools', 'Integration setup'],
    color: 'oklch(0.72 0.17 30)',
    glyph: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    id: 'ticker',
    name: 'Ticker',
    role: 'Market Agent',
    tagline: 'Tracks your market while you focus elsewhere.',
    desc: 'Ticker monitors stocks, options, and sector trends continuously -- surfacing signals and alerts so you stay informed without watching screens all day.',
    skills: ['Signal detection', 'Portfolio monitoring', 'Options scanning', 'Sector rotation', 'Daily briefings'],
    color: 'oklch(0.72 0.18 200)',
    glyph: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
]

const AgentCard = ({ agent }) => (
  <div className="agent-card" style={{ '--agent-color': agent.color }}>
    <div className="agent-card-header">
      <div className="agent-glyph-wrap">{agent.glyph}</div>
      <div className="agent-identity">
        <div className="agent-name">{agent.name}</div>
        <div className="agent-role">{agent.role}</div>
      </div>
    </div>
    <p className="agent-tagline">{agent.tagline}</p>
    <p className="agent-desc">{agent.desc}</p>
    <div className="agent-skills">
      {agent.skills.map((s) => <span key={s} className="agent-skill">{s}</span>)}
    </div>
  </div>
)

/* ─── Service tiers ─── */
const TIERS = [
  {
    name: 'Starter Crew',
    price: '$999',
    period: '/month',
    tagline: 'Echo + Scout. Two agents working every day.',
    bestFor: 'Solo founders and small teams who need lead flow and organized knowledge.',
    agents: ['Echo', 'Scout'],
    features: [
      '25 qualified leads per week',
      'Ideal customer profiling',
      'Outreach message drafts (require your approval)',
      '5-day follow-up sequences',
      'Company knowledge base',
      'Weekly performance summary',
      'Email + Slack delivery',
    ],
    highlight: false,
  },
  {
    name: 'Growth Crew',
    price: '$2,499',
    period: '/month',
    tagline: 'Echo + Scout + Sage. Research + outreach + memory.',
    bestFor: 'Teams that want market intelligence alongside a full outreach machine.',
    agents: ['Echo', 'Scout', 'Sage'],
    features: [
      'Everything in Starter Crew',
      'Weekly market research briefs',
      'Competitor activity monitoring',
      'Content and trend analysis',
      '3 strategic insights per week',
      'Custom research on demand',
    ],
    highlight: true,
  },
  {
    name: 'Full Crew',
    price: '$4,999',
    period: '/month',
    tagline: 'All 5 agents + Forge building your automations.',
    bestFor: 'Companies ready to replace repetitive work with a full autonomous team.',
    agents: ['Echo', 'Scout', 'Sage', 'Forge', 'Ticker'],
    features: [
      'Everything in Growth Crew',
      'Forge builds 1 automation per sprint (2 weeks)',
      'Form, flow, or internal tool per sprint',
      'Options and signal monitoring (Ticker)',
      'Weekly strategy call with crew lead',
      'Dedicated Slack channel',
      'Priority escalation',
    ],
    highlight: false,
  },
]

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

/* ─── Onboarding steps ─── */
const ONBOARD_STEPS = [
  {
    n: '01',
    title: 'Onboarding call -- 30 minutes',
    body: 'We learn your business, your customers, your goals, and your current pain points. No jargon, no tech overwhelm -- just a clear conversation.',
  },
  {
    n: '02',
    title: 'Agent deployment -- day 1',
    body: 'We configure your crew with the right context, tools, and access. Echo gets your knowledge base, Scout gets your ideal customer profile, Sage gets your market focus.',
  },
  {
    n: '03',
    title: 'First signals in 48 hours',
    body: 'Your first leads, research, or automation draft lands in your inbox. You review, approve, or adjust. The crew learns from your feedback.',
  },
  {
    n: '04',
    title: 'Weekly crew report -- every Monday',
    body: 'A plain summary of what the crew worked on, what it found, and what is coming next. No dashboards to check, no tools to log into.',
  },
]

/* ─── Testimonials / social proof ─── */
const PROOFS = [
  {
    quote: 'Scout brought us 40 qualified leads in the first two weeks. That is more than we generated in the previous three months.',
    author: '-- Small business owner, construction services',
  },
  {
    quote: 'Echo finally made our internal knowledge stop living in random Slack threads. I can ask it anything and get an answer in seconds.',
    author: '-- Operations lead, e-commerce startup',
  },
  {
    quote: "Sage's market briefs save me 3-4 hours of research every week. The summaries are clean and actually usable.",
    author: '-- Solo founder, B2B SaaS',
  },
]

/* ─── FAQ ─── */
const FAQS = [
  {
    q: 'Do I need to manage the agents?',
    a: 'Minimal oversight. The crew operates autonomously and surfaces what needs your attention. You approve outreach before it goes out. Everything else runs on its own.',
  },
  {
    q: 'What if I only need one agent?',
    a: 'We currently sell crew packages. Contact us and we can discuss a custom arrangement if a single agent fits your needs better.',
  },
  {
    q: 'How does Scout send outreach?',
    a: 'Scout drafts messages and flags them for your review. Once you approve, you send from your own inbox -- maintaining authentic voice and deliverability.',
  },
  {
    q: 'What does Forge build?',
    a: 'Forge builds automations: forms, follow-up flows, spreadsheet workflows, internal dashboards, and simple tools. Each sprint produces one working deliverable.',
  },
  {
    q: 'Is there a contract?',
    a: 'Month-to-month. Cancel anytime. We ask for a 3-month minimum commitment so the agents have time to learn your business and produce real results.',
  },
]

/* ─── Component ─── */
export default function AgentCrew() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add('in'))
    }, { threshold: 0.08 })
    el.querySelectorAll('.reveal').forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section className="crew-section" id="crew" ref={ref}>

      {/* Hero */}
      <div className="wrap">
        <div className="crew-hero">
          <div className="section-head reveal">
            <span className="eyebrow">Agent Crew as a Service</span>
            <span className="eyebrow-num">Preciado Tech</span>
            <span className="divider" />
          </div>
          <h2 className="crew-hero-headline reveal">
            Your AI team.<br />
            <span>Running while you sleep.</span>
          </h2>
          <p className="crew-hero-sub reveal">
            Preciado Tech's Agent Crew is a remote team of specialized AI agents that work every day
            on the tasks that eat up your time -- finding leads, doing research, building automations,
            and keeping your company knowledge organized.
          </p>
          <p className="crew-hero-sub reveal">
            No tools to manage. No dashboards to check. Just results, delivered to your inbox.
          </p>
          <div className="crew-hero-ctas reveal">
            <InlineCalendly label="Book a crew call" variant="primary" />
            <a className="btn btn-ghost" href="#crew-agents">
              Meet the crew
            </a>
          </div>
        </div>
      </div>

      {/* Meet the crew */}
      <div className="wrap">
        <div className="crew-agents" id="crew-agents">
          <div className="section-head reveal">
            <span className="eyebrow">Meet the crew</span>
            <span className="eyebrow-num">§ 01</span>
            <span className="divider" />
          </div>
          <h2 className="reveal">Five specialists. One team.</h2>
          <div className="crew-grid">
            {CREW.map((agent) => (
              <div className="reveal" key={agent.id}>
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="wrap">
        <div className="crew-how" id="crew-how">
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <span className="eyebrow-num">§ 02</span>
            <span className="divider" />
          </div>
          <div className="crew-steps">
            {ONBOARD_STEPS.map((step) => (
              <div className="crew-step reveal" key={step.n}>
                <div className="crew-step-num">STEP / {step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="wrap">
        <div className="crew-pricing" id="crew-pricing">
          <div className="section-head reveal">
            <span className="eyebrow">Pricing</span>
            <span className="eyebrow-num">Simple tiers</span>
            <span className="divider" />
          </div>
          <h2 className="reveal">Pick your crew size. Results start in 48 hours.</h2>
          <div className="crew-tiers">
            {TIERS.map((tier) => (
              <div className={`crew-tier reveal ${tier.highlight ? 'crew-tier--highlight' : ''}`} key={tier.name}>
                {tier.highlight && <div className="tier-badge">Most popular</div>}
                <div className="crew-tier-agents">
                  {tier.agents.map((a) => {
                    const agent = CREW.find((c) => c.name === a)
                    return (
                      <span key={a} className="crew-tier-agent-chip" style={{ '--agent-color': agent?.color }}>
                        {a}
                      </span>
                    )
                  })}
                </div>
                <div className="crew-tier-name">{tier.name}</div>
                <div className="crew-tier-price">{tier.price}<span className="tier-period">{tier.period}</span></div>
                <p className="crew-tier-tagline">{tier.tagline}</p>
                <p className="crew-tier-best"><strong>Best for:</strong> {tier.bestFor}</p>
                <ul className="crew-tier-features">
                  {tier.features.map((f) => (
                    <li key={f}><CheckIcon />{f}</li>
                  ))}
                </ul>
                <InlineCalendly label="Book a crew call" variant={tier.highlight ? 'primary' : 'ghost'} className="crew-tier-cta" />
              </div>
            ))}
          </div>
          <p className="crew-note reveal">
            Need something custom? Contact us -- we can build a tailored crew package.
          </p>
        </div>
      </div>

      {/* Social proof */}
      <div className="wrap">
        <div className="crew-proof">
          <div className="section-head reveal">
            <span className="eyebrow">Early results</span>
            <span className="eyebrow-num">What clients say</span>
            <span className="divider" />
          </div>
          <div className="proof-grid">
            {PROOFS.map((proof) => (
              <div className="proof-card reveal" key={proof.quote}>
                <p className="proof-quote">"{proof.quote}"</p>
                <p className="proof-author">{proof.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="wrap">
        <div className="crew-faq">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <span className="eyebrow-num">Honest answers</span>
            <span className="divider" />
          </div>
          <div className="faq-grid">
            {FAQS.map((faq) => (
              <div className="faq-item reveal" key={faq.q}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

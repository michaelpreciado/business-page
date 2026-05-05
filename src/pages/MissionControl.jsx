import { useState, useEffect, useCallback } from 'react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

/* ─── Agent colour palette ─────────────────────────────────────────────── */
const AGENTS = [
  {
    id: 'campaign',
    label: 'CAMPAIGN',
    color: '#00f5d4',
    glow: 'rgba(0,245,212,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    endpoint: '/api/office/campaign',
    statKeys: [
      { key: 'total',        label: 'Total Leads' },
      { key: 'candidates',   label: 'Candidates' },
      { key: 'sent',         label: 'Sent' },
      { key: 'positiveReplies', label: 'Positive' },
      { key: 'followUpsDue', label: 'F/U Due' },
    ],
    render: (d) => d ? (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {AGENTS[0].statKeys.map(sk => (
          <div key={sk.key} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 22, fontFamily: 'var(--mono)', fontWeight: 700, color: AGENTS[0].color }}>{d.campaign?.[sk.key] ?? '—'}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{sk.label}</div>
          </div>
        ))}
      </div>
    ) : null,
  },
  {
    id: 'signals',
    label: 'SIGNALS',
    color: '#39ff14',
    glow: 'rgba(57,255,20,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    endpoint: '/api/office/signals',
    render: (d) => d?.signal ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Latest</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>{d.signal.date}</span>
          {d.signal.hasDesign && <span style={{ fontSize: 9, background: 'rgba(57,255,20,0.15)', color: '#39ff14', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.06em' }}>DESIGN ✓</span>}
        </div>
        {d.signal.tickers?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {d.signal.tickers.map(t => (
              <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'rgba(57,255,20,0.12)', color: '#39ff14', border: '1px solid rgba(57,255,20,0.3)', borderRadius: 6, padding: '3px 8px' }}>${t}</span>
            ))}
          </div>
        )}
      </div>
    ) : <span style={{ color: 'var(--ink-mute)', fontSize: 12 }}>No signal data</span>,
  },
  {
    id: 'subscribers',
    label: 'SUBSCRIBERS',
    color: '#bf5af2',
    glow: 'rgba(191,90,242,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    endpoint: '/api/office/subscribers',
    render: (d) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {[
          { k: 'total',     l: 'Total',     c: '#bf5af2' },
          { k: 'active',    l: 'Active',    c: '#39ff14' },
          { k: 'pending',   l: 'Pending',   c: '#ff9f0a' },
          { k: 'cancelled', l: 'Cancelled', c: '#ff453a' },
        ].map(s => (
          <div key={s.k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontFamily: 'var(--mono)', fontWeight: 700, color: s.c }}>{d?.[s.k] ?? 0}</div>
            <div style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'system',
    label: 'SYSTEM',
    color: '#ff9f0a',
    glow: 'rgba(255,159,10,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    endpoint: '/api/office/health',
    render: (d) => d?.checks ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Object.entries(d.checks).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{k}</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: v.ok ? '#39ff14' : '#ff453a' }}>{v.ok ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    ) : null,
  },
  {
    id: 'outreach',
    label: 'OUTREACH',
    color: '#64d2ff',
    glow: 'rgba(100,210,255,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    endpoint: '/api/office/outreach',
    render: (d) => {
      const logs = d?.logs?.slice(-5).reverse() ?? []
      if (!logs.length) return <span style={{ color: 'var(--ink-mute)', fontSize: 12 }}>No outreach runs yet</span>
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {logs.map((log, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-mute)', marginBottom: 4 }}>{log.date?.slice(0, 10)}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-dim)' }}>
                {log.results?.length > 0
                  ? log.results.map(r => `${r.platform}: ${r.posted ?? 0} posted`).join(' · ')
                  : <span style={{ color: 'var(--ink-mute)' }}>no results</span>
                }
              </div>
            </div>
          ))}
        </div>
      )
    },
  },
]

/* ─── Skeleton card ────────────────────────────────────────────────────── */
function Skeleton({ color }) {
  return (
    <div style={{
      background: 'var(--bg-2)', border: `1px solid rgba(255,255,255,0.06)`,
      borderLeft: `4px solid ${color}40`, borderRadius: 12, padding: 20,
      animation: 'pulse 1.5s ease-in-out infinite',
    }}>
      <div style={{ height: 16, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 12 }} />
      <div style={{ height: 60, background: 'rgba(255,255,255,0.04)', borderRadius: 6 }} />
    </div>
  )
}

/* ─── Agent card ───────────────────────────────────────────────────────── */
function AgentCard({ agent, data, loading, error }) {
  const ts = data?.ts ? new Date(data.ts).toLocaleTimeString() : null

  return (
    <div style={{
      background: 'var(--bg-2)',
      border: `1px solid ${agent.color}30`,
      borderLeft: `4px solid ${agent.color}`,
      borderRadius: 12,
      padding: 20,
      boxShadow: `0 0 24px ${agent.glow}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      transition: 'box-shadow 0.3s',
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: agent.color }}>{agent.icon}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: agent.color }}>{agent.label}</span>
        </div>
        {error && <span style={{ fontSize: 9, color: '#ff453a', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>ERROR</span>}
        {ts && <span style={{ fontSize: 9, color: 'var(--ink-faint)', fontFamily: 'var(--mono)' }}>{ts}</span>}
      </div>

      {/* body */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2].map(i => <div key={i} style={{ height: i === 1 ? 50 : 30, background: 'rgba(255,255,255,0.04)', borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite' }} />)}
        </div>
      ) : error ? (
        <div style={{ fontSize: 11, color: '#ff453a', fontFamily: 'var(--mono)' }}>{String(error).slice(0, 80)}</div>
      ) : (
        agent.render(data)
      )}
    </div>
  )
}

/* ─── Main page ────────────────────────────────────────────────────────── */
export default function MissionControl() {
  const [cards, setCards] = useState(Object.fromEntries(AGENTS.map(a => [a.id, { data: null, loading: true, error: null }])))
  const [refreshedAt, setRefreshedAt] = useState(null)
  const [issues, setIssues] = useState([])

  const fetchAll = useCallback(async () => {
    await Promise.all(AGENTS.map(async (agent) => {
      setCards(c => ({ ...c, [agent.id]: { ...c[agent.id], loading: true } }))
      try {
        const r = await fetch(API + agent.endpoint)
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const json = await r.json()
        setCards(c => ({ ...c, [agent.id]: { data: json, loading: false, error: null } }))
      } catch (e) {
        setCards(c => ({ ...c, [agent.id]: { data: null, loading: false, error: e.message } }))
      }
    }))
    setRefreshedAt(new Date())
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, 30_000)
    return () => clearInterval(id)
  }, [fetchAll])

  // Derive issues for coordinator
  useEffect(() => {
    const problems = []
    const c = cards
    if (c.system?.data && !c.system.data.ok) problems.push('SYSTEM DEGRADED')
    if (c.campaign?.data?.campaign?.followUpsDue > 0) problems.push(`${c.campaign.data.campaign.followUpsDue} FOLLOW-UPS DUE`)
    if (c.campaign?.error) problems.push('CAMPAIGN AGENT ERROR')
    if (c.signals?.error) problems.push('SIGNALS AGENT ERROR')
    setIssues(problems)
  }, [cards])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', padding: '40px 20px' }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .mc-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:20px; max-width:1200px; margin:0 auto; }
        .mc-bg { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
        .mc-bg-line { position:absolute; background:rgba(255,255,255,0.025); }
      `}</style>

      {/* bg grid */}
      <div className="mc-bg">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={`h${i}`} className="mc-bg-line" style={{ left: 0, right: 0, top: `${i * 5}%`, height: 1 }} />
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={`v${i}`} className="mc-bg-line" style={{ top: 0, bottom: 0, left: `${i * 5}%`, width: 1 }} />
        ))}
      </div>

      {/* coordinator header */}
      <div      style={{
        position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 40,
        maxWidth: 1200, margin: '0 auto 40px',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-faint)', marginBottom: 8 }}>
          F.R.I.D.A.Y. AGENT OFFICE
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
          Mission Control
        </h1>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: issues.length ? 'rgba(255,69,58,0.12)' : 'rgba(57,255,20,0.1)',
          border: `1px solid ${issues.length ? '#ff453a40' : '#39ff1440'}`,
          borderRadius: 999, padding: '5px 14px',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: issues.length ? '#ff453a' : '#39ff14',
            boxShadow: `0 0 6px ${issues.length ? '#ff453a' : '#39ff14'}`,
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: issues.length ? '#ff453a' : '#39ff14' }}>
            {issues.length ? issues.join(' · ') : 'ALL SYSTEMS NOMINAL'}
          </span>
        </div>
        {refreshedAt && (
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-faint)', marginTop: 8 }}>
            LAST REFRESH {refreshedAt.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* agent grid */}
      <div className="mc-grid" style={{ position: 'relative', zIndex: 1 }}>
        {AGENTS.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            data={cards[agent.id]?.data}
            loading={cards[agent.id]?.loading}
            error={cards[agent.id]?.error}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: 40 }}>
        <button
          onClick={fetchAll}
          style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, padding: '8px 20px', color: 'var(--ink-dim)',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
        >
          REFRESH ↺
        </button>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-faint)', marginTop: 10 }}>
          Auto-refreshes every 30s
        </div>
      </div>
    </div>
  )
}

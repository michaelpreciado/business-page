import { useState } from 'react'

export default function Unsubscribe() {
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('')

  const handle = (e) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0c', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#050b18', border: '1px solid rgba(74,184,255,0.35)', borderRadius: '16px', padding: '40px 32px', maxWidth: '480px', width: '100%', boxShadow: '0 0 40px rgba(74,184,255,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#4ab8ff', marginBottom: '8px' }}>&gt; ticker_signal // unsubscribe</div>
          <h1 style={{ fontFamily: 'ui-monospace, monospace', fontSize: '28px', fontWeight: '700', color: '#7cd6ff', textShadow: '0 0 20px rgba(124,214,255,0.6)', margin: '0 0 12px' }}>Unsubscribe</h1>
          <p style={{ color: 'rgba(230,241,255,0.55)', fontFamily: 'ui-monospace, monospace', fontSize: '13px', lineHeight: '1.6', margin: '0' }}>
            Sorry to see you go. Enter your email to unsubscribe from Ticker Signals.
          </p>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(40,200,64,0.08)', border: '1px solid rgba(40,200,64,0.3)', borderRadius: '12px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✓</div>
            <p style={{ fontFamily: 'ui-monospace, monospace', color: '#28c840', fontSize: '14px', margin: '0' }}>
              You're unsubscribed. You'll no longer receive Ticker Signals emails.
            </p>
            <p style={{ fontFamily: 'ui-monospace, monospace', color: 'rgba(230,241,255,0.4)', fontSize: '11px', margin: '12px 0 0' }}>
              Come back anytime at preciadotech.com
            </p>
          </div>
        ) : (
          <form onSubmit={handle}>
            <label style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#4ab8ff', display: 'block', marginBottom: '8px' }}>Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ width: '100%', background: '#020812', border: '1px solid rgba(74,184,255,0.35)', borderRadius: '8px', padding: '12px 14px', color: '#e6f1ff', fontFamily: 'ui-monospace, monospace', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }}
            />
            <button type="submit" style={{ width: '100%', background: 'rgba(74,184,255,0.12)', border: '1px solid rgba(74,184,255,0.6)', borderRadius: '8px', padding: '12px', color: '#7cd6ff', fontFamily: 'ui-monospace, monospace', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Confirm unsubscribe
            </button>
          </form>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid rgba(74,184,255,0.15)', paddingTop: '20px' }}>
          <p style={{ color: 'rgba(230,241,255,0.4)', fontFamily: 'ui-monospace, monospace', fontSize: '11px', margin: '0' }}>
            Ticker Signals · preciadotech.com
          </p>
        </div>
      </div>
    </div>
  )
}

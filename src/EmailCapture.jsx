import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const EmailCapture = ({ title, subtitle, cta = 'Get Pro access', ctaHref, mode = 'form' }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    // In payment mode: call /api/subscribe first (captures email, sends instant signal)
    // then redirect to Stripe checkout
    if (mode === 'payment' && ctaHref) {
      try {
        // Call subscribe API to capture email and trigger instant welcome signal
        if (API_BASE) {
          await fetch(`${API_BASE}/api/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          })
        }
      } catch (_) {
        // Non-fatal — proceed to Stripe anyway
      }
      const stripeUrl = new URL(ctaHref)
      stripeUrl.searchParams.set('prefilled_email', email)
      window.open(stripeUrl.toString(), '_blank')
      setStatus('success')
      setEmail('')
      return
    }

    try {
      await new Promise((r) => setTimeout(r, 800))
      setStatus('success')
      setEmail('')
    } catch (err) {
      setErrorMsg('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="email-capture email-capture--success">
        <div className="email-success-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        {mode === 'payment' ? (
          <>
            <h3>Opening Stripe checkout...</h3>
            <p>If nothing happened, <a href={ctaHref} target="_blank" rel="noreferrer">click here to open checkout</a>.</p>
          </>
        ) : (
          <>
            <h3>You're on the list.</h3>
            <p>We'll send your first Ticker signal this Monday. Check your inbox.</p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="email-capture">
      {title && <h3 className="email-capture-title">{title}</h3>}
      {subtitle && <p className="email-capture-sub">{subtitle}</p>}
      <form className="email-capture-form" onSubmit={handleSubmit}>
        <div className="email-input-group">
          <input
            type="email"
            className="email-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="btn btn-primary email-submit"
            disabled={status === 'loading' || !email}
          >
            {status === 'loading' ? (
              <span className="email-spinner" />
            ) : (
              cta
            )}
          </button>
        </div>
        {status === 'error' && (
          <p className="email-error">{errorMsg}</p>
        )}
        {mode === 'payment' ? (
          <p className="email-disclaimer">$5/mo · Cancel anytime · Stripe checkout</p>
        ) : (
          <p className="email-disclaimer">Free weekly signal. No spam. Unsubscribe anytime.</p>
        )}
      </form>
    </div>
  )
}

export default EmailCapture
import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const EmailCapture = ({ title, subtitle, cta = 'Subscribe' }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  // Auto-clear success after 5 seconds to allow re-subscribe
  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => setStatus('idle'), 5000)
      return () => clearTimeout(t)
    }
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      if (API_BASE) {
        const r = await fetch(`${API_BASE}/api/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        if (!r.ok) throw new Error('Subscription failed')
      }
      setStatus('success')
      setEmail('')
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again or email michael@preciado-tech.com')
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
        <h3>You're on the list.</h3>
        <p>Thanks for subscribing to Preciado Tech updates. We'll keep you posted.</p>
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
        <p className="email-disclaimer">Free updates. No spam. Unsubscribe anytime.</p>
      </form>
    </div>
  )
}

export default EmailCapture

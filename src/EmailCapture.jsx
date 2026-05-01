import { useState } from 'react'

/**
 * EmailCapture — Formspree-based waitlist signup for Ticker Signals free tier.
 * Set VITE_FORMSPREE_ENDPOINT in .env to your Formspree form ID.
 * Example: VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xpwqbkjr
 * Sign up free at https://formspree.io/
 */
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

const EmailCapture = ({ title, subtitle, cta = 'Get early access' }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email, source: 'ticker-signals-waitlist' }),
        })
        if (res.ok) {
          setStatus('success')
          setEmail('')
        } else {
          const data = await res.json()
          setErrorMsg(data?.errors?.[0]?.message || 'Something went wrong. Try again.')
          setStatus('error')
        }
      } else {
        // Dev mode — simulate success
        await new Promise((r) => setTimeout(r, 800))
        setStatus('success')
        setEmail('')
      }
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
        <h3>You're on the list.</h3>
        <p>We'll send your first Ticker signal this Friday. Check your inbox.</p>
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
        <p className="email-disclaimer">
          Free forever. No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}

export default EmailCapture

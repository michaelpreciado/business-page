/**
 * InlineCalendly — "Book a crew call" CTA component.
 *
 * Set VITE_CALENDLY_URL in .env to your Calendly link, e.g.:
 *   VITE_CALENDLY_URL=https://calendly.com/michaelpreciado/crew-call
 *
 * The button opens Calendly in a new tab. For inline embed,
 * replace with: <div class="calendly-inline-widget" data-url={CALENDLY_URL} />
 * (Requires Calendly Pro plan for inline widget)
 */
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || ''

const InlineCalendly = ({
  label = 'Book a crew call',
  variant = 'primary', // primary | ghost
  className = '',
}) => {
  const handleClick = () => {
    if (CALENDLY_URL) {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
    } else {
      // Fallback: open mailto
      window.location.href = 'mailto:michael@preciadotech.com?subject=Crew+Call+Request&body=Hi%20Michael%2C%0A%0AI%27d%20like%20to%20schedule%20a%20crew%20call%20to%20discuss%20the%20Agent%20Crew%20service.%0A%0ACompany%3A%0ABest%20time%20to%20reach%20me%3A%0A'
    }
  }

  const cls = `inline-calendly-btn btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`

  return (
    <button className={cls} onClick={handleClick} type="button">
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
        <path d="M7 17L17 7M17 7H7M17 7v10"/>
      </svg>
    </button>
  )
}

export default InlineCalendly

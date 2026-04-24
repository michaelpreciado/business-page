import { useRef } from 'react'

export default function SpotlightCard({ children, className = '', as = 'article', ...props }) {
  const El = as
  const ref = useRef(null)

  function onMouseMove(e) {
    const el = ref.current
    if (!el) return
    const { left, top } = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - left}px`)
    el.style.setProperty('--sy', `${e.clientY - top}px`)
  }

  return (
    <El ref={ref} className={`spotlight-card ${className}`} onMouseMove={onMouseMove} {...props}>
      {children}
    </El>
  )
}

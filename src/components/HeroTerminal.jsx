import { useEffect, useState } from 'react'

const LINES = [
  { kind: 'cmd', text: 'preciado audit --business', delay: 380 },
  { kind: 'out', text: 'scanning workflows…', delay: 640 },
  { kind: 'out', text: '14 manual steps found', delay: 560 },
  { kind: 'out', text: '9 automatable with AI', delay: 560 },
  { kind: 'hl', text: '~6.5 hrs / week reclaimed', delay: 720 },
  { kind: 'cmd', text: '', delay: 0, caret: true },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function HeroTerminal() {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? LINES.length : 0))

  useEffect(() => {
    if (shown >= LINES.length) return
    const t = setTimeout(() => setShown((s) => s + 1), LINES[shown].delay)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <div className="hero-term" role="img" aria-label="Preciado Tech workflow audit preview">
      <div className="hero-term__bar" aria-hidden="true">
        <span className="hero-term__dots">
          <span className="hero-term__dot dot-r" />
          <span className="hero-term__dot dot-y" />
          <span className="hero-term__dot dot-g" />
        </span>
        <span className="hero-term__path">preciado-tech — audit</span>
        <span className="hero-term__status">live</span>
      </div>
      <div className="hero-term__body">
        {LINES.slice(0, shown).map((line, i) => {
          if (line.kind === 'cmd') {
            return (
              <div className="tk-row" key={i}>
                <span className="tk-prompt">~</span>
                <span className="tk-sigil">$</span>
                <span className="tk-cmd">{line.text}</span>
                {line.caret && <span className="tk-caret" aria-hidden="true" />}
              </div>
            )
          }
          return (
            <div className={`tk-row ${line.kind === 'hl' ? 'tk-hl' : 'tk-out'}`} key={i}>
              <span className="tk-arrow">→</span>
              <span>{line.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

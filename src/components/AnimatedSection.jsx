import { motion, useReducedMotion } from 'framer-motion'

const Div = motion.div

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AnimatedSection({ children, className, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <Div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      variants={reduce ? { visible: { opacity: 1, y: 0 } } : fadeUp}
    >
      {children}
    </Div>
  )
}

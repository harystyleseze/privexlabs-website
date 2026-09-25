import { useEffect, useRef } from 'react'

import { OV, OV_HIGHLIGHT } from 'src/content/site'
import { clamp } from 'src/lib/math'

import styles from './Overview.module.css'

const WORDS = OV.split(' ')

const Overview = () => {
  const sec = useRef<HTMLElement>(null)

  // Words brighten with scroll progress through the section (design scroll(), overview branch).
  useEffect(() => {
    const el = sec.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-w]'))
    const run = () => {
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      if (!(r.top < vh && r.bottom > 0)) return
      const p = clamp((vh * 0.85 - r.top) / (r.height * 0.7))
      const n = words.length
      words.forEach((w, i) => {
        w.style.opacity = (0.14 + 0.86 * clamp(p * n * 1.1 - i)).toFixed(3)
      })
    }
    run()
    window.addEventListener('scroll', run, { passive: true })
    return () => window.removeEventListener('scroll', run)
  }, [])

  return (
    <section
      id="overview"
      ref={sec}
      data-sec="01 / OVERVIEW"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.aside}>
          <span className={`px-label ${styles.accent}`}>01 / OVERVIEW</span>
          <p className={styles.intro}>
            PrivexLabs is an AI and software technology company focused on
            building practical, secure, and intelligent solutions for
            businesses.
          </p>
        </div>
        <div className={styles.main}>
          <p className={styles.statement}>
            {WORDS.map((t, i) => (
              <span
                key={i}
                data-w="1"
                className={styles.word}
                data-hi={OV_HIGHLIGHT.has(t)}
              >
                {t}
              </span>
            ))}
          </p>
          <div className={styles.columns}>
            <p data-reveal="0" className={styles.column}>
              We help organizations identify valuable opportunities for AI,
              build custom AI-powered systems, work with proprietary data,
              deploy AI models within controlled environments, and integrate
              intelligent systems into real-world business operations.
            </p>
            <p data-reveal="120" className={styles.column}>
              Our work spans AI engineering, software development, private AI
              infrastructure, model customization, AI deployment, automation,
              and AI education/training.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview

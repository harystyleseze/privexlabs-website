'use client'

import { useEffect, useRef } from 'react'

import Button from '@/components/ui/Button/Button'
import { useSite } from '@/layouts/SiteLayout/SiteContext'
import { buildHero, createHeroState, drawHero } from '@/lib/canvas/hero'
import { resizeCanvas } from '@/lib/hooks/useCanvasSize'
import { usePalette } from '@/lib/hooks/usePalette'
import { useTicker } from '@/lib/hooks/useTicker'

import styles from './Hero.module.css'

const Hero = () => {
  const { viewport, motion, fine, ready } = useSite()
  const cv = useRef<HTMLCanvasElement>(null)
  const coord = useRef<HTMLSpanElement>(null)
  const sig = useRef<HTMLSpanElement>(null)
  const hl1 = useRef<HTMLSpanElement>(null)
  const hl2 = useRef<HTMLSpanElement>(null)
  const hl3 = useRef<HTMLSpanElement>(null)
  const st = useRef(createHeroState())
  const mouse = useRef({ mx: -9999, my: -9999, lastMove: -1e9 })
  const palette = usePalette()

  // Size the canvas and rebuild the grid on mount and whenever the viewport changes.
  useEffect(() => {
    const c = cv.current
    if (!c) return
    resizeCanvas(c)
    buildHero(c, st.current)
  }, [viewport.vw, viewport.vh, viewport.mobile])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.mx = e.clientX
      mouse.current.my = e.clientY
      mouse.current.lastMove = performance.now()
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useTicker((t) => {
    const c = cv.current
    const C = palette.current
    if (!c || !C) return
    drawHero(c, st.current, motion ? t : 0, t, {
      ...mouse.current,
      fine,
      motion,
      C,
      coordEl: coord.current,
      sigEl: sig.current,
      lines: [hl1.current, hl2.current, hl3.current],
    })
  }, ready)

  return (
    <section id="top" data-sec="00 / INDEX" className={styles.section}>
      <canvas ref={cv} aria-hidden="true" className={styles.canvas} />
      <div className={styles.top}>
        <span className={`px-label ${styles.accent}`}>
          PRIVEXLABS / SOFTWARE · AUTOMATION · PRACTICAL AI
        </span>
        <span className="px-label">
          SYSTEM MAP / 00 — <span ref={sig}>LISTENING</span>
        </span>
      </div>
      <h1 className={styles.h1}>
        <span ref={hl1} className={styles.line}>
          Automate.
        </span>
        <span ref={hl2} className={`${styles.line} ${styles.line2}`}>
          Connect.
        </span>
        <span ref={hl3} className={`${styles.line} ${styles.line3}`}>
          <span className={styles.primary}>Control.</span>
          <span className={styles.square} />
        </span>
      </h1>
      <div className={styles.bottom}>
        <div className={styles.lead}>
          <p className={styles.leadText}>
            We help growing businesses replace manual work, disconnected tools,
            and spreadsheets with systems they can understand,{' '}
            <span className={styles.leadStrong}>control, and grow with.</span>
          </p>
          <div className={styles.actions}>
            <Button as="a" href="#contact" size="lg" data-cursor="OPEN">
              Tell us what&apos;s slowing you down
            </Button>
            <Button
              as="a"
              href="#approach"
              size="lg"
              variant="secondary"
              data-cursor="EXPLORE"
            >
              See how we work
            </Button>
          </div>
        </div>
        <div className={styles.meta}>
          <span ref={coord} className={`px-label ${styles.coord}`}>
            X 0000 · Y 0000
          </span>
          <span className="px-label">
            MANUAL → MAPPED → AUTOMATED → CONNECTED → IN CONTROL
          </span>
          <span className={`px-label ${styles.accent}`}>SCROLL ↓</span>
        </div>
      </div>
    </section>
  )
}

export default Hero

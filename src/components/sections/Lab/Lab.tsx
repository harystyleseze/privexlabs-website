'use client'

import { useEffect, useRef, useState } from 'react'

import { EXPS, MODE_L } from '@/content/site'
import { useSite } from '@/layouts/SiteLayout/SiteContext'
import { drawLab, type LabState } from '@/lib/canvas/lab'
import { resizeCanvas } from '@/lib/hooks/useCanvasSize'
import { usePalette } from '@/lib/hooks/usePalette'
import { useTicker } from '@/lib/hooks/useTicker'
import { pad3 } from '@/lib/math'

import styles from './Lab.module.css'

const Lab = () => {
  const { viewport, motion, ready, signal } = useSite()
  const sec = useRef<HTMLElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const st = useRef<LabState>({ langW: null })
  const expT = useRef(0)
  const [exp, setExp] = useState(0)
  const palette = usePalette(sec)
  const mobile = viewport.mobile
  const es = EXPS[exp]

  // The design's pick('exp', i): change the specimen and count one signal.
  const pick = (i: number) => {
    if (i === exp) return
    setExp(i)
    signal()
  }
  // Stamp the switch time so the new specimen eases in.
  useEffect(() => {
    expT.current = performance.now()
  }, [exp])

  useEffect(() => {
    const c = cv.current
    if (!c) return
    resizeCanvas(c)
    st.current.langW = null
  }, [viewport.vw, viewport.vh, mobile])

  useTicker((t) => {
    const c = cv.current
    const C = palette.current
    if (!c || !C) return
    drawLab(c, st.current, motion ? t : 0, {
      mode: es[2],
      expT: expT.current,
      motion,
      C,
    })
  }, ready)

  return (
    <section
      id="lab"
      ref={sec}
      data-theme="dark"
      data-sec="09 / LAB"
      className={styles.section}
    >
      <div aria-hidden="true" className={styles.backdrop}>
        Lab
      </div>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={`px-label ${styles.accent}`}>
            09 / WHAT WE&apos;RE EXPLORING
          </span>
          <h2 data-reveal="0" className={styles.h2}>
            We&apos;re not just fixing today&apos;s problems.{' '}
            <span className={styles.h2Serif}>
              We&apos;re preparing for the ones growth brings.
            </span>
          </h2>
          <p data-reveal="120" className={styles.intro}>
            Everything we explore has to connect to something a growing business
            can use: cheaper, faster, more private, or easier to work with.
          </p>
        </div>
        <div className={styles.body}>
          <div className={styles.specimen} data-mobile={mobile}>
            <div className={styles.specimenHead}>
              <span className={`px-label ${styles.accent}`}>
                SPECIMEN / EXP {pad3(exp + 1)}
              </span>
              <span className={styles.running}>
                <span data-pulse="1" className={styles.pulse} />
                <span className={`px-label ${styles.secondary}`}>RUNNING</span>
              </span>
            </div>
            <canvas ref={cv} aria-hidden="true" className={styles.canvas} />
            <div className={styles.specimenFoot}>
              <span className={styles.specimenName}>{es[0]}</span>
              <span className="px-label">MODE / {MODE_L[es[2]]}</span>
            </div>
          </div>
          <div className={styles.list} data-mobile={mobile}>
            {EXPS.map(([name, dom], i) => (
              <button
                key={`${name}-${i}`}
                type="button"
                onMouseEnter={() => pick(i)}
                onClick={() => pick(i)}
                onFocus={() => pick(i)}
                data-cursor="RUN"
                className={styles.row}
                data-active={i === exp}
              >
                <span className={styles.rowK}>EXPERIMENT {pad3(i + 1)}</span>
                <span className={styles.rowName}>
                  <span className={styles.rowBar} />
                  {name}
                </span>
                <span className={styles.rowDom}>{dom}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Lab

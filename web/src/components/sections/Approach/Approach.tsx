import { useCallback, useRef, useState } from 'react'

import { ST_POS, STEPS } from 'src/content/site'
import { useScrollProgress } from 'src/lib/hooks/useScrollProgress'
import { clamp, ease, pad2 } from 'src/lib/math'

import styles from './Approach.module.css'

const LOOP = 'M100 40 H560 V360 H40 V40 H100'
const K = [0, 0.119, 0.238, 0.5, 0.619, 0.738, 1]

const Approach = () => {
  const sec = useRef<HTMLElement>(null)
  const path = useRef<SVGPathElement>(null)
  const dot = useRef<SVGRectElement>(null)
  const stepRef = useRef(0)
  const [step, setStep] = useState(0)

  const onProgress = useCallback((p: number) => {
    const pa = path.current
    if (!pa) return
    const seg = Math.min(5.9999, p * 6)
    const idx = Math.floor(seg)
    const loc = ease(clamp((seg - idx - 0.15) / 0.7))
    const f = K[idx] + (K[idx + 1] - K[idx]) * loc
    pa.style.strokeDashoffset = (1 - f).toFixed(4)
    const L = pa.getTotalLength()
    const pt = pa.getPointAtLength(f * L)
    dot.current?.setAttribute(
      'transform',
      `translate(${(pt.x - 6).toFixed(1)} ${(pt.y - 6).toFixed(1)})`
    )
    if (idx !== stepRef.current) {
      stepRef.current = idx
      setStep(idx)
    }
  }, [])
  useScrollProgress(sec, onProgress)

  return (
    <section
      id="approach"
      ref={sec}
      data-sec="05 / APPROACH"
      className={styles.section}
    >
      <div className={styles.sticky}>
        <div className={styles.head}>
          <span className={`px-label ${styles.accent}`}>05 / HOW WE WORK</span>
          <span className="px-label">
            We start with the problem, not the technology.
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.steps}>
            {STEPS.map((ps, i) => (
              <div
                key={ps.n}
                className={styles.step}
                style={{
                  opacity: i === step ? 1 : 0,
                  transform: `translateY(${i === step ? '0px' : i < step ? '-16px' : '16px'})`,
                  pointerEvents: i === step ? 'auto' : 'none',
                }}
              >
                <span className="px-label">STEP {pad2(i + 1)} / 06</span>
                <div className={styles.stepTitle}>
                  <span className={styles.stepNum}>{pad2(i + 1)}</span>
                  <span className={styles.stepName}>{ps.n}</span>
                </div>
                <p className={styles.stepText}>{ps.t}</p>
                <div className={styles.options}>
                  {ps.o.map((op) => (
                    <span key={op} className={styles.option}>
                      {op}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.diagramWrap}>
            <div className={styles.diagram}>
              <svg viewBox="0 0 600 400" className={styles.svg}>
                <path d={LOOP} className={styles.loopBase} />
                <path
                  ref={path}
                  d={LOOP}
                  pathLength={1}
                  className={styles.loopActive}
                />
                {STEPS.map((x, i) => {
                  const [cx, cy] = ST_POS[i]
                  return (
                    <rect
                      key={x.n}
                      x={cx - 7}
                      y={cy - 7}
                      width="14"
                      height="14"
                      className={styles.station}
                      data-state={
                        i === step ? 'active' : i < step ? 'reached' : 'pending'
                      }
                    />
                  )
                })}
                <rect ref={dot} width="12" height="12" className={styles.dot} />
                <path d="M34 214 L40 204 L46 214" className={styles.arrow} />
              </svg>
              {STEPS.map((x, i) => {
                const [cx, cy] = ST_POS[i]
                return (
                  <div
                    key={x.n}
                    className={styles.stationLabel}
                    data-state={
                      i === step ? 'active' : i < step ? 'reached' : 'pending'
                    }
                    style={{
                      left: `${cx / 6}%`,
                      top: `${cy / 4}%`,
                      transform:
                        cy < 200
                          ? 'translate(-50%, calc(-100% - 14px))'
                          : 'translate(-50%, 14px)',
                    }}
                  >
                    <span className={styles.stationK}>{pad2(i + 1)}</span>
                    <span className={styles.stationN}>{x.n}</span>
                  </div>
                )
              })}
              <div className={styles.loopLabel}>LOOP / LEARN</div>
              <div className={styles.center}>
                <span className={`px-label ${styles.centerLabel}`}>
                  MEASURE → LEARN → IMPROVE
                </span>
                <span className={styles.centerText}>
                  The objective is not to deliver software. It&apos;s to make
                  the business measurably easier to run.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Approach

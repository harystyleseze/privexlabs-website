import { useCallback, useRef, useState } from 'react'

import { DIR, DIRECTION_CLOSING } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { useScrollProgress } from 'src/lib/hooks/useScrollProgress'
import { pad2 } from 'src/lib/math'

import styles from './Direction.module.css'

const Direction = () => {
  const { viewport } = useSite()
  const sec = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const diRef = useRef(0)
  const [di, setDi] = useState(0)
  const mobile = viewport.mobile

  const onProgress = useCallback((p: number) => {
    const tr = track.current
    if (!tr) return
    const max = Math.max(0, tr.scrollWidth - window.innerWidth)
    tr.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0)`
    if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`
    const next = Math.min(5, Math.floor(p * 6))
    if (next !== diRef.current) {
      diRef.current = next
      setDi(next)
    }
  }, [])
  useScrollProgress(sec, onProgress)

  return (
    <section
      id="direction"
      ref={sec}
      data-sec="12 / JOURNEY"
      className={styles.section}
    >
      <div className={styles.sticky}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <span className={`px-label ${styles.accent}`}>
              12 / WHERE THIS GOES
            </span>
            <h2 className={styles.h2}>Where this takes your business.</h2>
            <p className={styles.intro}>
              The move from fragmented, manual operations to connected,
              automated systems happens in stages. Most businesses are somewhere
              on this line.
            </p>
          </div>
          <div className={styles.barTrack}>
            <div ref={bar} className={styles.bar} />
          </div>
        </div>
        <div ref={track} className={styles.track}>
          {DIR.map((n, i) => {
            const last = i === 5
            const w = last
              ? mobile
                ? '88vw'
                : 'min(60vw, 820px)'
              : mobile
                ? '78vw'
                : 'clamp(300px, 40vw, 620px)'
            return (
              <div key={n} className={styles.stage} style={{ width: w }}>
                <div className={styles.rail}>
                  <span className={styles.node} data-on={i <= di} />
                  <span className={styles.railLine} />
                </div>
                <span className={`px-label ${styles.accent}`}>
                  STAGE {pad2(i + 1)}
                </span>
                <span className={styles.stageName} data-last={last}>
                  {n}
                </span>
                {last && <p className={styles.closing}>{DIRECTION_CLOSING}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Direction

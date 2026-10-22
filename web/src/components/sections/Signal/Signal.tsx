import { useEffect, useRef, useState } from 'react'

import { STAGES } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { buildStory, drawStory, type StoryState } from 'src/lib/canvas/story'
import { resizeCanvas } from 'src/lib/hooks/useCanvasSize'
import { usePalette } from 'src/lib/hooks/usePalette'
import { useTicker } from 'src/lib/hooks/useTicker'
import { pad2 } from 'src/lib/math'

import styles from './Signal.module.css'

const Signal = () => {
  const { viewport, motion, ready } = useSite()
  const sec = useRef<HTMLElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const story = useRef<StoryState | null>(null)
  const stageRef = useRef(0)
  const [stage, setStage] = useState(0)
  const palette = usePalette()
  const mobile = viewport.mobile

  useEffect(() => {
    const c = cv.current
    if (!c) return
    resizeCanvas(c)
    story.current = buildStory(mobile, story.current)
  }, [viewport.vw, viewport.vh, mobile])

  useTicker((t) => {
    const s = sec.current
    const c = cv.current
    const C = palette.current
    if (!s || !c || !C || !story.current) return
    const next = drawStory(s, c, story.current, motion ? t : 0, C)
    if (next !== null && next !== stageRef.current) {
      stageRef.current = next
      setStage(next)
    }
  }, ready)

  return (
    <section
      id="signal"
      ref={sec}
      data-sec="02 / SIGNAL"
      className={styles.section}
    >
      <div className={styles.sticky}>
        <canvas ref={cv} aria-hidden="true" className={styles.canvas} />
        <div className={styles.bar}>
          <span className={`px-label ${styles.accent}`}>
            02 / FROM MANUAL TO IN CONTROL
          </span>
          <div className={styles.progress}>
            <div className={styles.ticks}>
              {STAGES.map((s, i) => (
                <span key={s[0]} className={styles.tick} data-on={i <= stage} />
              ))}
            </div>
            <span className={`px-label ${styles.count}`}>
              {pad2(stage + 1)} / 05
            </span>
            <span className={`px-label ${styles.status}`}>
              {STAGES[stage][1]}
            </span>
          </div>
        </div>
        <div className={styles.copy} data-mobile={mobile}>
          {STAGES.map((s, i) => (
            <p
              key={s[0]}
              className={styles.copyText}
              style={{
                opacity: i === stage ? 1 : 0,
                transform: `translateY(${i === stage ? '0px' : i < stage ? '-14px' : '14px'})`,
              }}
            >
              {s[2]}
            </p>
          ))}
        </div>
        <div className={styles.words}>
          <div
            className={styles.wordTrack}
            style={{ transform: `translateY(-${(stage * 1.1).toFixed(2)}em)` }}
          >
            {STAGES.map((s, i) => (
              <div key={s[0]} className={styles.word} data-last={i === 4}>
                {s[0]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signal

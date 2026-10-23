import { MISSION } from '@/content/site'
import { pad2 } from '@/lib/math'

import styles from './Vision.module.css'

const Vision = () => (
  <section id="vision" data-sec="03 / VISION" className={styles.section}>
    <div className={styles.inner}>
      <div className={styles.top}>
        <span className={`px-label ${styles.accent}`}>
          03 / WHAT WE&apos;RE HERE TO DO
        </span>
        <h2 data-reveal="0" className={styles.h2}>
          Technology that gives you more{' '}
          <span className={styles.primary}>control</span> over how your business
          runs.
        </h2>
        <div className={styles.paras}>
          <p data-reveal="100" className={styles.para}>
            Our ambition is to help growing businesses move from fragmented,
            manual operations to connected, intelligent, and increasingly
            automated systems they understand and own.
          </p>
          <p data-reveal="200" className={styles.paraSerif}>
            Not AI for its own sake. Technology applied to the real problems
            that slow a business down, chosen because it works, and measured by
            whether it did.
          </p>
        </div>
      </div>
      <div className={styles.mission}>
        <div className={styles.missionHead}>
          <span className={`px-label ${styles.accent}`}>MISSION</span>
          <h3 className={styles.h3}>
            To make operational technology practical and accessible to growing
            businesses.
          </h3>
          <span className={`px-label ${styles.achieve}`}>
            WE ACHIEVE THIS BY
          </span>
        </div>
        <ol className={styles.list}>
          {MISSION.map((t, i) => (
            <li key={t} className={styles.item}>
              <span className={`px-label ${styles.k}`}>{pad2(i + 1)}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
)

export default Vision

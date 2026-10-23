'use client'

import { useSite } from '@/layouts/SiteLayout/SiteContext'
import { pad4 } from '@/lib/math'

import styles from './SystemCheck.module.css'

const SystemCheck = () => {
  const { signals } = useSite()
  return (
    <section data-theme="dark" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.terminal}>
          <div data-reveal="0">&gt; privexlabs / system check</div>
          <div data-reveal="220">
            &gt; capabilities ........{' '}
            <span className={styles.primary}>06 / 06 LOADED</span>
          </div>
          <div data-reveal="440">&gt; approach ............ PROBLEM-FIRST</div>
          <div data-reveal="660">
            &gt; deployment .......... CLOUD · PRIVATE CLOUD · ON-PREMISE ·
            LOCAL · HYBRID
          </div>
          <div data-reveal="880">
            &gt; objective ........... LESS MANUAL WORK · MORE CONTROL
          </div>
          <div data-reveal="1100" className={styles.primary}>
            &gt; SYSTEM / READY <span data-pulse="1" className={styles.caret} />
          </div>
        </div>
        <div data-reveal="1200" className={styles.counter}>
          <span className="px-label">SIGNALS FROM YOU / THIS SESSION</span>
          <span className={styles.big}>{pad4(signals)}</span>
          <span className={`px-label ${styles.secondary}`}>
            EVERY NODE YOU OPEN IS COUNTED HERE
          </span>
        </div>
      </div>
    </section>
  )
}

export default SystemCheck

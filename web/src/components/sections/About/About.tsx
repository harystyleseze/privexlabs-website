import CropMark from 'src/components/ui/CropMark/CropMark'
import { DIFFS, SECTORS } from 'src/content/site'
import { pad2 } from 'src/lib/math'

import styles from './About.module.css'

const About = () => (
  <section id="about" data-sec="11 / ABOUT" className={styles.section}>
    <div className={styles.inner}>
      <div className={styles.block}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <span className={`px-label ${styles.accent}`}>
              11 / WHY PRIVEXLABS
            </span>
            <h2 data-reveal="0" className={styles.h2}>
              What working with us is like.
            </h2>
          </div>
        </div>
        <div className={styles.grid}>
          <CropMark corner="tl" offset={6} />
          {DIFFS.map(([n, t], i) => (
            <div key={n} data-cursor="VIEW" className={styles.cell}>
              <span className={`px-label ${styles.accent}`}>
                D / {pad2(i + 1)}
              </span>
              <span className={styles.cellName}>{n}</span>
              <span className={styles.cellText}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.who}>
        <div className={styles.whoHead}>
          <span className={`px-label ${styles.accent}`}>
            YOU&apos;LL RECOGNISE YOURSELF IF
          </span>
          <p className={styles.whoText}>
            You&apos;re a growing business whose tools, spreadsheets, and
            routines were fine at half your current size, and now cost you time,
            errors, and visibility every week.
          </p>
        </div>
        <div className={styles.sectors}>
          {SECTORS.map((t, i) => (
            <div key={t} className={styles.sector}>
              <span className={`px-label ${styles.sectorK}`}>
                {pad2(i + 1)}
              </span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default About

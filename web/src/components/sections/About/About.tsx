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
              11 / DIFFERENTIATION
            </span>
            <h2 data-reveal="0" className={styles.h2}>
              PrivexLabs seeks to differentiate through five principles.
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
          <span className={`px-label ${styles.accent}`}>WHO WE WORK WITH</span>
          <p className={styles.whoText}>
            Organizations that have significant amounts of data, repetitive
            workflows, specialized knowledge, or operational processes that can
            benefit from intelligent automation.
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

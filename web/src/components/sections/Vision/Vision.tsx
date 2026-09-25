import { MISSION } from 'src/content/site'
import { pad2 } from 'src/lib/math'

import styles from './Vision.module.css'

const Vision = () => (
  <section id="vision" data-sec="03 / VISION" className={styles.section}>
    <div className={styles.inner}>
      <div className={styles.top}>
        <span className={`px-label ${styles.accent}`}>03 / VISION</span>
        <h2 data-reveal="0" className={styles.h2}>
          To build technology that makes businesses more{' '}
          <span className={styles.primary}>intelligent</span>, capable, and
          efficient.
        </h2>
        <div className={styles.paras}>
          <p data-reveal="100" className={styles.para}>
            PrivexLabs aims to become a leading technology company for
            organizations that want to understand, adopt, build, and control
            their own AI capabilities.
          </p>
          <p data-reveal="200" className={styles.paraSerif}>
            We envision a future where businesses are not merely consumers of AI
            products, but are able to use their own data, infrastructure, and
            workflows to create intelligent systems tailored to their needs.
          </p>
        </div>
      </div>
      <div className={styles.mission}>
        <div className={styles.missionHead}>
          <span className={`px-label ${styles.accent}`}>MISSION</span>
          <h3 className={styles.h3}>
            To make advanced AI and software practical and accessible to
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

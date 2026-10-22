import { PRINCIPLES } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { usePick } from 'src/lib/hooks/usePick'
import { pad2 } from 'src/lib/math'

import styles from './Principles.module.css'

const Principles = () => {
  const { viewport } = useSite()
  const [pr, pick] = usePick(0)
  return (
    <section
      id="principles"
      data-sec="10 / PRINCIPLES"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.aside}>
          <span className={`px-label ${styles.accent}`}>10 / PRINCIPLES</span>
          <p className={styles.intro}>Six rules we hold ourselves to.</p>
          <span aria-hidden="true" className={styles.number}>
            {pad2(pr + 1)}
          </span>
        </div>
        <div className={styles.list} data-mobile={viewport.mobile}>
          {PRINCIPLES.map(([t, d], i) => (
            <button
              key={t}
              type="button"
              onMouseEnter={() => pick(i)}
              onClick={() => pick(i)}
              onFocus={() => pick(i)}
              data-cursor="READ"
              className={styles.item}
              data-active={i === pr}
            >
              <span className={styles.title}>{t}</span>
              <span className={styles.descWrap}>
                <span className={styles.desc}>{d}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Principles

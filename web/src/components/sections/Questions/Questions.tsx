import { QS } from 'src/content/site'
import { usePick } from 'src/lib/hooks/usePick'
import { pad2 } from 'src/lib/math'

import styles from './Questions.module.css'

const Questions = () => {
  const [q, pick] = usePick(0)
  return (
    <section
      id="questions"
      data-sec="07 / QUESTIONS"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div aria-hidden="true" className={styles.digits}>
          <span>0</span>
          <span className={styles.roller}>
            <span
              className={styles.rollerTrack}
              style={{ transform: `translateY(-${q}em)` }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={styles.digit}>
                  {n}
                </span>
              ))}
            </span>
          </span>
        </div>
        <div className={styles.main}>
          <span className={`px-label ${styles.accent}`}>
            07 / CORE VALUE PROPOSITION
          </span>
          <h2 className={styles.h2}>
            PrivexLabs helps businesses answer five important questions.
          </h2>
          <div className={styles.list}>
            {QS.map(([t, tag], i) => (
              <button
                key={tag}
                type="button"
                onMouseEnter={() => pick(i)}
                onClick={() => pick(i)}
                onFocus={() => pick(i)}
                data-cursor="ASK"
                className={styles.item}
                data-active={i === q}
              >
                <span className={styles.k}>{pad2(i + 1)}</span>
                <span className={styles.text}>{t}</span>
                <span className={styles.tag}>{tag}</span>
              </button>
            ))}
          </div>
          <p className={styles.closing}>
            PrivexLabs combines strategy, engineering, AI, infrastructure, and
            education to answer these questions.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Questions

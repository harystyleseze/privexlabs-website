'use client'

import { QS } from '@/content/site'
import { usePick } from '@/lib/hooks/usePick'
import { pad2 } from '@/lib/math'

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
            07 / WHAT WE HELP YOU ANSWER
          </span>
          <h2 className={styles.h2}>
            Five questions growing businesses ask us.
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
            We bring software, automation, data, and practical AI together to
            answer them, and we measure whether the answer worked.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Questions

import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

import {
  LEGAL_EMAIL,
  LEGAL_PAGES,
  LEGAL_SLUGS,
  LEGAL_UPDATED,
  type LegalSlug,
} from '@/content/legal'

import styles from './LegalPage.module.css'

/** Turns the privacy email inside a paragraph into a mailto link. */
const withEmailLinks = (text: string): ReactNode => {
  const parts = text.split(LEGAL_EMAIL)
  if (parts.length === 1) return text
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
      )}
    </Fragment>
  ))
}

const LegalPage = ({ slug }: { slug: LegalSlug }) => {
  const doc = LEGAL_PAGES[slug]
  const others = LEGAL_SLUGS.filter((s) => s !== slug)
  return (
    <main data-sec={doc.eyebrow} className={styles.main}>
      <div className={styles.inner}>
        <aside className={styles.aside}>
          <span className={`px-label ${styles.accent}`}>{doc.eyebrow}</span>
          <span className="px-label">LAST UPDATED / {LEGAL_UPDATED}</span>
          <nav className={styles.others} aria-label="Other legal documents">
            <span className="px-label">ALSO READ</span>
            {others.map((s) => (
              <Link key={s} href={`/legal/${s}`} className={styles.otherLink}>
                {LEGAL_PAGES[s].short} →
              </Link>
            ))}
          </nav>
        </aside>
        <article className={styles.article}>
          <h1 className={styles.h1}>{doc.title}</h1>
          <p className={styles.intro}>{doc.intro}</p>
          {doc.sections.map((s, i) => (
            <section key={s.heading} className={styles.section}>
              <h2 className={styles.h2}>
                <span className={`px-label ${styles.num}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.heading}
              </h2>
              {s.body.map((item, j) =>
                typeof item === 'string' ? (
                  <p key={j} className={styles.p}>
                    {withEmailLinks(item)}
                  </p>
                ) : (
                  <ul key={j} className={styles.list}>
                    {item.map((li) => (
                      <li key={li} className={styles.li}>
                        <span className={styles.dot} />
                        {li}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}
          <p className={styles.foot}>
            <span className="px-label">QUESTIONS ABOUT THIS DOCUMENT</span>
            <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
          </p>
        </article>
      </div>
    </main>
  )
}

export default LegalPage

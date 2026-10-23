import Link from 'next/link'

import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <span className={`px-label ${styles.label}`}>404 / NOT FOUND</span>
        <h1 className={styles.h1}>This page doesn&apos;t exist.</h1>
        <Link href="/" className={styles.link}>
          Back to PrivexLabs →
        </Link>
      </section>
    </main>
  )
}

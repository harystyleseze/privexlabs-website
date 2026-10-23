'use client'

import Button from '@/components/ui/Button/Button'

import styles from './not-found.module.css'

export default function ErrorPage({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <span className={`px-label ${styles.label}`}>
          ERROR / SOMETHING BROKE
        </span>
        <h1 className={styles.h1}>Something went wrong.</h1>
        <div>
          <Button type="button" onClick={reset}>
            Try again
          </Button>
        </div>
      </section>
    </main>
  )
}

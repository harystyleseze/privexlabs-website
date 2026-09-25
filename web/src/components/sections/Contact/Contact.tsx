import { useState } from 'react'

import Button from 'src/components/ui/Button/Button'
import { COMPANY_SENTENCE } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'

import styles from './Contact.module.css'

// Client-only, as designed: sending flips the card to "SIGNAL RECEIVED" and counts one signal.
const Contact = () => {
  const { signal } = useSite()
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const send = () => {
    setSent(true)
    signal()
  }

  return (
    <section id="contact" data-sec="13 / CONTACT" className={styles.section}>
      <div className={styles.inner}>
        <span className={`px-label ${styles.accent}`}>13 / CONTACT</span>
        <h2 data-reveal="0" className={styles.h2}>
          Build intelligence
          <br />
          into your <span className={styles.primary}>business</span>
          <span className={styles.square} />
        </h2>
        <div className={styles.row}>
          <p className={styles.blurb}>{COMPANY_SENTENCE}</p>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className="px-label">NEW SIGNAL / PROBLEM STATEMENT</span>
              <span
                className={`px-label ${sent ? styles.statusSent : styles.statusReady}`}
              >
                {sent ? 'RECEIVED' : 'READY'}
              </span>
            </div>
            {!sent ? (
              <div className={styles.form}>
                <label className={styles.label}>
                  <span className={styles.labelText}>
                    What problem would you like to solve?
                  </span>
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={4}
                    placeholder="Describe the process, data, or workflow you have in mind."
                    className={styles.textarea}
                  />
                </label>
                <div className={styles.actions}>
                  <span className="px-label">PROBLEM → DATA → SYSTEM</span>
                  <Button onClick={send} size="lg" data-cursor="SEND">
                    Start a conversation
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.received}>
                <span className={styles.receivedLine}>
                  &gt; SIGNAL RECEIVED
                </span>
                <span className={styles.thanks}>
                  Thank you. We&apos;ll be in touch.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

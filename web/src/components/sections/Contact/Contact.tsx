import { useState, type FormEvent } from 'react'

import Button from 'src/components/ui/Button/Button'
import { COMPANY_SENTENCE, WHATSAPP } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { CONTACT_FORM_VIEW_URL, submitContactForm } from 'src/lib/contactForm'

import styles from './Contact.module.css'

type Status = 'ready' | 'sending' | 'sent' | 'failed'

const STATUS_LABEL: Record<Status, string> = {
  ready: 'READY',
  sending: 'SENDING',
  sent: 'RECEIVED',
  failed: 'NOT SENT',
}

// Submissions go straight to the PrivexLabs Google Form (see src/lib/contactForm).
// Sending flips the card to "SIGNAL RECEIVED" and counts one signal.
const Contact = () => {
  const { signal } = useSite()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState<Status>('ready')

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await submitContactForm({ email, problem: msg })
      setStatus('sent')
      signal()
    } catch {
      setStatus('failed')
    }
  }

  const sent = status === 'sent'

  return (
    <section id="contact" data-sec="13 / CONTACT" className={styles.section}>
      <div className={styles.inner}>
        <span className={`px-label ${styles.accent}`}>13 / CONTACT</span>
        <h2 data-reveal="0" className={styles.h2}>
          Make your business
          <br />
          easier to <span className={styles.primary}>run</span>
          <span className={styles.square} />
        </h2>
        <div className={styles.row}>
          <div className={styles.aside}>
            <p className={styles.blurb}>{COMPANY_SENTENCE}</p>
            <div className={styles.channels}>
              <span className={`px-label ${styles.accent}`}>
                PREFER TO TALK?
              </span>
              <a
                href={WHATSAPP.dm}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className={styles.channel}
              >
                Message PrivexLabs on WhatsApp
              </a>
              <a
                href={`tel:${WHATSAPP.phoneE164}`}
                data-cursor="CALL"
                className={styles.channel}
              >
                {WHATSAPP.phoneDisplay}
              </a>
              <a
                href={WHATSAPP.group}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className={styles.channel}
              >
                Join the PrivexLabs WhatsApp community
              </a>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className="px-label">
                NEW SIGNAL / WHAT&apos;S SLOWING YOU DOWN
              </span>
              <span
                className={`px-label ${sent ? styles.statusSent : styles.statusReady}`}
              >
                {STATUS_LABEL[status]}
              </span>
            </div>
            {!sent ? (
              <form className={styles.form} onSubmit={send}>
                <label className={styles.label}>
                  <span className={styles.labelText}>
                    Where should we reply?
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourcompany.com"
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  <span className={styles.labelText}>
                    What&apos;s slowing your business down?
                  </span>
                  <textarea
                    name="problem"
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={4}
                    placeholder="The process, spreadsheet, or workflow that costs you the most time. A few sentences is plenty."
                    className={styles.textarea}
                  />
                </label>
                {status === 'failed' && (
                  <p className={styles.error}>
                    Couldn&apos;t reach the form. Open it directly:{' '}
                    <a
                      href={CONTACT_FORM_VIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.errorLink}
                    >
                      the PrivexLabs contact form
                    </a>
                    , or message us on WhatsApp.
                  </p>
                )}
                <div className={styles.actions}>
                  <span className="px-label">PROBLEM → PLAN → SYSTEM</span>
                  <Button
                    type="submit"
                    size="lg"
                    data-cursor="SEND"
                    disabled={status === 'sending'}
                  >
                    Start a conversation
                  </Button>
                </div>
              </form>
            ) : (
              <div className={styles.received}>
                <span className={styles.receivedLine}>
                  &gt; SIGNAL RECEIVED
                </span>
                <span className={styles.thanks}>
                  Thank you. We&apos;ll reply to the address you gave us.
                </span>
                <a
                  href={WHATSAPP.dm}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className={styles.channel}
                >
                  In a hurry? Message us on WhatsApp.
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

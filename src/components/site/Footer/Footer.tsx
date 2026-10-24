import Link from 'next/link'

import Wordmark from '@/components/ui/Wordmark/Wordmark'
import { LEGAL_EMAIL } from '@/content/legal'
import { LEGAL_LINKS, NAV, WHATSAPP } from '@/content/site'

import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.row}>
        <Wordmark mark size={16} />
        <nav className={styles.nav} aria-label="Site">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className={styles.link}>
              {label}
            </a>
          ))}
          <a
            href={WHATSAPP.dm}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="OPEN"
            className={styles.link}
          >
            WHATSAPP
          </a>
          <a
            href={`tel:${WHATSAPP.phoneE164}`}
            data-cursor="CALL"
            className={styles.link}
          >
            {WHATSAPP.phoneDisplay}
          </a>
        </nav>
      </div>
      <div className={styles.row}>
        <nav className={styles.nav} aria-label="Legal">
          {LEGAL_LINKS.map(([label, href]) => (
            <Link key={href} href={href} className={styles.link}>
              {label.toUpperCase()}
            </Link>
          ))}
          <a href={`mailto:${LEGAL_EMAIL}`} className={styles.link}>
            {LEGAL_EMAIL.toUpperCase()}
          </a>
        </nav>
        <span className="px-label">
          LESS MANUAL WORK. MORE CONTROL. — © 2026 PRIVEXLABS
        </span>
      </div>
    </div>
  </footer>
)

export default Footer

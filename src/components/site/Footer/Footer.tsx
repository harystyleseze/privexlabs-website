import Wordmark from '@/components/ui/Wordmark/Wordmark'
import { NAV, WHATSAPP } from '@/content/site'

import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <Wordmark mark size={16} />
      <nav className={styles.nav}>
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
      <span className="px-label">
        LESS MANUAL WORK. MORE CONTROL. — © 2026 PRIVEXLABS
      </span>
    </div>
  </footer>
)

export default Footer

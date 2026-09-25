import Wordmark from 'src/components/ui/Wordmark/Wordmark'
import { NAV } from 'src/content/site'

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
      </nav>
      <span className="px-label">
        YOUR DATA. YOUR AI. YOUR INFRASTRUCTURE. — © 2026 PRIVEXLABS
      </span>
    </div>
  </footer>
)

export default Footer

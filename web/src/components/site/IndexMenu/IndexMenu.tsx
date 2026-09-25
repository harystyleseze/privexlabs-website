import { COMPANY_SENTENCE, MENU } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { pad4 } from 'src/lib/math'

import styles from './IndexMenu.module.css'

const IndexMenu = () => {
  const { theme, viewport, sec, signals, setMenu } = useSite()
  return (
    <div className={styles.overlay}>
      <nav className={styles.nav}>
        <div className={`px-label ${styles.heading}`}>INDEX / 13 NODES</div>
        {MENU.map(([k, label, href]) => (
          <a
            key={k}
            href={href}
            onClick={() => setMenu(false)}
            data-cursor="OPEN"
            className={styles.item}
          >
            <span className={`px-label ${styles.k}`}>{k}</span>
            <span className={styles.label}>{label}</span>
          </a>
        ))}
      </nav>
      <aside className={styles.aside}>
        <div className={`px-label ${styles.heading}`}>SYSTEM STATUS</div>
        <div className={styles.row}>
          <span className={styles.muted}>SYSTEM</span>
          <span className={styles.primary}>ONLINE</span>
        </div>
        <div className={styles.row}>
          <span className={styles.muted}>THEME</span>
          <span>{theme.toUpperCase()}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.muted}>VIEWPORT</span>
          <span>
            {viewport.vw} × {viewport.vh}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.muted}>CURRENT NODE</span>
          <span>{sec}</span>
        </div>
        <div className={`${styles.row} ${styles.rowLast}`}>
          <span className={styles.muted}>SIGNALS FROM YOU</span>
          <span className={styles.accent}>{pad4(signals)}</span>
        </div>
        <p className={styles.blurb}>{COMPANY_SENTENCE}</p>
      </aside>
    </div>
  )
}

export default IndexMenu

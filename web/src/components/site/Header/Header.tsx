import { useEffect, useState } from 'react'

import Wordmark from 'src/components/ui/Wordmark/Wordmark'
import { NAV } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'

import styles from './Header.module.css'

const Header = () => {
  const { theme, toggleTheme, viewport, sec, menu, setMenu } = useSite()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = theme === 'dark'
  const menuLabel = menu ? 'CLOSE' : viewport.mobile ? 'MENU' : 'INDEX'

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled || menu}
      data-compact={scrolled}
    >
      <a
        href="#top"
        data-cursor="TOP"
        aria-label="PrivexLabs home"
        className={styles.logo}
      >
        <Wordmark mark size={16} />
      </a>
      {viewport.wide && (
        <nav className={styles.nav}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className={styles.navLink}>
              [{label}]
            </a>
          ))}
        </nav>
      )}
      <div className={styles.right}>
        <div className={styles.status}>
          <span data-pulse="1" className={styles.dot} />
          {!viewport.mobile && (
            <>
              <span
                className={`px-label ${styles.statusText}`}
                style={{ display: viewport.showStatus ? 'inline' : 'none' }}
              >
                SYSTEM / ONLINE
              </span>
              <span className={`px-label ${styles.sec}`}>{sec}</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          data-cursor={dark ? 'LIGHT' : 'DARK'}
          aria-label="Toggle light and dark mode"
          className={styles.theme}
        >
          <span className={styles.themeSeg} data-on={!dark}>
            LIGHT
          </span>
          <span className={styles.themeSeg} data-on={dark}>
            DARK
          </span>
        </button>
        <button
          type="button"
          onClick={() => setMenu(!menu)}
          data-cursor={menuLabel}
          aria-label="Open index"
          className={styles.menu}
          data-open={menu}
        >
          <span className={styles.grid}>
            <span />
            <span />
            <span />
            <span />
          </span>
          {menuLabel}
        </button>
      </div>
    </header>
  )
}

export default Header

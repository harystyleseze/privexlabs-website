'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import Cursor from '@/components/site/Cursor/Cursor'
import Footer from '@/components/site/Footer/Footer'
import Header from '@/components/site/Header/Header'
import IndexMenu from '@/components/site/IndexMenu/IndexMenu'
import { experience, THEME_STORAGE_KEY, type Theme } from '@/content/experience'
import { createFlowPulse } from '@/lib/flowPulse'
import { useReveal } from '@/lib/hooks/useReveal'
import { useSectionTracker } from '@/lib/hooks/useSectionTracker'
import { subscribe } from '@/lib/ticker'
import { useViewport } from '@/lib/hooks/useViewport'

import { SiteContext, type SiteState } from './SiteContext'
import styles from './SiteLayout.module.css'

// The theme lives on <html data-theme>: /theme-init.js stamps the stored value there
// before hydration, and the toggle writes there. Reading it as an external store keeps
// the server render ('dark') and the first client render identical.
const DEFAULT_THEME: Theme =
  experience.defaultTheme === 'light' ? 'light' : 'dark'

const readTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark'

const subscribeTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

const noopSubscribe = () => () => {}

const query = (q: string) =>
  typeof matchMedia !== 'undefined' && matchMedia(q).matches

interface SiteLayoutProps {
  children?: ReactNode
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    () => DEFAULT_THEME
  )
  const [sec, setSec] = useState('00 / INDEX')
  const [signals, setSignals] = useState(0)
  const [menu, setMenu] = useState(false)
  /** false during server render and hydration, true once the page is live on the client. */
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )
  const viewport = useViewport()
  const rootRef = useRef<HTMLDivElement>(null)

  const fine = useMemo(() => query('(pointer: fine)'), [])
  const motion = useMemo(
    () => experience.motion && !query('(prefers-reduced-motion: reduce)'),
    []
  )

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const signal = useCallback(() => setSignals((s) => s + 1), [])

  useSectionTracker(setSec, viewport.mobile)
  useReveal(motion, viewport.mobile)

  // The flow-pulse animation reads the DOM, so it lives entirely in an effect.
  useEffect(() => {
    const root = rootRef.current
    if (!ready || !motion || !root) return
    const flowPulse = createFlowPulse(root)
    const unsubscribe = subscribe((t) => flowPulse.frame(t))
    return () => {
      unsubscribe()
      flowPulse.dispose()
    }
  }, [ready, motion])

  const value: SiteState = useMemo(
    () => ({
      theme,
      toggleTheme,
      viewport,
      sec,
      signals,
      signal,
      motion,
      fine,
      ready,
      menu,
      setMenu,
    }),
    [
      theme,
      toggleTheme,
      viewport,
      sec,
      signals,
      signal,
      motion,
      fine,
      ready,
      menu,
    ]
  )

  return (
    <SiteContext.Provider value={value}>
      <div ref={rootRef} className={styles.root}>
        <Header />
        {menu && <IndexMenu />}
        {children}
        <Footer />
        <Cursor />
      </div>
    </SiteContext.Provider>
  )
}

export default SiteLayout

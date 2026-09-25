import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import Cursor from 'src/components/site/Cursor/Cursor'
import Footer from 'src/components/site/Footer/Footer'
import Header from 'src/components/site/Header/Header'
import IndexMenu from 'src/components/site/IndexMenu/IndexMenu'
import {
  experience,
  THEME_STORAGE_KEY,
  type Theme,
} from 'src/content/experience'
import { createFlowPulse } from 'src/lib/flowPulse'
import { useReveal } from 'src/lib/hooks/useReveal'
import { useSectionTracker } from 'src/lib/hooks/useSectionTracker'
import { useTicker } from 'src/lib/hooks/useTicker'
import { useViewport } from 'src/lib/hooks/useViewport'

import { SiteContext, type SiteState } from './SiteContext'
import styles from './SiteLayout.module.css'

const readStoredTheme = (): Theme | null => {
  try {
    const th = localStorage.getItem(THEME_STORAGE_KEY)
    return th === 'dark' || th === 'light' ? th : null
  } catch {
    return null
  }
}

const initialTheme = (): Theme => {
  const stored = readStoredTheme()
  if (stored) return stored
  const pref = experience.defaultTheme
  if (pref === 'system') {
    return typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  }
  return pref
}

const query = (q: string) =>
  typeof matchMedia !== 'undefined' && matchMedia(q).matches

interface SiteLayoutProps {
  children?: ReactNode
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [sec, setSec] = useState('00 / INDEX')
  const [signals, setSignals] = useState(0)
  const [menu, setMenu] = useState(false)
  const [ready, setReady] = useState(false)
  const viewport = useViewport()
  const rootRef = useRef<HTMLDivElement>(null)

  const fine = useMemo(() => query('(pointer: fine)'), [])
  const motion = useMemo(
    () => experience.motion && !query('(prefers-reduced-motion: reduce)'),
    []
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    setReady(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        /* storage unavailable */
      }
      return next
    })
  }, [])

  const signal = useCallback(() => setSignals((s) => s + 1), [])

  useSectionTracker(setSec, viewport.mobile)
  useReveal(motion, viewport.mobile)

  const flowPulse = useMemo(
    () => (ready && rootRef.current ? createFlowPulse(rootRef.current) : null),
    [ready]
  )
  useEffect(() => () => flowPulse?.dispose(), [flowPulse])
  useTicker((t) => flowPulse?.frame(t), motion && !!flowPulse)

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

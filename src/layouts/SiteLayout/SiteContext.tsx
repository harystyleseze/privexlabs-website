import { createContext, useContext } from 'react'

import type { Theme } from '@/content/experience'
import type { Viewport } from '@/lib/hooks/useViewport'

export interface SiteState {
  theme: Theme
  toggleTheme: () => void
  viewport: Viewport
  /** current `data-sec` label, e.g. "00 / INDEX" */
  sec: string
  /** count of state-changing interactions this session */
  signals: number
  signal: () => void
  /** design `motion` prop && !prefers-reduced-motion */
  motion: boolean
  /** pointer: fine */
  fine: boolean
  /** true after first mount (cursor and canvases wait for it) */
  ready: boolean
  menu: boolean
  setMenu: (open: boolean) => void
}

export const SiteContext = createContext<SiteState | null>(null)

export const useSite = (): SiteState => {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside SiteLayout')
  return ctx
}

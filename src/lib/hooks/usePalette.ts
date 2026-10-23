import { useEffect, useRef, type RefObject } from 'react'

import { useSite } from '@/layouts/SiteLayout/SiteContext'
import { readPalette, type Palette } from '@/lib/colors'

/**
 * Canvas palette read from computed tokens, re-read one frame after a theme change and on resize
 * (design applyTheme → readColors). Reads from `elRef` when given (dark sections), else <html>.
 */
export const usePalette = (
  elRef?: RefObject<HTMLElement | null>
): RefObject<Palette | null> => {
  const { theme, viewport } = useSite()
  const ref = useRef<Palette | null>(null)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ref.current = readPalette(elRef?.current ?? document.documentElement)
    })
    return () => cancelAnimationFrame(raf)
  }, [theme, viewport.vw, viewport.vh, elRef])
  return ref
}

import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react'

import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { readPalette, type Palette } from 'src/lib/colors'

/**
 * Canvas palette read from computed tokens, re-read one frame after a theme change and on resize
 * (design applyTheme → readColors). Reads from `elRef` when given (dark sections), else <html>.
 */
export const usePalette = (
  elRef?: RefObject<HTMLElement>
): MutableRefObject<Palette | null> => {
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

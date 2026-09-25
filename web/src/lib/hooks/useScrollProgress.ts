import { useEffect, type RefObject } from 'react'

import { clamp } from 'src/lib/math'

/**
 * Calls `onProgress(p)` on every scroll with p = clamp(-top / (height - vh)) for a tall
 * section whose inner content is sticky (design: Signal, Approach, Direction).
 * Also invoked once on mount and on resize.
 */
export const useScrollProgress = (
  ref: RefObject<HTMLElement>,
  onProgress: (p: number, rect: DOMRect, vh: number) => void
) => {
  useEffect(() => {
    const run = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      onProgress(clamp(-r.top / (r.height - vh)), r, vh)
    }
    run()
    window.addEventListener('scroll', run, { passive: true })
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('scroll', run)
      window.removeEventListener('resize', run)
    }
  }, [ref, onProgress])
}

import { useEffect, useRef } from 'react'

import { useObserveElements } from './useObserveElements'

/**
 * Tracks which `[data-sec]` section is in the middle band of the viewport
 * (design: IntersectionObserver with rootMargin '-45% 0px -54% 0px').
 * Re-observes when `key` changes (the design re-runs setupObservers when `mobile` flips).
 */
export const useSectionTracker = (
  onSec: (sec: string) => void,
  key: unknown
) => {
  const io = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const s = e.target.getAttribute('data-sec')
            if (s) onSec(s)
          }
        }),
      { rootMargin: '-45% 0px -54% 0px' }
    )
    io.current = obs
    return () => {
      obs.disconnect()
      io.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  useObserveElements('[data-sec]', (el) => io.current?.observe(el), key)
}

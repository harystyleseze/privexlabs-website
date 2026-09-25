import { useEffect, useRef } from 'react'

import { useObserveElements } from './useObserveElements'

/**
 * `[data-reveal="<delay ms>"]` elements fade in and rise 18px when they enter the viewport
 * (design: rootMargin '0px 0px -6% 0px', 900ms cubic-bezier(.2,0,0,1), staggered by the attribute).
 * Does nothing when `motion` is false: elements simply render visible.
 */
export const useReveal = (motion: boolean, key: unknown) => {
  const io = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    if (!motion) return
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'none'
            obs.unobserve(el)
          }
        }),
      { rootMargin: '0px 0px -6% 0px' }
    )
    io.current = obs
    return () => {
      obs.disconnect()
      io.current = null
    }
  }, [motion, key])
  useObserveElements(
    '[data-reveal]:not([data-rv])',
    (el) => {
      el.setAttribute('data-rv', '1')
      const d = +(el.getAttribute('data-reveal') || 0)
      el.style.opacity = '0'
      el.style.transform = 'translateY(18px)'
      el.style.transition = `opacity 900ms cubic-bezier(.2,0,0,1) ${d}ms, transform 900ms cubic-bezier(.2,0,0,1) ${d}ms`
      io.current?.observe(el)
    },
    key,
    motion
  )
}

import { useEffect } from 'react'

const REVEALED = 'done'

/**
 * `[data-reveal="<delay ms>"]` elements fade in and rise 18px when they enter the viewport
 * (design: rootMargin '0px 0px -6% 0px', 900ms cubic-bezier(.2,0,0,1), staggered by the attribute).
 * Does nothing when `motion` is false: elements simply render visible.
 *
 * One effect owns both the IntersectionObserver and the element scan, so whenever it
 * re-runs (Strict Mode, or `key` changing when the viewport flips to mobile after
 * hydration) every element that has not yet been revealed is observed again. Elements
 * are never left hidden with nobody watching them.
 */
export const useReveal = (motion: boolean, key: unknown) => {
  useEffect(() => {
    if (!motion) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'none'
          el.setAttribute('data-rv', REVEALED)
          io.unobserve(el)
        }),
      { rootMargin: '0px 0px -6% 0px' }
    )
    const prime = (el: HTMLElement) => {
      if (el.getAttribute('data-rv') === REVEALED) return
      if (!el.hasAttribute('data-rv')) {
        el.setAttribute('data-rv', '1')
        const d = +(el.getAttribute('data-reveal') || 0)
        el.style.opacity = '0'
        el.style.transform = 'translateY(18px)'
        el.style.transition = `opacity 900ms cubic-bezier(.2,0,0,1) ${d}ms, transform 900ms cubic-bezier(.2,0,0,1) ${d}ms`
      }
      io.observe(el)
    }
    const scan = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(prime)
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [motion, key])
}

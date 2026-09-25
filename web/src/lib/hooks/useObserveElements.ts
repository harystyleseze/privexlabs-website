import { useEffect } from 'react'

/**
 * Calls `attach(el)` once for every element matching `selector` under document.body,
 * now and whenever new ones appear (Redwood lazy-loads pages after the layout mounts).
 * Returns nothing; the disposer runs on unmount or when `key` changes.
 */
export const useObserveElements = (
  selector: string,
  attach: (el: HTMLElement) => void,
  key: unknown,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) return
    const seen = new WeakSet<Element>()
    const scan = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        attach(el)
      })
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => mo.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, key, enabled])
}

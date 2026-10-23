import { useLayoutEffect, useState } from 'react'

export interface Viewport {
  vw: number
  vh: number
  /** design: vw < 760 */
  mobile: boolean
  /** design: vw >= 1180 — header nav links visible */
  wide: boolean
  /** design: vw >= 1380 — "SYSTEM / ONLINE" visible */
  showStatus: boolean
}

const from = (vw: number, vh: number): Viewport => ({
  vw,
  vh,
  mobile: vw < 760,
  wide: vw >= 1180,
  showStatus: vw >= 1380,
})

/** Server render and first client render both use this; the real size arrives in the mount effect. */
const SSR_VIEWPORT = from(1440, 900)

const read = (): Viewport => from(window.innerWidth, window.innerHeight)

export const useViewport = (): Viewport => {
  const [vp, setVp] = useState<Viewport>(SSR_VIEWPORT)
  // Layout effect: the real size is applied before the first paint after hydration,
  // so a phone never flashes the desktop layout.
  useLayoutEffect(() => {
    const onResize = () => setVp(read())
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return vp
}

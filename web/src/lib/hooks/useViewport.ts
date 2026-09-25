import { useEffect, useState } from 'react'

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

const read = (): Viewport => {
  const vw = typeof window === 'undefined' ? 1440 : window.innerWidth
  const vh = typeof window === 'undefined' ? 900 : window.innerHeight
  return { vw, vh, mobile: vw < 760, wide: vw >= 1180, showStatus: vw >= 1380 }
}

export const useViewport = (): Viewport => {
  const [vp, setVp] = useState<Viewport>(read)
  useEffect(() => {
    const onResize = () => setVp(read())
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return vp
}

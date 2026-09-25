import { useCallback, type RefObject } from 'react'

/** Sizes a canvas backing store to its CSS box at min(2, devicePixelRatio). Returns the dpr used. */
export const resizeCanvas = (c: HTMLCanvasElement): number => {
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const b = c.getBoundingClientRect()
  c.width = Math.max(1, Math.round(b.width * dpr))
  c.height = Math.max(1, Math.round(b.height * dpr))
  c.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
  return dpr
}

export const useCanvasSize = (ref: RefObject<HTMLCanvasElement>) =>
  useCallback(() => {
    const c = ref.current
    return c ? resizeCanvas(c) : 1
  }, [ref])

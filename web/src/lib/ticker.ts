/**
 * The single shared requestAnimationFrame loop (the design's `tick`).
 * Every canvas, the flow/pulse updater and the cursor subscribe here so
 * they all read one clock and stay in phase.
 */
export type FrameFn = (t: number) => void

const subs = new Set<FrameFn>()
let raf = 0

const loop = (t: number) => {
  raf = requestAnimationFrame(loop)
  subs.forEach((fn) => fn(t))
}

export const subscribe = (fn: FrameFn): (() => void) => {
  subs.add(fn)
  if (subs.size === 1) raf = requestAnimationFrame(loop)
  return () => {
    subs.delete(fn)
    if (subs.size === 0) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }
}

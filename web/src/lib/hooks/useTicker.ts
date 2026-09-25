import { useEffect, useRef } from 'react'

import { subscribe, type FrameFn } from 'src/lib/ticker'

/** Subscribe a frame callback to the shared rAF loop. The latest callback is always used. */
export const useTicker = (fn: FrameFn, active = true) => {
  const ref = useRef<FrameFn>(fn)
  ref.current = fn
  useEffect(() => {
    if (!active) return
    return subscribe((t) => ref.current(t))
  }, [active])
}

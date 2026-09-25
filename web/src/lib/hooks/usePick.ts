import { useCallback, useRef, useState } from 'react'

import { useSite } from 'src/layouts/SiteLayout/SiteContext'

/** The design's `pick(key, val)`: change a selection and count one signal, only when the value changes. */
export const usePick = <T>(initial: T): [T, (v: T) => void] => {
  const { signal } = useSite()
  const [value, setValue] = useState<T>(initial)
  const current = useRef<T>(initial)
  const pick = useCallback(
    (v: T) => {
      if (Object.is(current.current, v)) return
      current.current = v
      setValue(v)
      signal()
    },
    [signal]
  )
  return [value, pick]
}

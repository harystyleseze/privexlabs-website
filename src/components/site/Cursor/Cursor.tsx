'use client'

import { useEffect, useRef } from 'react'

import { experience } from '@/content/experience'
import { useSite } from '@/layouts/SiteLayout/SiteContext'
import { useTicker } from '@/lib/hooks/useTicker'

import styles from './Cursor.module.css'

/** The design's custom cursor: a 10px square that lerps toward the pointer with a label from `data-cursor`. */
const Cursor = () => {
  const { fine, ready } = useSite()
  const show = experience.customCursor && fine && ready
  const cur = useRef<HTMLDivElement>(null)
  const sq = useRef<HTMLSpanElement>(null)
  const lbl = useRef<HTMLSpanElement>(null)
  const pos = useRef({
    mx: -9999,
    my: -9999,
    cx: null as number | null,
    cy: 0,
    label: '',
  })

  useEffect(() => {
    if (!show) return
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      const el = target?.closest
        ? target.closest('[data-cursor],a,button,textarea')
        : null
      let l = ''
      if (el)
        l =
          el.getAttribute('data-cursor') ||
          (el.tagName === 'TEXTAREA' ? '' : 'VIEW')
      if (l === pos.current.label) return
      pos.current.label = l
      const b = lbl.current
      if (b) {
        b.textContent = l
        b.style.opacity = l ? '1' : '0'
        b.style.transform = l ? 'translate(14px,12px)' : 'translate(8px,6px)'
      }
      const s = sq.current
      if (s) {
        s.style.background = l ? 'var(--color-brand-accent)' : 'transparent'
        s.style.borderColor = l
          ? 'var(--color-brand-accent)'
          : 'var(--color-brand-primary)'
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [show])

  useTicker(() => {
    const c = cur.current
    if (!c) return
    const p = pos.current
    if (p.cx == null) {
      p.cx = p.mx
      p.cy = p.my
    }
    p.cx += (p.mx - p.cx) * 0.3
    p.cy += (p.my - p.cy) * 0.3
    c.style.transform = `translate3d(${p.cx.toFixed(1)}px,${p.cy.toFixed(1)}px,0)`
  }, show)

  if (!show) return null
  return (
    <div ref={cur} aria-hidden="true" className={styles.cursor}>
      <span ref={sq} className={styles.square} />
      <span ref={lbl} className={styles.label} />
    </div>
  )
}

export default Cursor

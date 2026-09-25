import type { Palette } from 'src/lib/colors'
import { hash } from 'src/lib/math'

/**
 * Hero grid: a lattice of points repelled by the pointer, a masked "circuit" of brass
 * segments, and random walkers tracing paths (design buildHero / drawHero).
 */
interface Walker {
  i: number
  j: number
  d: number
  tr: [number, number][]
}

export interface HeroState {
  S: number
  cols: number
  rows: number
  ox: number
  oy: number
  hp: Float32Array
  mask: Uint8Array
  walkers: Walker[]
  /** smoothed pointer target */
  hx: number
  hy: number
  walkT: number
  /** smoothed font-stretch per headline line */
  hw: number[]
  coordT: string
  sigT: string
}

export interface HeroInputs {
  mx: number
  my: number
  lastMove: number
  fine: boolean
  motion: boolean
  C: Palette
  coordEl: HTMLElement | null
  sigEl: HTMLElement | null
  lines: (HTMLElement | null)[]
}

export const createHeroState = (): HeroState => ({
  S: 26,
  cols: 0,
  rows: 0,
  ox: 0,
  oy: 0,
  hp: new Float32Array(0),
  mask: new Uint8Array(0),
  walkers: [],
  hx: (typeof window === 'undefined' ? 1440 : window.innerWidth) * 0.6,
  hy: (typeof window === 'undefined' ? 900 : window.innerHeight) * 0.5,
  walkT: 0,
  hw: [100, 100, 100],
  coordT: '',
  sigT: '',
})

export const buildHero = (c: HTMLCanvasElement, st: HeroState) => {
  const W = c.clientWidth
  const H = c.clientHeight
  const mob = window.innerWidth < 760
  const S = mob ? 22 : 26
  st.S = S
  st.cols = Math.ceil(W / S) + 1
  st.rows = Math.ceil(H / S) + 1
  st.ox = (W - (st.cols - 1) * S) / 2
  st.oy = (H - (st.rows - 1) * S) / 2
  const n = st.cols * st.rows
  st.hp = new Float32Array(n * 3)
  st.mask = new Uint8Array(n)
  const rects: [number, number, number, number][] = mob
    ? [
        [0.1, 0.14, 0.9, 0.22],
        [0.1, 0.3, 0.9, 0.38],
        [0.1, 0.46, 0.9, 0.54],
      ]
    : [
        [0.56, 0.18, 0.88, 0.28],
        [0.56, 0.38, 0.88, 0.48],
        [0.56, 0.58, 0.88, 0.68],
      ]
  const segs: [number, number, number, number][] = []
  rects.forEach(([a, b, c2, d]) => {
    segs.push([a, b, c2, b], [c2, b, c2, d], [a, d, c2, d], [a, b, a, d])
  })
  if (mob)
    segs.push(
      [0.3, 0.22, 0.3, 0.3],
      [0.7, 0.38, 0.7, 0.46],
      [0.5, 0.54, 0.5, 0.62]
    )
  else
    segs.push(
      [0.64, 0.28, 0.64, 0.38],
      [0.8, 0.48, 0.8, 0.58],
      [0.72, 0.68, 0.72, 0.8],
      [0.69, 0.8, 0.75, 0.8],
      [0.69, 0.8, 0.69, 0.84],
      [0.75, 0.8, 0.75, 0.84],
      [0.69, 0.84, 0.75, 0.84]
    )
  const C1 = st.cols - 1
  const R1 = st.rows - 1
  segs.forEach(([x1, y1, x2, y2]) => {
    if (y1 === y2) {
      const j = Math.round(y1 * R1)
      for (let i = Math.round(x1 * C1); i <= Math.round(x2 * C1); i++)
        st.mask[j * st.cols + i] = 1
    } else {
      const i = Math.round(x1 * C1)
      for (let j = Math.round(y1 * R1); j <= Math.round(y2 * R1); j++)
        st.mask[j * st.cols + i] = 1
    }
  })
  st.walkers = Array.from({ length: mob ? 6 : 11 }, (_, k) => ({
    i: Math.floor(hash(k + 1) * st.cols),
    j: Math.floor(hash(k + 50) * st.rows),
    d: k % 4,
    tr: [],
  }))
}

const pad = (v: number) => String(Math.max(0, Math.round(v))).padStart(4, '0')

const setText = (el: HTMLElement, text: string) => {
  const node = el.firstChild
  if (node && node.nodeType === Node.TEXT_NODE) (node as Text).data = text
  else el.textContent = text
}

/**
 * @param t  motion time (0 when motion is off — freezes the grid wiggle)
 * @param rt real frame time (drives idle drift, walker cadence, and pointer effects regardless of motion)
 */
export const drawHero = (
  cv: HTMLCanvasElement,
  st: HeroState,
  t: number,
  rt: number,
  inp: HeroInputs
) => {
  if (!st.hp.length) return
  const r = cv.getBoundingClientRect()
  if (r.bottom < 0) return
  const ctx = cv.getContext('2d')
  if (!ctx) return
  const W = r.width
  const H = r.height
  const C = inp.C
  ctx.clearRect(0, 0, W, H)
  const idle = !inp.fine || performance.now() - inp.lastMove > 2600
  let tx: number
  let ty: number
  if (idle) {
    const q = rt || 0
    tx = W * (0.62 + 0.22 * Math.sin(q * 0.00021))
    ty = H * (0.5 + 0.26 * Math.sin(q * 0.00033 + 1.3))
  } else {
    tx = inp.mx - r.left
    ty = inp.my - r.top
  }
  st.hx += (tx - st.hx) * 0.1
  st.hy += (ty - st.hy) * 0.1
  const mx = st.hx
  const my = st.hy
  const R = Math.max(150, Math.min(W, H) * 0.3)
  const { S, cols, rows, hp: P, mask: M } = st
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const id = j * cols + i
      let x = i * S + st.ox + Math.sin(i * 1.7 + j * 2.3 + t * 0.0005) * 1.1
      let y = j * S + st.oy
      const dx = x - mx
      const dy = y - my
      const d = Math.sqrt(dx * dx + dy * dy) + 0.001
      let f = 1 - d / R
      f = f > 0 ? f : 0
      const f2 = f * f
      x += (dx / d) * f2 * 14
      y += (dy / d) * f2 * 14
      P[id * 3] = x
      P[id * 3 + 1] = y
      P[id * 3 + 2] = f
      let s: number
      if (M[id] && f > 0.06) {
        ctx.fillStyle = C.a
        ctx.globalAlpha = Math.min(1, f * 1.8)
        s = 2 + f2 * 2.6
      } else if (f > 0) {
        ctx.fillStyle = C.p
        ctx.globalAlpha = 0.25 + f * 0.75
        s = 1.4 + f2 * 2.4
      } else {
        ctx.fillStyle = C.m
        ctx.globalAlpha = 0.3
        s = 1.2
      }
      ctx.fillRect(x - s / 2, y - s / 2, s, s)
    }
  ctx.lineWidth = 1
  const i0 = Math.max(0, Math.floor((mx - R - st.ox) / S))
  const i1 = Math.min(cols - 1, Math.ceil((mx + R - st.ox) / S))
  const j0 = Math.max(0, Math.floor((my - R - st.oy) / S))
  const j1 = Math.min(rows - 1, Math.ceil((my + R - st.oy) / S))
  for (let j = j0; j <= j1; j++)
    for (let i = i0; i <= i1; i++) {
      const id = j * cols + i
      const f = P[id * 3 + 2]
      if (f <= 0) continue
      const nb: [number, number][] = [
        [i + 1, j],
        [i, j + 1],
      ]
      for (const [a, b] of nb) {
        if (a >= cols || b >= rows) continue
        const n = b * cols + a
        const fn = P[n * 3 + 2]
        const both = M[id] && M[n]
        if (both && f > 0.04 && fn > 0.04) {
          ctx.strokeStyle = C.a
          ctx.globalAlpha = Math.min(f, fn) * 1.4
        } else if (f > 0.42 && fn > 0.42 && (i * 7 + j * 3) % 5 < 3) {
          ctx.strokeStyle = C.p
          ctx.globalAlpha = Math.min(f, fn) * 0.7
        } else continue
        ctx.beginPath()
        ctx.moveTo(P[id * 3], P[id * 3 + 1])
        ctx.lineTo(P[n * 3], P[n * 3 + 1])
        ctx.stroke()
      }
    }
  if (inp.motion && rt - st.walkT > 95) {
    st.walkT = rt
    const D: [number, number][] = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]
    st.walkers.forEach((w) => {
      w.tr.push([w.i, w.j])
      if (w.tr.length > 18) w.tr.shift()
      if (Math.random() < 0.2) w.d = (w.d + (Math.random() < 0.5 ? 1 : 3)) % 4
      let ni = w.i + D[w.d][0]
      let nj = w.j + D[w.d][1]
      if (ni < 0 || nj < 0 || ni >= cols || nj >= rows) {
        w.d = (w.d + 2) % 4
        ni = w.i + D[w.d][0]
        nj = w.j + D[w.d][1]
      }
      w.i = ni
      w.j = nj
    })
  }
  ctx.lineWidth = 1.25
  st.walkers.forEach((w) => {
    const pts = w.tr.concat([[w.i, w.j]])
    for (let k = 1; k < pts.length; k++) {
      const a = (pts[k - 1][1] * cols + pts[k - 1][0]) * 3
      const b = (pts[k][1] * cols + pts[k][0]) * 3
      ctx.strokeStyle = C.p
      ctx.globalAlpha = (k / pts.length) * 0.55
      ctx.beginPath()
      ctx.moveTo(P[a], P[a + 1])
      ctx.lineTo(P[b], P[b + 1])
      ctx.stroke()
    }
    const h = (w.j * cols + w.i) * 3
    ctx.globalAlpha = 1
    ctx.fillStyle = C.a
    ctx.fillRect(P[h] - 2, P[h + 1] - 2, 4, 4)
  })
  ctx.globalAlpha = 1

  // Write into the existing text node: replacing children would be a childList mutation
  // every frame and would invalidate the page's MutationObserver-backed caches.
  const ct = `X ${pad(mx)} · Y ${pad(my)}`
  if (inp.coordEl && st.coordT !== ct) {
    st.coordT = ct
    setText(inp.coordEl, ct)
  }
  const sg = idle ? 'LISTENING' : 'SIGNAL DETECTED'
  if (inp.sigEl && st.sigT !== sg) {
    st.sigT = sg
    setText(inp.sigEl, sg)
  }
  inp.lines.forEach((el, k) => {
    if (!el) return
    let target = 100
    if (!idle) {
      const b = el.getBoundingClientRect()
      const dy = Math.abs(inp.my - (b.top + b.height / 2))
      target = 100 + 18 * Math.max(0, 1 - dy / (window.innerHeight * 0.3))
    }
    st.hw[k] += (target - st.hw[k]) * 0.08
    el.style.fontStretch = st.hw[k].toFixed(1) + '%'
  })
}

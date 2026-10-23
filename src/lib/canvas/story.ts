import type { Palette } from '@/lib/colors'
import { clamp, ease, hash, polyAt, type Point } from '@/lib/math'

/**
 * Signal story: N particles morphing through five formations —
 * chaos → clusters → hub network → layered system → bar chart (design buildStory / drawStory).
 */
export interface StoryState {
  N: number
  F: Point[][]
  F2polys: Point[][]
  F2hubs: Point[]
  F3rects: [number, number, number, number][]
  F4tops: Point[]
}

export const buildStory = (
  mob: boolean,
  prev: StoryState | null
): StoryState => {
  const N = mob ? 240 : 380
  if (prev && prev.N === N) return prev
  const F0: Point[] = []
  const F1: Point[] = []
  const F2: Point[] = []
  const F3: Point[] = []
  const F4: Point[] = []
  for (let i = 0; i < N; i++) F0.push([hash(i * 3 + 1), hash(i * 3 + 2)])
  const CC: Point[] = [
    [0.14, 0.24],
    [0.48, 0.16],
    [0.84, 0.28],
    [0.18, 0.76],
    [0.52, 0.7],
    [0.86, 0.78],
  ]
  const per = Math.ceil(N / 6)
  const rn = Math.ceil(per / 7)
  for (let i = 0; i < N; i++) {
    const c = CC[i % 6]
    const q = Math.floor(i / 6)
    const gx = q % 7
    const gy = Math.floor(q / 7)
    F1.push([c[0] + (gx - 3) * 0.024, c[1] + (gy - (rn - 1) / 2) * 0.036])
  }
  const dist = (segs: [Point, Point][], M: number, out: Point[]) => {
    const lens = segs.map(
      ([a, b]) => Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
    )
    const L = lens.reduce((x, y) => x + y, 0)
    for (let k = 0; k < M; k++) {
      let d = ((k + 0.5) / M) * L
      let si = 0
      while (si < segs.length - 1 && d > lens[si]) {
        d -= lens[si]
        si++
      }
      const [a, b] = segs[si]
      const u = lens[si] ? d / lens[si] : 0
      out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u])
    }
  }
  const Hh: Point[] = [
    [0.06, 0.5],
    [0.3, 0.16],
    [0.3, 0.84],
    [0.54, 0.5],
    [0.76, 0.16],
    [0.76, 0.84],
    [0.96, 0.5],
  ]
  const E: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
    [1, 4],
    [2, 5],
  ]
  const polys: Point[][] = E.map(([a, b]) => [
    Hh[a],
    [Hh[b][0], Hh[a][1]],
    Hh[b],
  ])
  const hubPts = Hh.length * 6
  for (let i = 0; i < hubPts; i++) {
    const h = Hh[Math.floor(i / 6)]
    const a = ((i % 6) / 6) * Math.PI * 2
    F2.push([h[0] + Math.cos(a) * 0.02, h[1] + Math.sin(a) * 0.03])
  }
  const s2: [Point, Point][] = []
  polys.forEach((p) => {
    s2.push([p[0], p[1]], [p[1], p[2]])
  })
  dist(s2, N - hubPts, F2)
  const RS: [number, number, number, number][] = [
    [0.04, 0.04, 0.96, 0.2],
    [0.04, 0.3, 0.96, 0.46],
    [0.04, 0.56, 0.96, 0.72],
    [0.04, 0.82, 0.96, 0.98],
  ]
  const s3: [Point, Point][] = []
  RS.forEach(([a, b, c, d]) => {
    s3.push(
      [
        [a, b],
        [c, b],
      ],
      [
        [c, b],
        [c, d],
      ],
      [
        [c, d],
        [a, d],
      ],
      [
        [a, d],
        [a, b],
      ]
    )
  })
  dist(s3, N, F3)
  const B = 8
  const hs: number[] = []
  for (let b = 0; b < B; b++) hs.push(0.16 + 0.82 * Math.pow((b + 1) / B, 1.5))
  const tot = hs.reduce((x, y) => x + y, 0)
  const cnt = hs.map((h) => Math.floor((N * h) / tot))
  cnt[B - 1] += N - cnt.reduce((x, y) => x + y, 0)
  const F4tops: Point[] = []
  for (let b = 0; b < B; b++) {
    const x0 = 0.04 + b * (0.92 / B)
    const bw = (0.92 / B) * 0.62
    const rows = Math.ceil(cnt[b] / 3)
    F4tops.push([x0 + bw / 2, 1 - hs[b]])
    for (let q = 0; q < cnt[b]; q++) {
      const gx = q % 3
      const gy = Math.floor(q / 3)
      F4.push([x0 + ((gx + 0.5) * bw) / 3, 1 - (gy + 0.5) * (hs[b] / rows)])
    }
  }
  return {
    N,
    F: [F0, F1, F2, F3, F4],
    F2polys: polys,
    F2hubs: Hh,
    F3rects: RS,
    F4tops,
  }
}

/** Draws one frame. Returns the current stage (0..4) so the caller can update copy. */
export const drawStory = (
  sec: HTMLElement,
  cv: HTMLCanvasElement,
  st: StoryState,
  t: number,
  C: Palette
): number | null => {
  const r = sec.getBoundingClientRect()
  const vh = window.innerHeight
  if (r.bottom < 0 || r.top > vh) return null
  const p = clamp(-r.top / (r.height - vh))
  const sf = Math.min(4, Math.max(0, p * 4.3 - 0.15))
  const stage = Math.min(4, Math.round(sf))
  const k = Math.min(3, Math.floor(sf))
  const fr = sf - k
  const e = ease(clamp((fr - 0.15) / 0.7))
  const ctx = cv.getContext('2d')
  if (!ctx) return stage
  const W = cv.clientWidth
  const H = cv.clientHeight
  ctx.clearRect(0, 0, W, H)
  const mob = W < 760
  const bx = mob ? 20 : W * 0.44
  const by = mob ? H * 0.22 : H * 0.2
  const bw = mob ? W - 40 : W * 0.5
  const bh = mob ? H * 0.3 : H * 0.54
  const X = (v: number) => bx + v * bw
  const Y = (v: number) => by + v * bh
  const A = st.F[k]
  const Bf = st.F[k + 1]
  const N = st.N
  const chaos = Math.max(0, 1 - sf)
  const w2 = Math.max(0, 1 - Math.abs(sf - 2))
  const w3 = Math.max(0, 1 - Math.abs(sf - 3))
  const w4 = clamp(sf - 3)
  ctx.lineWidth = 1
  ctx.font = '500 10px "IBM Plex Mono", monospace'
  if (w2 > 0.01) {
    ctx.strokeStyle = C.p
    ctx.globalAlpha = w2 * 0.5
    ctx.beginPath()
    st.F2polys.forEach((pl) => {
      ctx.moveTo(X(pl[0][0]), Y(pl[0][1]))
      ctx.lineTo(X(pl[1][0]), Y(pl[1][1]))
      ctx.lineTo(X(pl[2][0]), Y(pl[2][1]))
    })
    ctx.stroke()
    ctx.globalAlpha = w2
    ctx.lineWidth = 1.5
    st.F2hubs.forEach((h) => ctx.strokeRect(X(h[0]) - 10, Y(h[1]) - 10, 20, 20))
    ctx.fillStyle = C.a
    st.F2polys.forEach((pl, ii) => {
      const pt = polyAt(pl, (t * 0.00018 + ii * 0.137) % 1)
      ctx.fillRect(X(pt[0]) - 3, Y(pt[1]) - 3, 6, 6)
    })
  }
  if (w3 > 0.01) {
    ctx.strokeStyle = C.p
    ctx.lineWidth = 1
    ctx.globalAlpha = w3 * 0.5
    const L = ['DATA', 'MODEL', 'APPLICATION', 'BUSINESS WORKFLOW']
    st.F3rects.forEach((rc, i) => {
      ctx.strokeRect(
        X(rc[0]),
        Y(rc[1]),
        (rc[2] - rc[0]) * bw,
        (rc[3] - rc[1]) * bh
      )
      ctx.fillStyle = C.m
      ctx.globalAlpha = w3
      ctx.fillText(
        'L0' + (i + 1) + ' / ' + L[i],
        X(rc[0]) + 10,
        Y((rc[1] + rc[3]) / 2) + 3
      )
      ctx.globalAlpha = w3 * 0.5
    })
  }
  if (w4 > 0.01) {
    ctx.globalAlpha = w4
    ctx.strokeStyle = C.b
    ctx.beginPath()
    ctx.moveTo(X(0), Y(1) + 8)
    ctx.lineTo(X(1), Y(1) + 8)
    ctx.stroke()
    ctx.strokeStyle = C.a
    ctx.lineWidth = 1.5
    ctx.beginPath()
    const tp = st.F4tops
    ctx.moveTo(X(tp[0][0]), Y(tp[0][1]) - 12)
    for (let i = 1; i < tp.length; i++) {
      ctx.lineTo(X(tp[i][0]), Y(tp[i - 1][1]) - 12)
      ctx.lineTo(X(tp[i][0]), Y(tp[i][1]) - 12)
    }
    ctx.stroke()
    const l = tp[tp.length - 1]
    ctx.fillStyle = C.a
    ctx.fillRect(X(l[0]) - 4, Y(l[1]) - 16, 8, 8)
  }
  for (let i = 0; i < N; i++) {
    const a = A[i]
    const b = Bf[i]
    const dl = (i * 0.618) % 1
    const ei = ease(clamp(e * 1.5 - dl * 0.5))
    let x = a[0] + (b[0] - a[0]) * ei
    let y = a[1] + (b[1] - a[1]) * ei
    if (chaos > 0) {
      x += Math.sin(t * 0.0006 + i * 1.7) * 0.02 * chaos
      y += Math.cos(t * 0.0005 + i * 2.3) * 0.03 * chaos
    }
    const acc = sf > 1.5 && i % 29 === 0
    ctx.fillStyle = acc ? C.a : sf < 1.4 ? C.m : C.p
    ctx.globalAlpha = sf < 1.4 ? 0.85 : 0.95
    const s = sf < 0.5 ? 2 : 2.6
    ctx.fillRect(X(x) - s / 2, Y(y) - s / 2, s, s)
  }
  ctx.globalAlpha = 1
  return stage
}

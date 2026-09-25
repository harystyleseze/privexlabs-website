import { LANG, type SpecimenMode } from 'src/content/site'
import type { Palette } from 'src/lib/colors'
import { clamp, ease, hash, polyAt, type Point } from 'src/lib/math'

/** Lab specimen canvas: one animated diagram per experiment mode (design drawLab). */
export interface LabState {
  /** cached total width of one LANG loop; reset on resize */
  langW: number | null
}

export interface LabInputs {
  mode: SpecimenMode
  /** performance.now() when the current experiment was picked */
  expT: number
  motion: boolean
  C: Palette
}

export const drawLab = (
  cv: HTMLCanvasElement,
  st: LabState,
  t: number,
  inp: LabInputs
) => {
  const r = cv.getBoundingClientRect()
  if (r.bottom < 0 || r.top > window.innerHeight || !r.width) return
  const ctx = cv.getContext('2d')
  if (!ctx) return
  const W = r.width
  const H = r.height
  const C = inp.C
  ctx.clearRect(0, 0, W, H)
  const m = inp.mode
  const e = ease(clamp((t - (inp.expT || 0)) / 700)) || (inp.motion ? 0 : 1)
  ctx.globalAlpha = 0.4
  ctx.fillStyle = C.b
  for (let x = 12; x < W; x += 24)
    for (let y = 12; y < H; y += 24) ctx.fillRect(x, y, 1, 1)
  ctx.globalAlpha = e
  ctx.lineWidth = 1.5
  ctx.font = '500 10px "IBM Plex Mono", monospace'
  const sq = (x: number, y: number, s: number, c: string) => {
    ctx.fillStyle = c
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
  }
  const tri = (u: number) => 1 - Math.abs(1 - 2 * (((u % 1) + 1) % 1))
  const H_ = hash
  const line = (pl: Point[]) => {
    ctx.beginPath()
    ctx.moveTo(pl[0][0], pl[0][1])
    pl.forEach((p) => ctx.lineTo(p[0], p[1]))
    ctx.stroke()
  }
  const wave = (y0: number, h: number) => {
    const cy = y0 + h / 2
    for (let x = 10; x < W - 10; x += 6) {
      const v =
        Math.sin(x * 0.035 + t * 0.004) * 0.5 +
        Math.sin(x * 0.011 - t * 0.0023) * 0.35 +
        Math.sin(x * 0.09 + t * 0.007) * 0.15
      const env = Math.sin((Math.PI * x) / W)
      const y = cy + v * h * 0.4 * env * e
      if (((x / 6) | 0) % 6 === 0) {
        ctx.fillStyle = C.b
        ctx.fillRect(x, Math.min(cy, y), 1, Math.abs(y - cy))
      }
      sq(x, y, 3, C.p)
    }
  }
  const vision = (y0: number, h: number) => {
    const g = 14
    const scan = ((t * 0.12) % (W + 80)) - 40
    for (let x = g / 2; x < W; x += g)
      for (let y = y0 + g / 2; y < y0 + h; y += g) {
        const dx = (x - W * 0.55) / W
        const dy = (y - (y0 + h * 0.5)) / h
        const v = Math.exp(-(dx * dx * 18 + dy * dy * 6))
        if (x < scan && v > 0.35) {
          ctx.globalAlpha = e * (0.3 + 0.7 * v)
          sq(x, y, g - 4, C.p)
        } else {
          ctx.globalAlpha = e * 0.6
          sq(x, y, 2, C.b)
        }
      }
    ctx.globalAlpha = e
    ctx.fillStyle = C.a
    ctx.fillRect(scan, y0, 1.5, h)
    if (scan > W * 0.74) {
      ctx.strokeStyle = C.a
      ctx.strokeRect(W * 0.36, y0 + h * 0.2, W * 0.38, h * 0.6)
      ctx.fillText('DETECTED', W * 0.36, y0 + h * 0.2 - 6)
    }
  }
  if (m === 'models') {
    const n = Math.max(12, Math.floor(W / 22))
    const bw = W / n
    for (let c = 0; c < n; c++) {
      const v =
        0.5 +
        0.5 * Math.sin(t * 0.0021 + c * 0.7) * Math.cos(t * 0.0013 + c * 0.31)
      const h = (0.15 + 0.7 * v) * (H - 40) * e
      for (let y = H - 20; y > H - 20 - h; y -= 8)
        sq(c * bw + bw / 2, y, Math.min(8, bw * 0.45), C.p)
      sq(c * bw + bw / 2, H - 26 - h, 5, c % 5 === 0 ? C.a : C.t)
    }
  } else if (m === 'inference') {
    const a: Point = [W * 0.14, H * 0.64]
    const b: Point = [W * 0.84, H * 0.34]
    const mx = W * 0.5
    const pl: Point[] = [a, [mx, a[1]], [mx, b[1]], b]
    ctx.strokeStyle = C.b
    line(pl)
    ctx.strokeStyle = C.p
    ctx.strokeRect(a[0] - 12, a[1] - 12, 24, 24)
    ctx.strokeRect(b[0] - 16, b[1] - 16, 32, 32)
    ctx.setLineDash([3, 4])
    ctx.strokeStyle = C.b
    ctx.strokeRect(W * 0.05, H * 0.1, W * 0.9, H * 0.8)
    ctx.setLineDash([])
    const u = (t * 0.0005) % 1
    const go = u < 0.5
    const pt = polyAt(pl, go ? u * 2 : 2 - u * 2)
    sq(pt[0], pt[1], 8, go ? C.a : C.p)
    ctx.fillStyle = C.m
    ctx.fillText('REQUEST', a[0] - 20, a[1] + 30)
    ctx.fillText('LOCAL MODEL', b[0] - 30, b[1] - 26)
    ctx.fillText('PRIVATE BOUNDARY', W * 0.05 + 10, H * 0.1 + 18)
  } else if (m === 'wave') wave(0, H)
  else if (m === 'multi') {
    wave(0, H * 0.46)
    ctx.globalAlpha = e
    ctx.fillStyle = C.b
    ctx.fillRect(10, H * 0.5, W - 20, 1)
    vision(H * 0.54, H * 0.46)
  } else if (m === 'vision') vision(0, H)
  else if (m === 'agents') {
    const R: Point = [W * 0.1, H * 0.5]
    const L1: Point[] = [
      [W * 0.42, H * 0.2],
      [W * 0.42, H * 0.5],
      [W * 0.42, H * 0.8],
    ]
    const L2: Point[] = []
    L1.forEach((p) => {
      L2.push([W * 0.84, p[1] - H * 0.08], [W * 0.84, p[1] + H * 0.08])
    })
    const act = Math.floor(t / 1100) % 6
    const u = (t % 1100) / 1100
    const pt = (i: number): Point[] => {
      const p1 = L1[i >> 1]
      const p2 = L2[i]
      return [
        R,
        [W * 0.26, R[1]],
        [W * 0.26, p1[1]],
        p1,
        [W * 0.63, p1[1]],
        [W * 0.63, p2[1]],
        p2,
      ]
    }
    ctx.strokeStyle = C.b
    ctx.lineWidth = 1
    for (let i = 0; i < 6; i++) line(pt(i))
    const pl = pt(act)
    ctx.strokeStyle = C.p
    ctx.lineWidth = 2
    line(pl)
    ;[R, ...L1, ...L2].forEach((p) => {
      ctx.fillStyle = C.s
      ctx.fillRect(p[0] - 8, p[1] - 8, 16, 16)
      ctx.strokeStyle = C.b
      ctx.lineWidth = 1.5
      ctx.strokeRect(p[0] - 8, p[1] - 8, 16, 16)
    })
    const hd = polyAt(pl, Math.min(1, u * 1.3))
    sq(hd[0], hd[1], 7, C.a)
    ctx.fillStyle = C.m
    ctx.fillText('AGENT', R[0] - 14, R[1] + 26)
    ctx.fillStyle = C.a
    ctx.fillText(
      'TOOL ' + String(act + 1).padStart(2, '0'),
      L2[act][0] - 34,
      L2[act][1] - 14
    )
  } else if (m === 'eval') {
    const th = H * 0.42
    ctx.strokeStyle = C.a
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(10, th)
    ctx.lineTo(W - 10, th)
    ctx.stroke()
    ctx.setLineDash([])
    for (let i = 0; i < 80; i++) {
      const x = 20 + H_(i) * (W - 40)
      const y = 16 + H_(i + 99) * (H - 32) + Math.sin(t * 0.0012 + i) * 8
      if (y < th) sq(x, y, 5, C.p)
      else {
        ctx.globalAlpha = e * 0.7
        sq(x, y, 4, C.m)
        ctx.globalAlpha = e
      }
    }
    ctx.fillStyle = C.a
    ctx.fillText('PASS', W - 44, th - 8)
    ctx.fillStyle = C.m
    ctx.fillText('FAIL', W - 44, th + 16)
  } else if (m === 'synth') {
    const sd: Point[] = [
      [0.24, 0.34],
      [0.7, 0.28],
      [0.4, 0.72],
      [0.78, 0.7],
    ]
    for (let k = 0; k < 140; k++) {
      const s = sd[k % 4]
      const age = (t * 0.00035 + H_(k)) % 1
      const ang = H_(k + 7) * 6.283
      const dd = age * Math.min(W, H) * 0.24
      const x = s[0] * W + Math.cos(ang) * dd
      const y = s[1] * H + Math.sin(ang) * dd
      ctx.globalAlpha = e * (1 - age)
      sq(Math.round(x / 6) * 6, Math.round(y / 6) * 6, 4, C.p)
    }
    ctx.globalAlpha = e
    sd.forEach((s) => sq(s[0] * W, s[1] * H, 10, C.a))
  } else if (m === 'lang') {
    ctx.font = '500 14px "IBM Plex Mono", monospace'
    if (!st.langW)
      st.langW = LANG.reduce((a, w) => a + ctx.measureText(w).width + 30, 0)
    const langW = st.langW
    const rows = Math.max(3, Math.floor((H - 16) / 30))
    const hi = Math.floor(t / 1400) % rows
    for (let rr = 0; rr < rows; rr++) {
      const y = 30 + rr * 30
      const dir = rr % 2 ? 1 : -1
      const off = t * 0.03 * dir * (1 + (rr % 3) * 0.3)
      let x = -(((off % langW) + langW) % langW)
      ctx.fillStyle = rr === hi ? C.p : C.m
      ctx.globalAlpha = e * (rr === hi ? 1 : 0.5)
      let k = rr * 3
      while (x < W) {
        const w = LANG[k % LANG.length]
        ctx.fillText(w, x, y)
        x += ctx.measureText(w).width + 30
        k++
      }
    }
  } else if (m === 'edge') {
    const n = 8
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283
      const x = W / 2 + Math.cos(a) * W * 0.34
      const y = H / 2 + Math.sin(a) * H * 0.34
      const ph = (t * 0.001 + i * 0.37) % 1
      ctx.strokeStyle = C.b
      ctx.lineWidth = 1.5
      ctx.strokeRect(x - 12, y - 12, 24, 24)
      ctx.globalAlpha = e * (1 - ph)
      ctx.strokeStyle = C.p
      const s = 12 + ph * 16
      ctx.strokeRect(x - s, y - s, s * 2, s * 2)
      ctx.globalAlpha = e
      sq(x, y, 6, ph < 0.2 ? C.a : C.p)
    }
    ctx.fillStyle = C.m
    ctx.fillText('PROCESSED ON DEVICE', W / 2 - 60, H / 2 + 4)
  } else if (m === 'boundary') {
    const bx = W * 0.18
    const by = H * 0.14
    const bw = W * 0.64
    const bh = H * 0.72
    ctx.strokeStyle = C.p
    ctx.lineWidth = 2
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 14)
    else ctx.rect(bx, by, bw, bh)
    ctx.stroke()
    for (let i = 0; i < 44; i++) {
      const x =
        bx + 14 + tri(H_(i) + t * 0.00012 * (1 + H_(i + 3) * 2)) * (bw - 28)
      const y =
        by + 14 + tri(H_(i + 5) + t * 0.00015 * (1 + H_(i + 9) * 2)) * (bh - 28)
      sq(x, y, 4, C.t)
    }
    for (let i = 0; i < 22; i++) {
      const a = H_(i + 40) * 6.283 + t * 0.0002 * (i % 2 ? 1 : -1)
      const rr = Math.max(bw, bh) * 0.62
      const x = W / 2 + Math.cos(a) * rr
      const y = H / 2 + Math.sin(a) * rr * 0.62
      if (x < bx - 6 || x > bx + bw + 6 || y < by - 6 || y > by + bh + 6) {
        ctx.globalAlpha = e * 0.5
        sq(x, y, 3, C.m)
        ctx.globalAlpha = e
      }
    }
    sq(bx + bw - 22, by + 22, 10, C.a)
    ctx.fillStyle = C.m
    ctx.fillText('PRIVATE BOUNDARY', bx + 12, by - 8)
  }
  ctx.globalAlpha = 1
}

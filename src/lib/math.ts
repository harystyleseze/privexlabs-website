export const clamp = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

export const ease = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export const hash = (i: number): number => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

export type Point = [number, number]

/** Point at normalized distance `u` (0..1) along an orthogonal polyline. */
export const polyAt = (pl: Point[], u: number): Point => {
  const ls: number[] = []
  let L = 0
  for (let i = 1; i < pl.length; i++) {
    const l =
      Math.abs(pl[i][0] - pl[i - 1][0]) + Math.abs(pl[i][1] - pl[i - 1][1])
    ls.push(l)
    L += l
  }
  let d = u * L
  for (let i = 0; i < ls.length; i++) {
    if (d <= ls[i] || i === ls.length - 1) {
      const f = ls[i] ? Math.min(1, d / ls[i]) : 0
      return [
        pl[i][0] + (pl[i + 1][0] - pl[i][0]) * f,
        pl[i][1] + (pl[i + 1][1] - pl[i][1]) * f,
      ]
    }
    d -= ls[i]
  }
  return pl[0]
}

export const pad2 = (n: number): string => String(n).padStart(2, '0')
export const pad3 = (n: number): string => String(n).padStart(3, '0')
export const pad4 = (n: number): string => String(n).padStart(4, '0')

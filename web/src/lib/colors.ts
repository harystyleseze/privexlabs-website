/** Canvas palette read from the computed design tokens of an element. */
export interface Palette {
  p: string // brand primary
  a: string // brand accent
  m: string // text muted
  b: string // border strong
  t: string // text primary
  s: string // foundation (or surface)
}

export const readPalette = (el: Element): Palette => {
  const cs = getComputedStyle(el)
  const v = (n: string) => cs.getPropertyValue(n).trim()
  return {
    p: v('--color-brand-primary'),
    a: v('--color-brand-accent'),
    m: v('--color-text-muted'),
    b: v('--color-border-strong'),
    t: v('--color-text-primary'),
    s: v('--color-foundation') || v('--color-surface'),
  }
}

import { buildHero, createHeroState, drawHero } from './hero'

const stubContext = () =>
  new Proxy(
    {},
    { get: (_t, prop) => (prop === 'canvas' ? null : () => undefined) }
  ) as unknown as CanvasRenderingContext2D

describe('drawHero', () => {
  it('updates the coordinate readout in place without replacing its text node', () => {
    const cv = document.createElement('canvas')
    Object.defineProperty(cv, 'clientWidth', { value: 800 })
    Object.defineProperty(cv, 'clientHeight', { value: 600 })
    cv.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        width: 800,
        height: 600,
        bottom: 600,
        right: 800,
      }) as DOMRect
    cv.getContext = vi.fn(() => stubContext()) as never
    const st = createHeroState()
    buildHero(cv, st)
    const coordEl = document.createElement('span')
    coordEl.textContent = 'X 0000 · Y 0000'
    const sigEl = document.createElement('span')
    sigEl.textContent = 'LISTENING'
    const coordNode = coordEl.firstChild
    const sigNode = sigEl.firstChild
    const C = { p: '#0', a: '#1', m: '#2', b: '#3', t: '#4', s: '#5' }
    drawHero(cv, st, 16, 16, {
      mx: 100,
      my: 100,
      lastMove: performance.now(),
      fine: true,
      motion: true,
      C,
      coordEl,
      sigEl,
      lines: [],
    })
    expect(coordEl).not.toHaveTextContent('X 0000 · Y 0000')
    expect(coordEl.firstChild).toBe(coordNode)
    expect(sigEl).toHaveTextContent('SIGNAL DETECTED')
    expect(sigEl.firstChild).toBe(sigNode)
  })
})

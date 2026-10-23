/**
 * Per-frame updater for the design's `[data-flow]` (marching stroke-dashoffset)
 * and `[data-pulse]` (breathing opacity) elements. Same formulas as the design's tick():
 *   flow:  strokeDashoffset = -((t * .02 * factor) % 1000)
 *   pulse: opacity = .35 + .65 * (.5 + .5 * sin(t * .005))
 * The node lists are cached and invalidated whenever the DOM under `root` changes.
 */
export const createFlowPulse = (root: HTMLElement) => {
  let flowEls: HTMLElement[] | null = null
  let pulseEls: HTMLElement[] | null = null

  const observer = new MutationObserver(() => {
    flowEls = null
    pulseEls = null
  })
  observer.observe(root, { childList: true, subtree: true })

  const frame = (t: number) => {
    if (!flowEls)
      flowEls = Array.from(root.querySelectorAll<HTMLElement>('[data-flow]'))
    flowEls.forEach((el) => {
      el.style.strokeDashoffset = String(
        -((t * 0.02 * +(el.getAttribute('data-flow') || 1)) % 1000)
      )
    })
    if (!pulseEls)
      pulseEls = Array.from(root.querySelectorAll<HTMLElement>('[data-pulse]'))
    const o = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.005))).toFixed(2)
    pulseEls.forEach((el) => {
      el.style.opacity = o
    })
  }

  const dispose = () => observer.disconnect()

  return { frame, dispose }
}

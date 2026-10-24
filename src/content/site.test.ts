import {
  NAV,
  MENU,
  STAGES,
  MISSION,
  CAPS,
  STEPS,
  ST_POS,
  LAYERS,
  QS,
  MAP,
  EDGES,
  EXPS,
  MODE_L,
  PRINCIPLES,
  DIFFS,
  SECTORS,
  DIR,
  CHAIN,
  LANG,
  LEGAL_LINKS,
} from './site'

// Counts are asserted against labels the design hardcodes in its markup
// ("INDEX / 13 NODES", "06 / 06 LOADED", "STEP xx / 06", "01 / 05", "09 NODES / 16 LINKS").
describe('site content', () => {
  it('matches the counts fixed in the design markup', () => {
    expect(NAV).toHaveLength(5)
    expect(MENU).toHaveLength(13)
    expect(STAGES).toHaveLength(5)
    expect(MISSION).toHaveLength(8)
    expect(CAPS).toHaveLength(6)
    expect(STEPS).toHaveLength(6)
    expect(ST_POS).toHaveLength(6)
    expect(LAYERS).toHaveLength(11)
    expect(QS).toHaveLength(5)
    expect(MAP).toHaveLength(9)
    expect(EDGES).toHaveLength(16)
    expect(EXPS).toHaveLength(15)
    expect(PRINCIPLES).toHaveLength(6)
    expect(DIFFS).toHaveLength(5)
    expect(SECTORS).toHaveLength(11)
    expect(DIR).toHaveLength(6)
    expect(CHAIN).toHaveLength(8)
    expect(LANG).toHaveLength(12)
    expect(LEGAL_LINKS).toHaveLength(4)
  })

  it('has consistent references', () => {
    const ids = new Set(MAP.map((n) => n.id))
    EDGES.forEach(([a, b]) => {
      expect(ids.has(a)).toBe(true)
      expect(ids.has(b)).toBe(true)
    })
    EXPS.forEach(([, , mode]) => expect(MODE_L[mode]).toBeDefined())
    MENU.forEach(([, , href]) => expect(href.startsWith('/#')).toBe(true))
    NAV.forEach(([, href]) => expect(href.startsWith('/#')).toBe(true))
    LEGAL_LINKS.forEach(([, href]) =>
      expect(href.startsWith('/legal/')).toBe(true)
    )
    LAYERS.slice(0, 7).forEach((l) => expect(l.k.startsWith('L')).toBe(true))
    LAYERS.slice(7, 10).forEach((l) => expect(l.k.startsWith('R')).toBe(true))
    expect(LAYERS[10].k).toBe('X01')
  })
})

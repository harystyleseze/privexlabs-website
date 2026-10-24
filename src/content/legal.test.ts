import { LEGAL_EMAIL, LEGAL_PAGES, LEGAL_SLUGS } from './legal'

describe('legal content', () => {
  it('has the four documents, each with a title, intro and sections', () => {
    expect(LEGAL_SLUGS).toEqual(['privacy', 'terms', 'dpa', 'disclaimer'])
    LEGAL_SLUGS.forEach((slug) => {
      const doc = LEGAL_PAGES[slug]
      expect(doc.title.length).toBeGreaterThan(0)
      expect(doc.intro.length).toBeGreaterThan(0)
      expect(doc.sections.length).toBeGreaterThanOrEqual(3)
      doc.sections.forEach((s) => expect(s.body.length).toBeGreaterThan(0))
    })
  })

  it('keeps the promises the contact form makes', () => {
    const text = JSON.stringify(LEGAL_PAGES.privacy)
    expect(text).toContain(LEGAL_EMAIL)
    expect(text).toContain('Google Forms')
    expect(text).toContain('never share it with third parties')
    expect(text).toContain('delete')
  })
})

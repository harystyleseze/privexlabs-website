import {
  CONTACT_FORM_ACTION,
  CONTACT_FORM_FIELDS,
  contactFormBody,
  submitContactForm,
} from './contactForm'

describe('contactForm', () => {
  it('encodes the email and problem under the form field names', () => {
    const body = contactFormBody({
      email: ' ada@example.com ',
      problem: 'Orders live in a spreadsheet. ',
    })
    expect(body.get(CONTACT_FORM_FIELDS.email)).toBe('ada@example.com')
    expect(body.get(CONTACT_FORM_FIELDS.problem)).toBe(
      'Orders live in a spreadsheet.'
    )
    expect([...body.keys()]).toEqual(['emailAddress', 'entry.474418936'])
  })

  it('posts to the formResponse endpoint without CORS', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ type: 'opaque' })
    globalThis.fetch = fetchMock as unknown as typeof fetch
    await submitContactForm({ email: 'ada@example.com', problem: 'Help' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(CONTACT_FORM_ACTION)
    expect(url).toMatch(
      /^https:\/\/docs\.google\.com\/forms\/d\/e\/.+\/formResponse$/
    )
    expect(init.method).toBe('POST')
    expect(init.mode).toBe('no-cors')
    expect(init.body.get('emailAddress')).toBe('ada@example.com')
  })

  it('rejects when the network request fails', async () => {
    globalThis.fetch = jest
      .fn()
      .mockRejectedValue(
        new TypeError('Failed to fetch')
      ) as unknown as typeof fetch
    await expect(
      submitContactForm({ email: 'ada@example.com', problem: 'Help' })
    ).rejects.toThrow('Failed to fetch')
  })
})

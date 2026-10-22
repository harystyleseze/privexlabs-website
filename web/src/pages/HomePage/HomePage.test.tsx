import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import SiteLayout from 'src/layouts/SiteLayout/SiteLayout'

import HomePage from './HomePage'

const SECTION_IDS = [
  'top',
  'overview',
  'signal',
  'vision',
  'capabilities',
  'approach',
  'infrastructure',
  'questions',
  'system',
  'lab',
  'principles',
  'about',
  'direction',
  'contact',
]

describe('HomePage', () => {
  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null) as never
    ;(
      SVGElement.prototype as unknown as { getTotalLength: () => number }
    ).getTotalLength = () => 1
    ;(
      SVGElement.prototype as unknown as {
        getPointAtLength: (n: number) => { x: number; y: number }
      }
    ).getPointAtLength = () => ({ x: 0, y: 0 })
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
    const IO = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
    ;(
      window as unknown as { IntersectionObserver: unknown }
    ).IntersectionObserver = IO
  })

  it('renders every indexed section and the contact form posts to the Google Form', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ type: 'opaque' })
    globalThis.fetch = fetchMock as unknown as typeof fetch
    render(
      <SiteLayout>
        <HomePage />
      </SiteLayout>
    )
    SECTION_IDS.forEach((id) =>
      expect(document.getElementById(id)).not.toBeNull()
    )
    expect(document.querySelectorAll('[data-sec]')).toHaveLength(14)
    // Capability index entries are plain spans in the design (no tab stop, no cursor label).
    screen
      .getAllByText('Approvals and handoffs')
      .forEach((el) => expect(el.closest('button')).toBeNull())
    expect(screen.getByText('READY')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Message PrivexLabs on WhatsApp' })
    ).toHaveAttribute('href', 'https://wa.me/2349066607246')

    fireEvent.change(screen.getByLabelText('Where should we reply?'), {
      target: { value: 'ada@example.com' },
    })
    fireEvent.change(
      screen.getByLabelText("What's slowing your business down?"),
      { target: { value: 'Orders live in a spreadsheet.' } }
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Start a conversation' })
    )
    expect(await screen.findByText('> SIGNAL RECEIVED')).toBeInTheDocument()
    expect(screen.getByText('RECEIVED')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const body = fetchMock.mock.calls[0][1].body as URLSearchParams
    expect(body.get('emailAddress')).toBe('ada@example.com')
    expect(body.get('entry.474418936')).toBe('Orders live in a spreadsheet.')
  })

  it('offers the form link when the submission cannot reach Google', async () => {
    globalThis.fetch = jest
      .fn()
      .mockRejectedValue(
        new TypeError('Failed to fetch')
      ) as unknown as typeof fetch
    render(
      <SiteLayout>
        <HomePage />
      </SiteLayout>
    )
    fireEvent.change(screen.getByLabelText('Where should we reply?'), {
      target: { value: 'ada@example.com' },
    })
    fireEvent.change(
      screen.getByLabelText("What's slowing your business down?"),
      { target: { value: 'Help' } }
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Start a conversation' })
    )
    expect(await screen.findByText('NOT SENT')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'the PrivexLabs contact form' })
    ).toHaveAttribute('href', expect.stringContaining('/viewform'))
  })
})

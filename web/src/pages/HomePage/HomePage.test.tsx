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

  it('renders every indexed section and the contact form flips to received', () => {
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
      .getAllByText('AI assistants and copilots')
      .forEach((el) => expect(el.closest('button')).toBeNull())
    expect(screen.getByText('READY')).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Start a conversation' })
    )
    expect(screen.getByText('> SIGNAL RECEIVED')).toBeInTheDocument()
    expect(screen.getByText('RECEIVED')).toBeInTheDocument()
  })
})

import { StrictMode } from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { useSite } from '@/layouts/SiteLayout/SiteContext'
import SiteLayout from '@/layouts/SiteLayout/SiteLayout'

import { usePick } from './usePick'

const Probe = () => {
  const [v, pick] = usePick(0)
  const { signals } = useSite()
  return (
    <div>
      <button type="button" onClick={() => pick(1)}>
        pick one
      </button>
      <span data-testid="value">{v}</span>
      <span data-testid="signals">{signals}</span>
    </div>
  )
}

describe('usePick', () => {
  beforeAll(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    ;(
      window as unknown as { IntersectionObserver: unknown }
    ).IntersectionObserver = class {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    }
  })

  it('counts exactly one signal per value change, even under StrictMode', () => {
    render(
      <StrictMode>
        <SiteLayout>
          <Probe />
        </SiteLayout>
      </StrictMode>
    )
    expect(screen.getByTestId('signals')).toHaveTextContent('0')
    fireEvent.click(screen.getByText('pick one'))
    expect(screen.getByTestId('value')).toHaveTextContent('1')
    expect(screen.getByTestId('signals')).toHaveTextContent('1')
    fireEvent.click(screen.getByText('pick one'))
    expect(screen.getByTestId('signals')).toHaveTextContent('1')
  })
})

import { StrictMode } from 'react'

import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import SiteLayout from 'src/layouts/SiteLayout/SiteLayout'

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
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))
    ;(
      window as unknown as { IntersectionObserver: unknown }
    ).IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
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

// Port of the design system's Wordmark (PrivexLabsDesignSystem.Wordmark).
// The mark: a rounded boundary square containing an orthogonal "P" trace ending in a brass node.
interface WordmarkProps {
  size?: number
  inverse?: boolean
  mark?: boolean
}

const Wordmark = ({
  size = 20,
  inverse = false,
  mark = false,
}: WordmarkProps) => {
  const h = Math.round(size * 1.5)
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(size * 0.45),
      }}
    >
      {mark && (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          style={{ height: h, width: h, flex: 'none' }}
          aria-hidden="true"
        >
          <rect
            x="3.5"
            y="3.5"
            width="41"
            height="41"
            rx="9"
            stroke="var(--color-brand-primary)"
            strokeWidth="3"
          />
          <path
            d="M18 35 V13 H31.5 V24 H22"
            stroke="var(--color-brand-primary)"
            strokeWidth="3"
          />
          <rect
            x="19"
            y="21"
            width="6"
            height="6"
            fill="var(--color-brand-accent)"
          />
        </svg>
      )}
      <span
        style={{
          fontWeight: 800,
          fontSize: size,
          letterSpacing: '-0.02em',
          color: inverse
            ? 'var(--color-text-inverse)'
            : 'var(--color-text-primary)',
          whiteSpace: 'nowrap',
        }}
      >
        Privex
        <span style={{ color: 'var(--color-brand-primary)' }}>Labs</span>
      </span>
    </span>
  )
}

export default Wordmark

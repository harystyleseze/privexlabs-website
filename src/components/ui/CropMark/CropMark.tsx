import styles from './CropMark.module.css'

// The 11×11 registration mark the design places at diagram corners.
type Corner = 'tl' | 'tr' | 'bl' | 'br'

interface CropMarkProps {
  corner: Corner
  /** distance outside the parent box, in px (design uses 5 or 6) */
  offset?: number
}

const CropMark = ({ corner, offset = 5 }: CropMarkProps) => {
  const o = `-${offset}px`
  const pos = {
    tl: { top: o, left: o },
    tr: { top: o, right: o },
    bl: { bottom: o, left: o },
    br: { bottom: o, right: o },
  }[corner]
  return (
    <svg
      width="11"
      height="11"
      className={styles.mark}
      style={pos}
      aria-hidden="true"
    >
      <path d="M5.5 0v11M0 5.5h11" />
    </svg>
  )
}

export default CropMark

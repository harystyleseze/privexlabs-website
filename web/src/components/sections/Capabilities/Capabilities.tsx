import CropMark from 'src/components/ui/CropMark/CropMark'
import Wordmark from 'src/components/ui/Wordmark/Wordmark'
import { CAPS } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { usePick } from 'src/lib/hooks/usePick'

import styles from './Capabilities.module.css'

const INDEX = CAPS.flatMap((c, i) =>
  c.groups.flatMap((g) => g.items.map((t) => ({ t, cap: i })))
)

const Capabilities = () => {
  const { viewport } = useSite()
  const [cap, pick] = usePick(0)
  const sel = CAPS[cap]
  const mobile = viewport.mobile

  return (
    <section
      id="capabilities"
      data-sec="04 / CAPABILITIES"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <span className={`px-label ${styles.accent}`}>
              04 / WHAT WE BUILD
            </span>
            <h2 data-reveal="0" className={styles.h2}>
              Six ways we take work off your plate.
            </h2>
          </div>
          <span className="px-label">
            {mobile
              ? 'TAP A DISCIPLINE'
              : 'HOVER A NODE TO TRACE ITS CAPABILITIES'}
          </span>
        </div>

        {mobile && (
          <div className={styles.chips}>
            {CAPS.map((c, i) => (
              <button
                key={c.k}
                type="button"
                onClick={() => pick(i)}
                className={styles.chip}
                data-active={i === cap}
              >
                <span className={styles.chipK}>{c.k}</span>
                <span className={styles.chipName}>{c.short}</span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.body}>
          {!mobile && (
            <div className={styles.diagramWrap}>
              <div className={styles.diagram}>
                <CropMark corner="tl" />
                <CropMark corner="tr" />
                <CropMark corner="bl" />
                <CropMark corner="br" />
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className={styles.svg}
                >
                  <rect
                    x="30"
                    y="30"
                    width="40"
                    height="40"
                    className={styles.core}
                  />
                  {CAPS.map((c) => (
                    <path key={`b${c.k}`} d={c.d} className={styles.edge} />
                  ))}
                  {CAPS.map((c, i) => (
                    <path
                      key={`f${c.k}`}
                      d={c.d}
                      data-flow="2"
                      className={styles.flow}
                      data-active={i === cap}
                    />
                  ))}
                </svg>
                <div className={styles.center}>
                  <span className="px-label">CORE / {sel.k}</span>
                  <Wordmark mark size={14} />
                </div>
                {CAPS.map((c, i) => (
                  <button
                    key={c.k}
                    type="button"
                    onMouseEnter={() => pick(i)}
                    onClick={() => pick(i)}
                    onFocus={() => pick(i)}
                    data-cursor="EXPLORE"
                    className={styles.node}
                    data-active={i === cap}
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  >
                    <span className={styles.nodeK}>{c.k} / NODE</span>
                    <span className={styles.nodeName}>{c.short}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.detail}>
            <span className={`px-label ${styles.primary}`}>
              {sel.k} / {sel.short.toUpperCase()}
            </span>
            <h3 className={styles.h3}>{sel.name}</h3>
            <p className={styles.lead}>{sel.lead}</p>
            {sel.groups.map((g) => (
              <div key={g.t} className={styles.group}>
                <span className="px-label">{g.t}</span>
                <div className={styles.items}>
                  {g.items.map((it) => (
                    <span key={it} className={styles.item}>
                      <span className={styles.itemDot} />
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {sel.note && <p className={styles.note}>{sel.note}</p>}
          </div>
        </div>

        <div className={styles.index}>
          <span className="px-label">
            CAPABILITY INDEX / {INDEX.length} ENTRIES
          </span>
          <div className={styles.indexList}>
            {INDEX.map(({ t, cap: ci }, i) => (
              // The design renders index entries as hover/click spans with no tab stop and no cursor label.
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <span
                key={`${ci}-${i}`}
                onMouseEnter={() => pick(ci)}
                onClick={() => pick(ci)}
                className={styles.indexItem}
                data-active={ci === cap}
              >
                <span className={styles.indexMark} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Capabilities

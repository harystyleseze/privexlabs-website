import CropMark from 'src/components/ui/CropMark/CropMark'
import { CHAIN, EDGES, MAP } from 'src/content/site'
import { useSite } from 'src/layouts/SiteLayout/SiteContext'
import { usePick } from 'src/lib/hooks/usePick'
import { pad2 } from 'src/lib/math'

import styles from './SystemMap.module.css'

const BY_ID = Object.fromEntries(MAP.map((n) => [n.id, n]))

const edgePath = (a: string, b: string) => {
  const A = BY_ID[a]
  const B = BY_ID[b]
  const ym = Math.round((A.y + B.y) / 2)
  return `M${A.x} ${A.y} V${ym} H${B.x} V${B.y}`
}

const SystemMap = () => {
  const { viewport } = useSite()
  const [node, pick] = usePick('business')
  const idx = MAP.findIndex((n) => n.id === node)
  const sel = MAP[idx]
  const connected = new Set<string>()
  EDGES.forEach(([a, b]) => {
    if (a === node) connected.add(b)
    if (b === node) connected.add(a)
  })

  return (
    <section id="system" data-sec="08 / SYSTEM MAP" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <span className={`px-label ${styles.accent}`}>08 / SYSTEM MAP</span>
            <h2 data-reveal="0" className={styles.h2}>
              The PrivexLabs system
            </h2>
          </div>
          <span className="px-label">SELECT A NODE — 09 NODES / 16 LINKS</span>
        </div>

        <div className={styles.body}>
          <div className={styles.map} data-mobile={viewport.mobile}>
            <CropMark corner="tl" offset={6} />
            <CropMark corner="br" offset={6} />
            <svg viewBox="0 0 1000 620" className={styles.svg}>
              <defs>
                <pattern
                  id="pxgrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M40 0H0V40" className={styles.gridPath} />
                </pattern>
              </defs>
              <rect width="1000" height="620" fill="url(#pxgrid)" />
              {EDGES.map(([a, b]) => (
                <path
                  key={`b${a}${b}`}
                  d={edgePath(a, b)}
                  className={styles.edge}
                  data-on={a === node || b === node}
                />
              ))}
              {EDGES.map(([a, b]) => (
                <path
                  key={`f${a}${b}`}
                  d={edgePath(a, b)}
                  data-flow="2.5"
                  className={styles.flow}
                  data-on={a === node || b === node}
                />
              ))}
            </svg>
            {MAP.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => pick(n.id)}
                data-cursor="OPEN"
                className={styles.node}
                data-state={
                  n.id === node ? 'on' : connected.has(n.id) ? 'linked' : 'off'
                }
                style={{ left: `${n.x / 10}%`, top: `${n.y / 6.2}%` }}
              >
                <span className={styles.nodeDot} />
                {n.label}
              </button>
            ))}
          </div>

          <div className={styles.detail}>
            <span className={`px-label ${styles.primary}`}>
              NODE {pad2(idx + 1)} / {sel.label}
            </span>
            <h3 className={styles.h3}>{sel.title}</h3>
            {sel.body.map((nb) => (
              <p key={nb} className={styles.para}>
                {nb}
              </p>
            ))}
            <div className={styles.links}>
              <span className="px-label">CONNECTED TO</span>
              <div className={styles.linkList}>
                {[...connected].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pick(id)}
                    data-cursor="OPEN"
                    className={styles.link}
                  >
                    {BY_ID[id].label} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.positioning}>
          <div className={styles.positioningHead}>
            <span className="px-label">POSITIONING / FULL STACK</span>
            <span className={`px-label ${styles.secondary}`}>
              SOFTWARE ENGINEERING + ARTIFICIAL INTELLIGENCE + DATA +
              INFRASTRUCTURE
            </span>
          </div>
          <div className={styles.chain}>
            {CHAIN.map((t, i) => (
              <span key={t} className={styles.chainItem}>
                <span className={styles.chainText}>{t}</span>
                {i < CHAIN.length - 1 && (
                  <span className={styles.chainArrow}>→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SystemMap

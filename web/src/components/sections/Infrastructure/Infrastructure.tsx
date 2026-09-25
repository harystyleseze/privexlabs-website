import { LAYERS } from 'src/content/site'
import { usePick } from 'src/lib/hooks/usePick'

import styles from './Infrastructure.module.css'

const STACK = LAYERS.slice(0, 7)
const RAILS = LAYERS.slice(7, 10)
const DEPLOY_INDEX = 10

const Infrastructure = () => {
  const [layer, pick] = usePick(3)
  const sel = LAYERS[layer]
  const handlers = (i: number) => ({
    onMouseEnter: () => pick(i),
    onClick: () => pick(i),
    onFocus: () => pick(i),
  })

  return (
    <section
      id="infrastructure"
      data-theme="dark"
      data-sec="06 / INFRASTRUCTURE"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <span className={`px-label ${styles.accent}`}>
              06 / AI INFRASTRUCTURE
            </span>
            <h2 data-reveal="0" className={styles.h2}>
              The infrastructure required to operate AI systems reliably.
            </h2>
          </div>
          <p data-reveal="120" className={styles.lede}>
            The long-term objective is to help organizations develop an AI
            operating capability, rather than simply purchase individual AI
            tools.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.stack}>
            <div className={`px-label ${styles.stackHead}`}>
              <span>REFERENCE ARCHITECTURE / PX-7</span>
              <span>HOVER A LAYER</span>
            </div>
            <div className={styles.grid}>
              <div className={styles.layers}>
                {STACK.map((ly, i) => (
                  <div key={ly.k} className={styles.layerWrap}>
                    <button
                      type="button"
                      {...handlers(i)}
                      data-cursor="INSPECT"
                      className={styles.layer}
                      data-active={i === layer}
                    >
                      <span className={styles.layerK}>{ly.k}</span>
                      <span className={styles.layerName}>{ly.name}</span>
                      <span className={styles.layerSt}>{ly.st}</span>
                    </button>
                    {i < 6 && (
                      <svg className={styles.connector}>
                        <line
                          x1="30"
                          y1="0"
                          x2="30"
                          y2="18"
                          data-flow="1.4"
                          className={styles.connectorLine}
                          data-lit={i === layer || i + 1 === layer}
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              {RAILS.map((rl, j) => {
                const i = j + 7
                return (
                  <button
                    key={rl.k}
                    type="button"
                    {...handlers(i)}
                    data-cursor="INSPECT"
                    className={styles.rail}
                    data-active={i === layer}
                  >
                    <span className={styles.railText}>
                      {rl.name.toUpperCase()}
                    </span>
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              {...handlers(DEPLOY_INDEX)}
              data-cursor="INSPECT"
              className={styles.deploy}
              data-active={layer === DEPLOY_INDEX}
            >
              <span className={styles.deployK}>X01</span>
              <span className={styles.deployName}>Deployment automation</span>
              <span className={styles.deployEnv}>
                CLOUD · PRIVATE CLOUD · ON-PREMISE · LOCAL · HYBRID
              </span>
            </button>
          </div>

          <div className={styles.inspector}>
            <div className={styles.inspectorHead}>
              <span className={`px-label ${styles.accent}`}>
                {sel.k} / INSPECTOR
              </span>
              <span className={styles.inspectorStatus}>
                <span data-pulse="1" className={styles.pulse} />
                <span className={`px-label ${styles.primary}`}>{sel.st}</span>
              </span>
            </div>
            <h3 className={styles.h3}>{sel.name}</h3>
            <p className={styles.role}>{sel.role}</p>
            <div className={styles.parts}>
              {sel.parts.map((pt) => (
                <div key={pt} className={styles.part}>
                  <span>{pt}</span>
                  <span className={styles.partDot} />
                </div>
              ))}
            </div>
            <span className="px-label">
              ENV / CLOUD · PRIVATE CLOUD · ON-PREMISE · LOCAL · HYBRID
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Infrastructure

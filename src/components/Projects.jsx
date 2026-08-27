import { useEffect, useRef, useState } from 'react'
import { projects } from '../data'
import WarpText from './WarpText'

export default function Projects() {
  const [active, setActive] = useState(null) // 当前全屏播放的项目索引
  const videoRefs = useRef([])
  const modalRef = useRef(null)

  const open = (i) => {
    setActive(i)
  }
  const close = () => {
    // 退出全屏（如果在全屏模式下）
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
    setActive(null)
  }

  // 全屏切换
  const toggleFullscreen = (e) => {
    e.stopPropagation()
    const container = modalRef.current?.parentElement
    if (!container) return
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      container.requestFullscreen?.() || container.webkitRequestFullscreen?.()
    }
  }

  // 打开灯箱时自动播放，关闭时暂停
  useEffect(() => {
    const v = modalRef.current
    if (active !== null && v) {
      v.currentTime = 0
      v.play().catch(() => {})
    }
    return () => {
      if (v) v.pause()
    }
  }, [active])

  // ESC 关闭
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Selected Works</div>
          <WarpText text="精选项目" color="#ecedef" fontSize="clamp(28px, 3vw, 46px)" fontWeight={700} letterSpacing="-0.01em" textAlign="left" className="section-warp-wrap">
            <h2 className="section-title">精选项目</h2>
          </WarpText>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <article className="project-card" key={i}>
              <div
                className="project-thumb"
                onClick={() => p.video && open(i)}
                role={p.video ? 'button' : undefined}
                tabIndex={p.video ? 0 : undefined}
                onKeyDown={(e) => {
                  if (p.video && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    open(i)
                  }
                }}
              >
                {p.cover ? (
                  <img className="project-cover" src={p.cover} alt={p.title} />
                ) : (
                  <div className="ph">作品封面图占位</div>
                )}
                {p.video && (
                  <div className="play-btn">
                    <span className="play-tri" />
                    <span className="play-label">点击播放</span>
                  </div>
                )}
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t, j) => (
                    <span className="tag" key={j}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 全屏灯箱 */}
      {active !== null && projects[active].video && (
        <div className="video-modal" onClick={close}>
          <button className="video-modal-close" aria-label="关闭">
            ×
          </button>
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="video-wrapper">
              <video
                ref={modalRef}
                className="video-modal-player"
                src={projects[active].video}
                loop
                playsInline
                controls
                preload="auto"
              />
              <button
                className="fullscreen-btn"
                onClick={toggleFullscreen}
                aria-label="全屏"
                title="全屏播放"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
            </div>
            <div className="video-modal-title">{projects[active].title}</div>
          </div>
        </div>
      )}
    </section>
  )
}

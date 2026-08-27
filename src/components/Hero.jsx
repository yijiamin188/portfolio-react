import { profile } from '../data'
import WarpText from './WarpText'

export default function Hero() {
  return (
    <header className="hero" id="home">
      {/* 全屏背景视频 */}
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="./showreel.mp4" type="video/mp4" />
      </video>
      <div className="hero-bg">
        <div className="hero-overlay" />
      </div>

      {/* 左侧竖排装饰文字 */}
      <div className="hero-sidebar">
        <span className="sidebar-text">SHOWREEL</span>
        <span className="sidebar-line" />
        <span className="sidebar-sub">FILM EDITOR</span>
      </div>

      {/* 主内容区 */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          {profile.title}
        </div>

        <WarpText
          text="YJM"
          color="#ffffff"
          fontSize="clamp(64px, 12vw, 160px)"
          fontWeight={700}
          letterSpacing="-0.03em"
          textAlign="left"
          lineHeight={0.95}
        >
          <h1 className="hero-title">
            <span className="title-name">YJM</span>
            <span className="title-mark">&#10038;</span>
          </h1>
        </WarpText>

        <p className="hero-sub">影视后期作品集</p>

        <p className="hero-desc">{profile.intro}</p>

        <div className="hero-actions">
          <a className="btn-primary" href="#projects">查看作品</a>
          <a className="btn-outline" href="#contact">联系我</a>
        </div>
      </div>

      {/* 底部信息栏 */}
      <div className="hero-footer">
        <span>专注叙事类影视内容</span>
        <span className="footer-dot" />
        <span>微电影 · 宣传片 · 剧情短片</span>
        <span className="footer-dot" />
        <span>可远程协作</span>
      </div>

      {/* 滚动提示 */}
      <div className="scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </header>
  )
}

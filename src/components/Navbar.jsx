import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // 滑过约一屏高度后悬浮
      setScrolled(window.scrollY > window.innerHeight * 0.85)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="logo" href="#home">
          易<span>家敏</span>
        </a>
        <div className="nav-links">
          <a href="#home">首页</a>
          <a href="#about">经历</a>
          <a href="#projects">作品</a>
          <a href="#strengths">优势</a>
          <a href="#contact">联系</a>
        </div>
        <a className="btn" href="#contact">
          联系我
        </a>
      </div>
    </nav>
  )
}

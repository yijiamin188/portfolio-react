import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import FloatingLines from './components/FloatingLines'
import useSiteAnimations from './animations/useSiteAnimations'

export default function App() {
  useSiteAnimations()

  return (
    <>
      <div className="site-bg-floating" aria-hidden="true">
        <FloatingLines
          linesGradient={['#3a0a07', '#1f0504', '#0a0202']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[7, 10, 13]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      <div className="site-bg-scrim" />
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </>
  )
}

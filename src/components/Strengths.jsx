import { strengths } from '../data'
import SpotlightCard from './SpotlightCard'
import BorderGlow from './BorderGlow'
import WarpText from './WarpText'

export default function Strengths() {
  return (
    <section className="section" id="strengths">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Strengths</div>
          <WarpText text="个人优势" color="#ecedef" fontSize="clamp(28px, 3vw, 46px)" fontWeight={700} letterSpacing="-0.01em" textAlign="left" className="section-warp-wrap">
            <h2 className="section-title">个人优势</h2>
          </WarpText>
        </div>
        <div className="strengths-grid">
          {strengths.map((s, i) => (
            <BorderGlow
              key={i}
              className="strength-glow"
              backgroundColor="#12141c"
              glowColor="0 75 55"
              borderRadius={16}
              glowRadius={28}
              colors={['#e23744', '#f59e0b', '#ef6b8a']}
            >
              <SpotlightCard className="strength-card">
                <div className="num">
                  <span className="num-text">{String(i + 1).padStart(2, '0')}</span>
                  {s.icons && s.icons.map((icon, j) => (
                    <img key={j} src={icon} alt="" className="strength-icon" />
                  ))}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </SpotlightCard>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  )
}

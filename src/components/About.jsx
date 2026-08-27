import { profile, stats } from '../data'
import BorderGlow from './BorderGlow'
import TiltedCard from './TiltedCard'
import WarpText from './WarpText'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">About</div>
          <WarpText text="个人经历" color="#ecedef" fontSize="clamp(28px, 3vw, 46px)" fontWeight={700} letterSpacing="-0.01em" textAlign="left" className="section-warp-wrap">
            <h2 className="section-title">个人经历</h2>
          </WarpText>
        </div>
        <BorderGlow
          className="about-glow"
          backgroundColor="#12141c"
          glowColor="0 75 55"
          colors={['#e23744', '#f59e0b', '#ef6b8a']}
          borderRadius={28}
          glowRadius={36}
        >
          <div className="about-grid">
            <div className="avatar">
              <TiltedCard
                imageSrc="./avatar.jpg"
                altText="易家敏"
                captionText="易家敏 · 影视后期"
                containerWidth="100%"
                containerHeight="auto"
                imageWidth="100%"
                imageHeight="440px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
              />
            </div>
            <div className="about-text">
              <p>{profile.about}</p>
              <p>求职意向：{profile.title}。现居 {profile.location}。</p>
              <div className="contact-row">
                <div className="contact-chip">
                  <i className="bi bi-envelope"></i>
                  {profile.email}
                </div>
                <div className="contact-chip">
                  <i className="bi bi-telephone"></i>
                  {profile.phone}
                </div>
                <div className="contact-chip">
                  <i className="bi bi-geo-alt"></i>
                  {profile.location}
                </div>
              </div>
              <div className="stats">
                {stats.map((s, i) => (
                  <div className="stat" key={i}>
                    <div className={`v${s.blue ? ' stat-blue' : ''}`}>{s.value}</div>
                    <div className="l">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  )
}

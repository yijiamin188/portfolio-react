import { profile } from '../data'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact-inner">
        <h2>
          一起把<span className="grad">故事</span>讲好吗
        </h2>
        <p className="sub">影视后期 / 视频剪辑合作，欢迎邮件或电话联系。</p>
        <div className="contact-actions">
          <a className="btn-primary" href={`mailto:${profile.email}`}>
            邮件联系
          </a>
          <a className="btn btn-ghost" href="tel:15125829396">
            电话 {profile.phone}
          </a>
          <a
            className="btn btn-ghost"
            href={profile.bilibili}
            target="_blank"
            rel="noreferrer"
          >
            B站主页
          </a>
        </div>
      </div>
      <div className="footer-note">
        © {new Date().getFullYear()} 易家敏 · 影视后期作品集
      </div>
    </section>
  )
}

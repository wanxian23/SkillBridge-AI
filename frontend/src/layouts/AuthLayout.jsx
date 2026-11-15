import { Link } from 'react-router-dom'
import logo from '../assets/images/skillbridge-ai-icon-reversed.svg'
import '../styles/auth.css'

export default function AuthLayout({ title, description, children }) {
  return (
    <div className="auth-shell">
      <a className="auth-skip" href="#auth-content">Skip to form</a>
      <header className="auth-header">
        <nav className="auth-nav" aria-label="Account navigation">
          <Link className="auth-brand" to="/login">
            <img src={logo} alt="" />
            <span>SkillBridge AI</span>
          </Link>
          <div className="auth-nav-links">
            <Link to="/login">Sign in</Link>
            <Link className="auth-nav-signup" to="/register">Sign up</Link>
          </div>
        </nav>
      </header>
      <main className="auth-main" id="auth-content" tabIndex={-1}>
        <aside className="auth-intro" aria-label="About SkillBridge AI">
          <div>
            <div className="auth-badges"><span>Job Seekers</span><span>HR / Recruiters</span></div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <p className="auth-intro-footer">Job Seeker &amp; HR / Recruiter access<br />Designed for entry-level IT careers in Malaysia</p>
        </aside>
        <section className="auth-panel" aria-labelledby="auth-title">{children}</section>
      </main>
    </div>
  )
}

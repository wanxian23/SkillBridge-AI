import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import AuthField from '../../components/auth/AuthField'
import GoogleOption from '../../components/auth/GoogleOption'
import { validateAuth } from '../../utils/authValidation'

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  function change(event) {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: undefined })
    setNotice('')
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = validateAuth(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setNotice('Please correct the highlighted fields.')
      event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0]).focus()
      return
    }
    // No login endpoint exists yet. Never store passwords or simulate a session.
    setNotice('Sign-in is not connected yet. Your details have not been sent and you have not been signed in.')
  }

  return (
    <AuthLayout title="Welcome back to SkillBridge AI"
      description="Explore entry-level IT roles, understand your match and grow your skills. Recruiters can manage vacancies and review applicants.">
      <h1 id="auth-title">Sign in</h1>
      <p className="auth-subtitle">Enter your email and password, or use Google below.</p>
      <form noValidate onSubmit={submit}>
        <AuthField label="Email address" name="email" type="email" autoComplete="username" required
          placeholder="you@example.com" value={values.email} onChange={change} error={errors.email} />
        <AuthField label="Password" name="password" type="password" autoComplete="current-password" required
          placeholder="Enter your password" value={values.password} onChange={change} error={errors.password} />
        <button className="auth-button" type="submit">Sign in</button>
      </form>
      <GoogleOption />
      <div className="auth-actions">
        <button type="button" className="auth-text-button" onClick={() => setNotice('Password reset is not available yet. No reset email has been sent.')}>Forgot password?</button>
        <Link to="/register">Create account</Link>
      </div>
      <p className="auth-preview">Interface preview — sign-in and account services are not connected yet.</p>
      <p className="auth-notice" role="status">{notice}</p>
    </AuthLayout>
  )
}

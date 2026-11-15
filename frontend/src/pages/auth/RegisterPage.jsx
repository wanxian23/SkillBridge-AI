import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import AuthField from '../../components/auth/AuthField'
import GoogleOption from '../../components/auth/GoogleOption'
import { validateAuth } from '../../utils/authValidation'
import briefcase from '../../assets/icons/briefcase.svg'
import person from '../../assets/icons/person.svg'

const roles = {
  jobseeker: {
    label: 'Job Seeker', icon: briefcase, short: 'Find roles and build your skills.',
    title: 'Build your career with clarity.',
    description: 'Create your Job Seeker profile, prepare your resume and compare your skills with entry-level IT opportunities in Malaysia.',
  },
  recruiter: {
    label: 'HR / Recruiter', icon: person, short: 'Post vacancies and review applicants.',
    title: 'Connect with emerging talent.',
    description: 'Create an HR / Recruiter account to manage entry-level IT vacancies and review applicant skills and qualifications.',
  },
}

function RegistrationForm({ role }) {
  const [values, setValues] = useState({ fullName: '', email: '', phone: '', password: '' })
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
    const nextErrors = validateAuth(values, true)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setNotice('Please correct the highlighted fields.')
      event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0]).focus()
      return
    }
    // Replace with the team's API only after the registration contract is agreed.
    setNotice('Your form passes the checks, but registration is not connected yet. No account has been created and no verification email has been sent.')
  }
  return (
    <>
      <h1 id="auth-title">Create your account</h1>
      <p className="auth-subtitle">Step 3 of 4 · {roles[role].label} · Email</p>
      <form noValidate onSubmit={submit}>
        <AuthField label="Full name" name="fullName" autoComplete="name" required placeholder="Enter your full name"
          value={values.fullName} onChange={change} error={errors.fullName} />
        <AuthField label="Email address" name="email" type="email" autoComplete="email" required placeholder="you@example.com"
          value={values.email} onChange={change} error={errors.email} />
        <AuthField label="Phone number" name="phone" type="tel" autoComplete="tel" required placeholder="e.g. +60 12 345 6789"
          value={values.phone} onChange={change} error={errors.phone} />
        <AuthField label="Password" name="password" type="password" autoComplete="new-password" required placeholder="Enter a password"
          hint="Use at least 8 characters." value={values.password} onChange={change} error={errors.password} />
        <button className="auth-button" type="submit">Create account</button>
      </form>
      <Link className="auth-back" to={`/register?role=${role}`}>Back to sign-up options</Link>
      <p className="auth-preview">Interface preview — registration and email verification are not connected yet.</p>
      <p className="auth-notice" role="status">{notice}</p>
    </>
  )
}

export default function RegisterPage() {
  const [params] = useSearchParams()
  const role = params.get('role')
  const selected = Object.hasOwn(roles, role) ? roles[role] : null
  const email = selected && params.get('method') === 'email'
  return (
    <AuthLayout title={selected?.title || 'Choose your next step.'}
      description={selected?.description || 'Find entry-level IT roles and build your skills as a Job Seeker, or post vacancies and review applicants as HR / Recruiter.'}>
      {!selected ? <>
        <h1 id="auth-title">Create an account</h1>
        <p className="auth-subtitle">Choose the account that matches what you want to do.</p>
        <p className="auth-step">STEP 1 OF 4</p>
        <div className="auth-role-list">
          {Object.entries(roles).map(([key, item]) => (
            <Link className="auth-role" key={key} to={`/register?role=${key}`}>
              <span className="auth-role-icon"><img src={item.icon} alt="" /></span>
              <span><strong>{item.label}</strong><small>{item.short}</small></span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
        <Link className="auth-back" to="/login">Already registered? Sign in</Link>
      </> : email ? <RegistrationForm key={role} role={role} /> : <>
        <h1 id="auth-title">Choose how to sign up</h1>
        <div className="auth-badges auth-step-badges"><span>Step 2 of 4</span><span>{selected.label}</span></div>
        <p className="auth-subtitle">Choose how you want to create your {selected.label} account. Continue with email or use Google to authorise access before completing your profile.</p>
        <Link className="auth-button" to={`/register?role=${role}&method=email`}>Continue with email</Link>
        <GoogleOption signup />
        <Link className="auth-back" to="/register">Change account type</Link>
        <p className="auth-preview">Interface preview — account creation is not connected yet.</p>
      </>}
    </AuthLayout>
  )
}

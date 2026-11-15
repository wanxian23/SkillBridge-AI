import { useId, useState } from 'react'

export default function AuthField({ label, error, hint, type = 'text', ...props }) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <input {...props} id={id} type={isPassword && visible ? 'text' : type}
          className={isPassword ? 'auth-password' : undefined}
          aria-invalid={error ? true : undefined} aria-describedby={describedBy || undefined} />
        {isPassword && <button type="button" className="auth-reveal" aria-controls={id}
          aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}
          onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</button>}
      </div>
      {hint && <p className="auth-hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="auth-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}

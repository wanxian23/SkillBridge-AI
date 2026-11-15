export default function GoogleOption({ signup = false }) {
  return (
    <>
      <div className="auth-divider"><span>{signup ? 'or' : 'or continue with Google'}</span></div>
      <button type="button" className="auth-button auth-google" disabled>
        <span className="auth-google-mark" aria-hidden="true">G</span>
        {signup ? 'Sign up' : 'Sign in'} with Google
      </button>
      <p className="auth-hint">Google authentication is not available yet.</p>
    </>
  )
}

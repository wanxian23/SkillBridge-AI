// Browser checks improve feedback; the backend must validate these again later.
export function validateAuth(values, registration = false) {
  const errors = {}
  if (registration && !values.fullName?.trim()) errors.fullName = 'Enter your full name.'
  if (!values.email?.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (registration) {
    const phone = values.phone?.trim() || ''
    const digits = phone.replace(/\D/g, '')
    if (!phone) errors.phone = 'Enter your phone number.'
    else if (!/^\+?[\d\s()-]+$/.test(phone) || digits.length < 8 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number with 8–15 digits.'
    }
  }
  if (!values.password || !values.password.trim()) errors.password = 'Enter your password.'
  else if (registration && values.password.length < 8) errors.password = 'Use at least 8 characters.'
  return errors
}

import { useState } from 'react'
import Field from './Field'
import Button from './Button'

// Reason textarea + confirm / cancel buttons, shared by "Request company updates" and "Reject".
export default function ReasonForm({
  label = 'Reason visible to recruiter',
  placeholder,
  confirmLabel,
  confirmVariant = 'primary',
  cancelTo,
  onSubmit,
}) {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = reason.trim()
    if (!trimmed) {
      setError('Enter a reason. The recruiter will see it.')
      return
    }
    onSubmit(trimmed)
  }

  return (
    <form className="adm-form" onSubmit={handleSubmit} noValidate>
      <Field
        as="textarea"
        label={label}
        required
        placeholder={placeholder}
        value={reason}
        error={error}
        onChange={(event) => {
          setReason(event.target.value)
          if (error) setError('')
        }}
      />
      <div className="adm-actions">
        <Button type="submit" variant={confirmVariant}>
          {confirmLabel}
        </Button>
        <Button variant="tint" to={cancelTo}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

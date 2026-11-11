import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const educationFields = [
  {
    name: 'institution',
    label: 'Institution name',
    placeholder: 'Enter institution name',
  },
  {
    name: 'qualification',
    label: 'Qualification',
    placeholder: 'Enter qualification',
  },
  {
    name: 'fieldOfStudy',
    label: 'Field of study',
    placeholder: 'Enter field of study',
  },
  { name: 'startDate', label: 'Start date', placeholder: 'Enter start date' },
  { name: 'endDate', label: 'End date', placeholder: 'Enter end date' },
  { name: 'result', label: 'Result (optional)', placeholder: 'Enter result' },
]
const experienceFields = [
  { name: 'jobTitle', label: 'Job title', placeholder: 'Enter job title' },
  { name: 'company', label: 'Company name', placeholder: 'Enter company name' },
  {
    name: 'employmentType',
    label: 'Employment type',
    placeholder: 'Enter employment type',
  },
  { name: 'startDate', label: 'Start date', placeholder: 'Enter start date' },
  { name: 'endDate', label: 'End date', placeholder: 'Enter end date' },
  {
    name: 'responsibilities',
    label: 'Responsibilities',
    placeholder: 'Enter responsibilities',
  },
]

export default function ProfileEntryDialog({ type, entry, onSave, onCancel }) {
  const dialogRef = useRef(null)
  const [draft, setDraft] = useState(entry || {})
  const fields = type === 'education' ? educationFields : experienceFields
  const title = `${entry ? 'Edit' : 'Add'} ${type === 'education' ? 'education' : 'work experience'}`

  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [])

  function saveEntry(event) {
    event.preventDefault()
    // The dialog is rendered outside the profile form. Stop React's submit
    // event here so Save entry does not also submit the whole profile.
    event.stopPropagation()
    const values = { ...draft }
    fields.forEach(({ name }) => {
      values[name] = (draft[name] || '').trim()
    })
    onSave({ ...values, id: entry?.id || crypto.randomUUID() })
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="js-page js-entry-dialog"
      aria-labelledby="profile-entry-title"
      onCancel={onCancel}
    >
      <form onSubmit={saveEntry}>
        <h2 id="profile-entry-title">{title}</h2>
        {fields.map(({ name, label, placeholder }) => (
          <label key={name} htmlFor={`entry-${name}`}>
            {label}
            <input
              id={`entry-${name}`}
              name={name}
              value={draft[name] || ''}
              placeholder={entry && !draft[name] ? 'Not provided' : placeholder}
              required={
                name === 'institution' ||
                name === 'qualification' ||
                name === 'jobTitle'
              }
              onChange={(event) =>
                setDraft({ ...draft, [name]: event.target.value })
              }
            />
          </label>
        ))}
        <div className="js-entry-actions">
          <button type="button" className="js-entry-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="js-entry-button js-entry-button--primary"
          >
            Save entry
          </button>
        </div>
      </form>
    </dialog>,
    document.body
  )
}

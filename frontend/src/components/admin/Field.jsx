import { useId } from 'react'

// Options can be:  'Beginner'  |  { value: 'x', label: 'X' }  |  { group: 'Roles', options: [...] }
function renderOption(option) {
  if (typeof option === 'string') {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    )
  }
  if (option.group) {
    return (
      <optgroup key={option.group} label={option.group}>
        {option.options.map(renderOption)}
      </optgroup>
    )
  }
  return (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  )
}

// One component for the three form controls used in the admin design.
// as: input (default) | select | textarea
export default function Field({
  label,
  required = false,
  as = 'input',
  error,
  options = [],
  placeholder,
  ...rest
}) {
  const id = useId()
  const errorId = `${id}-error`
  const controlProps = {
    id,
    className: 'adm-input',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    ...rest,
  }

  let control
  if (as === 'select') {
    control = (
      <select {...controlProps}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(renderOption)}
      </select>
    )
  } else if (as === 'textarea') {
    control = <textarea rows={4} placeholder={placeholder} {...controlProps} />
  } else {
    control = <input placeholder={placeholder} {...controlProps} />
  }

  return (
    <div className="adm-field">
      <label htmlFor={id}>
        {label}
        {required ? ' *' : ''}
      </label>
      {control}
      {error && (
        <p id={errorId} className="adm-field-error">
          {error}
        </p>
      )}
    </div>
  )
}

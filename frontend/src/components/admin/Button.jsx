import { Link } from 'react-router-dom'
import Icon from './Icon'

// variant: primary | tint | outline | danger
// Pass `to` to render a router link, otherwise a real <button> is rendered.
export default function Button({
  to,
  onClick,
  children,
  variant = 'primary',
  icon,
  iconPosition = 'end',
  between = false,
  fullWidth = false,
  disabled = false,
  type = 'button',
  style,
}) {
  const className = [
    'adm-btn',
    `adm-btn--${variant}`,
    between && 'adm-btn--between',
    fullWidth && 'adm-btn--full',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'start' && <Icon name={icon} />}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <Icon name={icon} size={15} />}
    </>
  )

  // A disabled link is rendered as a disabled button so it cannot be followed.
  if (to && !disabled) {
    return (
      <Link className={className} to={to} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled} style={style}>
      {content}
    </button>
  )
}

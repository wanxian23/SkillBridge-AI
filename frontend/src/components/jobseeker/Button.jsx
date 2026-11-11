import { Link } from 'react-router-dom'
import arrowWhite from '../../assets/jobseeker/arrow-white.svg'
import arrowGreen from '../../assets/jobseeker/arrow-green.svg'

// Use `to` for navigation, or `onClick` for an action on the current page.
export default function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
}) {
  const className = `js-button js-button--${variant}`
  const content = (
    <>
      <span>{children}</span>
      <img src={variant === 'primary' ? arrowWhite : arrowGreen} alt="" />
    </>
  )
  if (to && !disabled)
    return (
      <Link className={className} to={to}>
        {content}
      </Link>
    )
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

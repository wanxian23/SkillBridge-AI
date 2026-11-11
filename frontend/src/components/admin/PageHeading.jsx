import { ADMIN_USER } from '../../data/adminMockData'

// Context strip + page title. Company verification pages use
// context="ADMINISTRATOR · Employer verification" and hide the user name, as in the design.
export default function PageHeading({
  title,
  subtitle,
  context = 'ADMINISTRATOR',
  showUser = true,
}) {
  return (
    <>
      <div className="adm-context">
        <span className={showUser ? 'adm-context-label' : 'adm-context-label adm-context-label--wide'}>
          {context}
        </span>
        {showUser && (
          <span className="adm-context-user">
            {ADMIN_USER.name} · {ADMIN_USER.role}
          </span>
        )}
      </div>
      <header className="adm-heading">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>
    </>
  )
}

import { Link, NavLink, Outlet } from 'react-router-dom'
import Icon from '../components/admin/Icon'
import '../styles/admin.css'

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Admin overview', icon: 'home' },
  { to: '/admin/users', label: 'User accounts', icon: 'user' },
  { to: '/admin/companies', label: 'Company verification', icon: 'user' },
  { to: '/admin/vacancies', label: 'Vacancy moderation', icon: 'job' },
  { to: '/admin/learning', label: 'Learning catalogue', icon: 'map' },
]

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="adm-sidebar">
        <Link className="adm-logo" to="/admin/dashboard">
          <img src="/admin-icons/logo-mark.svg" alt="" width="36" height="36" />
          <span>SkillBridge AI</span>
        </Link>

        <p className="adm-workspace-label">ADMINISTRATOR</p>

        <nav className="adm-nav" aria-label="Administrator">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'adm-nav-link is-active' : 'adm-nav-link')}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <p className="adm-demo-label">DEMO WORKSPACE</p>
          <p className="adm-demo-user">Platform administrator</p>
          {/* Sign out just returns to the login page until real authentication exists. */}
          <Link className="adm-signout" to="/login">
            <span>Sign out</span>
            <Icon name="arrow" />
          </Link>
        </div>
      </aside>

      <main className="adm-main">
        <Outlet />
      </main>
    </div>
  )
}

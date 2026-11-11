import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../../styles/jobseeker/JobSeekerLayout.css'
import homeIcon from '../../assets/icons/house-door.svg'
import briefcaseIcon from '../../assets/icons/briefcase.svg'
import barChartIcon from '../../assets/icons/bar-chart-line.svg'
import mapIcon from '../../assets/icons/map.svg'
import resumeIcon from '../../assets/icons/file-earmark-person.svg'
import applicationsIcon from '../../assets/icons/pencil-square.svg'
import personIcon from '../../assets/icons/person.svg'

const JobSeekerSidebar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const menuItems = [
    { label: 'Dashboard', icon: homeIcon, path: '/jobseeker/dashboard' },
    { label: 'Browse Job', icon: briefcaseIcon, path: '/jobseeker/jobs' },
    { label: 'Skill Gaps', icon: barChartIcon, path: '/jobseeker/skill-gaps' },
    {
      label: 'Learning Roadmap',
      icon: mapIcon,
      path: '/jobseeker/learning-roadmap',
    },
    {
      label: 'Resume Studio',
      icon: resumeIcon,
      path: '/jobseeker/resume-studio',
    },
    {
      label: 'Applications',
      icon: applicationsIcon,
      path: '/jobseeker/applications',
    },
    { label: 'My Profile', icon: personIcon, path: '/jobseeker/profile' },
  ]

  return (
    <div className="jobseeker-sidebar">
      <Link className="jobseeker-logo" to="/jobseeker/dashboard">
        <img src="/admin-icons/logo-mark.svg" alt="SkillBridge AI Logo" />
        <span>SkillBridge AI</span>
      </Link>

      <h3>JOB SEEKER</h3>
      <ul>
        {menuItems.map(({ label: item, icon, path }) => (
          <li
            key={item}
            className={
              pathname === path || pathname.startsWith(`${path}/`)
                ? 'active'
                : ''
            }
            role="button"
            tabIndex={0}
            aria-pressed={pathname === path || pathname.startsWith(`${path}/`)}
            onClick={() => navigate(path)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                navigate(path)
              }
            }}
          >
            <span
              className="sidebar-menu-icon"
              style={{ '--sidebar-icon': `url("${icon}")` }}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="logout-section">
        <h3>
          CURRENT LOGIN <br></br>
          <span className="jobseeker-name">John Doe</span>
        </h3>
        {/* Sign out just returns to the login page until real authentication exists. */}
        <Link className="logout-button" to="/login">
          <span>Sign out</span>
        </Link>
      </div>
    </div>
  )
}

export default JobSeekerSidebar

import { Link } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import { useAdminData } from '../../hooks/useAdminData'
import { ACCOUNT_ROLES } from '../../data/adminMockData'
import { plural } from '../../utils/plural'

export default function DashboardPage() {
  const { vacancies, resourceTotal } = useAdminData()
  const flagged = vacancies.filter((vacancy) => vacancy.status === 'Flagged')
  const firstFlagged = flagged[0]

  return (
    <>
      <PageHeading
        title="Administration overview"
        subtitle="Review platform activity, manage access and maintain the learning catalogue."
      />

      <div className="adm-stats">
        <Link className="adm-stat" to="/admin/vacancies">
          <span className="adm-stat-label">Flagged vacancy</span>
          <span className={flagged.length ? 'adm-stat-value is-danger' : 'adm-stat-value'}>
            {flagged.length ? plural(flagged.length, 'listing', 'listings') : 'None'}
          </span>
          <span className="adm-stat-link">Review flagged listing &nbsp;→</span>
        </Link>
        <Link className="adm-stat" to="/admin/users">
          <span className="adm-stat-label">Supported account roles</span>
          <span className="adm-stat-value">{plural(ACCOUNT_ROLES.length, 'role', 'roles')}</span>
          <span className="adm-stat-link">Manage accounts &nbsp;→</span>
        </Link>
        <Link className="adm-stat" to="/admin/learning">
          <span className="adm-stat-label">Learning resources</span>
          <span className="adm-stat-value">{plural(resourceTotal, 'resource', 'resources')}</span>
          <span className="adm-stat-link">Open catalogue &nbsp;→</span>
        </Link>
      </div>

      <div className="adm-priorities">
        <Card>
          <div className="adm-next-step">
            <p className="adm-eyebrow">REVIEW PRIORITY</p>
            <h2 className="adm-big-title">
              {firstFlagged ? 'One vacancy needs review' : 'No vacancies need review'}
            </h2>
            <p>
              {firstFlagged
                ? 'A report mentions an upfront fee charged to applicants.'
                : 'Flagged listings will appear here.'}
            </p>
          </div>
          {firstFlagged && (
            <div className="adm-flagged">
              <strong>{firstFlagged.title}</strong>
              <span>
                {firstFlagged.employer} · Flagged · {firstFlagged.reason}
              </span>
            </div>
          )}
          <p>Review the listing and the report before deciding what action to take.</p>
          <div>
            <Button to="/admin/vacancies" icon="arrow" between style={{ width: 236 }}>
              Open moderation queue
            </Button>
          </div>
        </Card>

        <Card title="Administration shortcuts" className="adm-shortcuts">
          <div className="adm-shortcut">
            <Button to="/admin/users" variant="outline" icon="user" iconPosition="start">
              User accounts
            </Button>
            <p>Review roles, access and account status.</p>
          </div>
          <div className="adm-shortcut">
            <Button to="/admin/companies" variant="outline" icon="user" iconPosition="start">
              Company verification
            </Button>
            <p>Review employer identity and authority.</p>
          </div>
          <div className="adm-shortcut">
            <Button to="/admin/learning" variant="outline" icon="map" iconPosition="start">
              Learning catalogue
            </Button>
            <p>Maintain resources and skill information.</p>
          </div>
        </Card>
      </div>

      <section className="adm-banner">
        <div className="adm-banner-text">
          <strong>Keep learning recommendations relevant</strong>
          <span>Maintain skill tags, difficulty levels, estimated duration and external links.</span>
          <span>The catalogue currently contains {resourceTotal} resources.</span>
        </div>
        <Button to="/admin/learning" variant="tint" icon="map" iconPosition="start">
          Open catalogue
        </Button>
      </section>
    </>
  )
}

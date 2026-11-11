import { Navigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import HistoryEntries from '../../components/admin/HistoryEntries'
import { useAdminData } from '../../hooks/useAdminData'

const CONTEXT = 'ADMINISTRATOR · Employer verification'

// One page for the three result screens: Approved, Changes requested, Rejected.
export default function CompanyDecisionPage() {
  const { id } = useParams()
  const { companies } = useAdminData()
  const company = companies.find((item) => item.id === id)

  if (!company) {
    return (
      <NotFoundNotice
        title="Company decision"
        backTo="/admin/companies"
        backLabel="Back to verification queue"
      />
    )
  }

  if (company.status === 'Awaiting review') {
    return <Navigate to={`/admin/companies/${company.id}`} replace />
  }

  const subtitle = `Decision saved · ${company.id}`
  let title
  let banner

  if (company.status === 'Approved') {
    title = 'Company approved'
    banner = (
      <Card title="✓  Recruitment access enabled" tone="tint" titleTone="accent" compact>
        <p className="adm-ink">
          {company.name} can now publish vacancies and view applicants. The recruiter will see the
          approved status.
        </p>
      </Card>
    )
  } else if (company.status === 'Changes requested') {
    title = 'Changes requested'
    banner = (
      <Card title="!  Recruiter action required" tone="tint" titleTone="accent" compact>
        <p className="adm-ink">
          {company.recruiter} has been asked to update the submission. Publishing and applicant
          access remain locked.
        </p>
      </Card>
    )
  } else {
    title = 'Submission rejected'
    banner = (
      <Card title="×  Company verification rejected" tone="rose" titleTone="danger" compact>
        <p className="adm-ink">
          The reason is shown to the recruiter. Publishing and applicant access remain locked.
        </p>
      </Card>
    )
  }

  return (
    <>
      <PageHeading title={title} subtitle={subtitle} context={CONTEXT} showUser={false} />
      {banner}
      {company.status !== 'Approved' && company.reason && (
        <Card title="Reason shared with recruiter" compact>
          <p>{company.reason}</p>
        </Card>
      )}
      <Card title="Review history" compact>
        <HistoryEntries entries={company.history} />
      </Card>
      <div>
        <Button to="/admin/companies" style={{ width: 290 }}>
          Back to verification queue
        </Button>
      </div>
    </>
  )
}

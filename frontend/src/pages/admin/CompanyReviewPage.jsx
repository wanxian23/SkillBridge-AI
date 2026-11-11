import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

const CONTEXT = 'ADMINISTRATOR · Employer verification'

export default function CompanyReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { companies, decideCompany } = useAdminData()
  const company = companies.find((item) => item.id === id)

  if (!company) {
    return (
      <NotFoundNotice
        title="Review company submission"
        backTo="/admin/companies"
        backLabel="Back to verification queue"
      />
    )
  }

  const base = `/admin/companies/${company.id}`
  const open = company.status === 'Awaiting review'

  function approve() {
    decideCompany(company.id, 'Approved')
    navigate(`${base}/decision`)
  }

  return (
    <>
      <PageHeading
        title="Review company submission"
        subtitle={`${company.id} · ${company.name} · ${company.status}`}
        context={CONTEXT}
        showUser={false}
      />

      <Card title="Company and representative" compact>
        <div className="adm-lines">
          <p>
            Registration: {company.registration} (sample) · Address: {company.address}
          </p>
          <p>
            {company.recruiter} · {company.recruiterTitle} · {company.email} · {company.phone}
          </p>
        </div>
      </Card>

      <Card title="Evidence provided" compact>
        <ul className="adm-evidence-list">
          {company.evidence.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
        <p>Sample documents for the prototype. No live SSM verification has been performed.</p>
        <div>
          <Button to={`${base}/evidence`} variant="tint" style={{ width: 220 }}>
            Inspect evidence
          </Button>
        </div>
      </Card>

      <Card title="Review checklist" compact>
        <div className="adm-lines">
          <p>✓ Company name and registration match (demo check)</p>
          <p>✓ Company status checked (demo check)</p>
          <p>✓ Representative authority confirmed (demo check)</p>
        </div>
      </Card>

      <div className="adm-actions">
        <Button onClick={approve} disabled={!open}>
          Approve company
        </Button>
        <Button variant="tint" to={`${base}/request-changes`} disabled={!open}>
          Request changes
        </Button>
        <Button variant="danger" to={`${base}/reject`} disabled={!open}>
          Reject submission
        </Button>
      </div>
    </>
  )
}

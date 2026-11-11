import { useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

const CONTEXT = 'ADMINISTRATOR · Employer verification'

export default function CompanyEvidencePage() {
  const { id } = useParams()
  const { companies } = useAdminData()
  const company = companies.find((item) => item.id === id)

  if (!company) {
    return (
      <NotFoundNotice
        title="Verification evidence"
        backTo="/admin/companies"
        backLabel="Back to verification queue"
      />
    )
  }

  return (
    <>
      <PageHeading
        title="Verification evidence"
        subtitle={`${company.id} · Restricted to authorised reviewers · Prototype sample`}
        context={CONTEXT}
        showUser={false}
      />

      <Card title="Company profile · Sample summary" compact>
        <div className="adm-lines">
          <p>Legal name: {company.name}</p>
          <p>Registration number: {company.registration} (fictional)</p>
          <p>Address: {company.address}</p>
          <p>This is a placeholder for the uploaded document viewer, not an official SSM record.</p>
        </div>
      </Card>

      <Card title="Representative authority · Sample summary" compact>
        <div className="adm-lines">
          <p>
            Representative: {company.recruiter} · {company.recruiterTitle}
          </p>
          <p>Company authorisation: permission to publish vacancies and review applicants.</p>
          <p>
            In production, inspect the submitted evidence and confirm with a trusted company contact.
          </p>
        </div>
      </Card>

      <div>
        <Button to={`/admin/companies/${company.id}`} style={{ width: 230 }}>
          Back to review
        </Button>
      </div>
    </>
  )
}

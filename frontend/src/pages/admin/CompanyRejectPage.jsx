import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import ReasonForm from '../../components/admin/ReasonForm'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

const CONTEXT = 'ADMINISTRATOR · Employer verification'

export default function CompanyRejectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { companies, decideCompany } = useAdminData()
  const company = companies.find((item) => item.id === id)

  if (!company) {
    return (
      <NotFoundNotice
        title="Reject company submission"
        backTo="/admin/companies"
        backLabel="Back to verification queue"
      />
    )
  }

  function reject(reason) {
    decideCompany(company.id, 'Rejected', reason)
    navigate(`/admin/companies/${company.id}/decision`)
  }

  return (
    <>
      <PageHeading
        title="Reject company submission"
        subtitle="Provide a clear reason before confirming this decision."
        context={CONTEXT}
        showUser={false}
      />
      <ReasonForm
        placeholder="For example: the registration number could not be matched to the company name."
        confirmLabel="Confirm rejection"
        confirmVariant="danger"
        cancelTo={`/admin/companies/${company.id}`}
        onSubmit={reject}
      />
      <Card title="This does not suspend the user account" tone="tint" titleTone="accent" compact>
        <p className="adm-ink">
          The recruiter can correct their details and request another review. Publishing and
          applicant access remain locked.
        </p>
      </Card>
    </>
  )
}

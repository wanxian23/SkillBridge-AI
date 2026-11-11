import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import ReasonForm from '../../components/admin/ReasonForm'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

const CONTEXT = 'ADMINISTRATOR · Employer verification'

export default function CompanyRequestChangesPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { companies, decideCompany } = useAdminData()
  const company = companies.find((item) => item.id === id)

  if (!company) {
    return (
      <NotFoundNotice
        title="Request company updates"
        backTo="/admin/companies"
        backLabel="Back to verification queue"
      />
    )
  }

  function send(reason) {
    decideCompany(company.id, 'Changes requested', reason)
    navigate(`/admin/companies/${company.id}/decision`)
  }

  return (
    <>
      <PageHeading
        title="Request company updates"
        subtitle="Explain exactly what the recruiter needs to correct."
        context={CONTEXT}
        showUser={false}
      />
      <ReasonForm
        placeholder="For example: the authorisation letter does not name the HR representative."
        confirmLabel="Send change request"
        cancelTo={`/admin/companies/${company.id}`}
        onSubmit={send}
      />
      <Card title="Publishing remains locked" tone="tint" titleTone="accent" compact>
        <p className="adm-ink">
          The recruiter will be able to update the submission and send it for review again.
        </p>
      </Card>
    </>
  )
}
